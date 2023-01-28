---
title: axios拦截器源码解读
description: 请求拦截器、响应拦截器
date: 2021-12-10 01:03
update: 2021-12-10 01:03
tags:
  - js
head:
  - - meta
    - name: keywords
      content: axios 拦截器 源码
---


## 目录



> axios 拦截器源码解读  
> 下文拉取分析 axios 库的时间点为2021-11-29

## 准备

- 克隆 axios 库
  
    > `git clone git@github.com:axios/axios.git`  
    >
    > 下文提到的文件地址全部为依据 axios 库根地址的相对路径


## 目标寻找

> 在寻找拦截器时可以简单看一下 axios 的大概执行流程，和日常使用情况印证一下

### 进入 `package.json`，通过`main`的指向，得知入口文件为`/index.js`

- `package.json`  
  ![image-20211129205837793](/essay-assets/axios-interceptor-source-code/2554471-20211210010134776-1393765192.png)

### 进入`/index.js`，仅一行导入且同时导出的代码

- `/index.js`  
  ![image-20211129210052363](/essay-assets/axios-interceptor-source-code/2554471-20211210010134784-391367434.png)

### 进入被导入的文件`/lib/axios.js`，反向查找

1. 行54：获得当前文件的导出目标，变量`axios`  
     ![image-20211129212753569](/essay-assets/axios-interceptor-source-code/2554471-20211210010134852-241628072.png)

2. 行34：找到变量`axios`的声明位置，为一个被传入实参`defaults`的函数`createInstance`的执行返回接收

    > 行33：// 导出创建默认实例以备导出

    - 函数：`createInstance`   
    ![image-20211129213348040](/essay-assets/axios-interceptor-source-code/2554471-20211210010134855-246483606.png)

    - 实参：`defaults`

      > 这里简单看一下`defaults`

      - 找到`defaults`的定义位置，行7，知晓实际为一个导入  
        ![image-20211129214345038](/essay-assets/axios-interceptor-source-code/2554471-20211210010134808-248302432.png)
      - 打开此导入**`/lib/defaults.js`**，依旧反向查找源头，行134（得知导出变量`defaults`)  
        ![image-20211202152244707](/essay-assets/axios-interceptor-source-code/2554471-20211210010134805-1293159645.png)
      - 行44：来到变量的定义位置，得知实际存储了一个对象，也就是说向`createInstance`传入了一个对象  
        属性大概有`adapter`，`timeout`，`validateStatus`，`headers`等等  
        ![image-20211129215326512](/essay-assets/axios-interceptor-source-code/2554471-20211210010134839-614774267.png)

3. 行15：转到函数`createInstance`的定义位置

    > 行9-行14：  
    >
    > // 创建一个 Axios 实例（告诉了我们 Axios 是一个自定义构造函数）  
    >
    > // 接收一个对象参数，对象中包含的是实例对象的默认配置（参见上面的`default.js`）  
    >
    > // 返回 Axios 实例对象

    - 函数`createInstance`  
      ![image-20211129230941367](/essay-assets/axios-interceptor-source-code/2554471-20211210010135246-183222297.png)
      
    - 向方法里面看 ，依旧反向摸索，行30：返回值，变量`instance`

    - 行17：变量的定义位置，接收的是一个名字为`bind`的函数返回值

    - 行4：来到`bind`函数定义的地方，原来是一个模块的导入，看一下  
      ![image-20211129231515802](/essay-assets/axios-interceptor-source-code/2554471-20211210010135204-1394070690.png)
      - 打开模块文件`/lib/helpers/bind.js`，了解一下工具函数`bind`  
        结合前面的调用来看，大概意思就是，函数接收两个参数（函数a 和 对象b），返回一个新函数  
        新函数的返回值为**函数a的调用，不过this 指向被改变为了对象b**，  
        且函数a接收了新函数（这里在上文就是接收`bind`返回值的`instance`）的所有参数（[apply 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)）  
        ![image-20211129231608328](/essay-assets/axios-interceptor-source-code/2554471-20211210010134829-1325519530.png)

4. 返回继续查看

    - 行17：返回来看`bind`其中的这两个实参
        - 参数1：`Axios.prototype.request`，`Axios` 原型方法，根据工具函数`bind`定义可以知道调用`instance`（也就是实际使用中的 axios 调用）实际上就是调用这里的参数1
        - 参数2：`context` →→ 行16（new Axios(defaultConfig)），一个 `Axios`实例
        - 综上，下面要追踪看 Axios 构造函数以及其原型方法 request
    - 行5：来到`Axios`定义的地方
        - 也是一个模块的导入  
            ![image-20211130000540192](/essay-assets/axios-interceptor-source-code/2554471-20211210010135203-1153766780.png)

### 进入模块文件`/lib/core/Axios.js`

1. 打开模块文件，`/lib/core/Axios.js`，简单收起来看一下最外层的逻辑，然后依旧是反向摸索，  
    ![image-20211130000855752](/essay-assets/axios-interceptor-source-code/2554471-20211210010134864-858263038.png)
2. 行148（模块的导出语句，导出变量`Axios`） →→ 行16（变量`Axios`的定义位置，可以看到其本身是一个函数，准确的讲是一个自定义构造函数）
2. 行18：看向该构造函数内部，可以看到定义了一个实例成员，属性名为`interceptors`，属性值为一个对象（包含了属性`request`和`response`，即分别对应的请求和响应拦截，属性值为一个自定义构造函数`InterceptorManager`的实例）
3. 行5：继续追踪`InterceptorManager`，又看到了模块  
    ![image-20211130005113818](/essay-assets/axios-interceptor-source-code/2554471-20211210010134785-6107373.png)

### 进入模块文件`/lib/core/inInterceptorManager.js`

1. 打开该模块文件`/lib/core/InterceptorManager.js`，拦截器的定义一览无余  
    ![image-20211130005440289](/essay-assets/axios-interceptor-source-code/2554471-20211210010135203-245299261.png)
2. 粗略的能看到该模块导出了一个自定义构造函数，给构造函数定义了几个实例属性，以及几个原型方法，熟悉的`use`方法就在其中

### 额外：简单了解一下 axios 的执行流程

#### 焦点回到 文件`/lib/core/Axios.js`

1. 焦点回到 文件`/lib/core/Axios.js`，追踪 Axios 原型方法 request，行29  
   ![image-20211203000000985](/essay-assets/axios-interceptor-source-code/2554471-20211210010135228-1777041688.png)
2. 行117：该方法返回一个变量  
   （其实一般使用中，promise 被 return 的位置是在行80 中的条件判断中，此处只是条件判断的另一个分支，由于牵扯到拦截器所以在后面解读拦截器时对此进行分析）  
   ![image-20211203000117282](/essay-assets/axios-interceptor-source-code/2554471-20211210010134788-1493806562.png)
3. 行78（该变量声明的位置） →→→ 行108（向该变量赋值，值为函数`dispatchRequest`的执行返回值）  
   ![image-20211203000524766](/essay-assets/axios-interceptor-source-code/2554471-20211210010134786-1055752638.png)
4. 行6：来到当前页面`dispatchRequest`定义的位置，一个模块导入

#### 进入模块文件`/lib/core/dispatchRequest.js`

1. 行28（模块导出的声明位置，一个函数） →→→ 行58（该函数执行的返回值） →→→ 行56（返回值定义的位置，按预设配置`defaults.adapter`继续反向追踪查找）  
   ![image-20211203001134668](/essay-assets/axios-interceptor-source-code/2554471-20211210010134814-1943855865.png)
2. 行6：`defaults`模块导入  
   ![image-20211203001451143](/essay-assets/axios-interceptor-source-code/2554471-20211210010134728-1511929853.png)

#### 进入模块文件`axios/lib/defalts.js`

1. 行134（模块导出的声明位置，变量`defaults`） →→→ 行44（变量`defaults`的声明位置）  
   ![image-20211203001825042](/essay-assets/axios-interceptor-source-code/2554471-20211210010135251-939128211.png)
2. 行52：目标，属性`adapter`，函数`getDefaultAdapter`的执行返回值
3. 行17：函数`getDefaultAdapter`的定义位置，大概意思能看出来是一个为不同运行环境分配不同`adapter`的判断  
   ![image-20211203002030654](/essay-assets/axios-interceptor-source-code/2554471-20211210010134780-940895779.png)
4. 行21：这里按浏览器环境来选择关注`require('./adapters/xhr')`

#### 进入模块文件`axios/lib/adapters/xhr.js`

1. 里面单纯就一个函数的导出，行14（导出函数`xhrAdapter`的定义位置）  
   ![image-20211203002614894](/essay-assets/axios-interceptor-source-code/2554471-20211210010134890-1064488861.png)
2. 行15：函数`xhrAdapter`的返回值，一个 Promise 实例
3. 追踪参数`resolve` 和 `reject`的位置，即 Promise 的两个状态 →→→ 行66：函数settle的执行   
   ![image-20211204075103229](/essay-assets/axios-interceptor-source-code/2554471-20211210010134821-3440814.png)
4. 行4：来的函数settle 的定义位置，一个模块的导入  
   ![image-20211205153422581](/essay-assets/axios-interceptor-source-code/2554471-20211210010135022-2079179717.png)

#### 进入模块文件`lib/core/settle.js`

1. 代码不多，单纯的一个函数定义及其导出  
   ![image-20211205153630725](/essay-assets/axios-interceptor-source-code/2554471-20211210010134761-715041917.png)
2. 行6，函数用处注释：基于响应成功与否决定 Promise 的状态结果
3. 行8-行10，函数参数注释：  
   参数1，一个兑现 Promise 的函数（即 Promise 的成功返回）  
   参数2，一个拒绝 Promise 的函数（失败返回）  
   参数3，响应
4. 函数解读：  
   根据请求的响应状态相关的判断，决定 Promise 是  `resolve` 返回还是 `reject`返回，同时在返回时将携带参数3
5. 返回模块文件`lib/adapters/xhr.js`，考察使用该函数时，传入的参数3

#### 返回模块文件`lib/adapters/xhr.js`

1. 行66：函数settle 的执行位置，定位实参 `response`
2. 行57：`response`定义位置  
   根据上下文，明显可以得知，该变量存储了axios 对 xhr 响应数据的包装结果，也即 **axios 的成功返回**  
   在这里能直观的看到 使用 axios 返回的结果对象的几个属性    
   ![image-20211205160352065](/essay-assets/axios-interceptor-source-code/2554471-20211210010135255-725118806.png)
3. 焦点回到函数`settle`定义的地方（模块文件`lib/core/settle.js`），通过参数2，还能够了解到针对`reject`，其实是对`response`又再次进行了包装，然后继续反向查找，能够在模块文件`lib/core/createError.js`中了解到这次的包装情况

#### 进入模块文件`lib/core/createError.js`

1. 函数`createError.js`  
   ![image-20211205161443448](/essay-assets/axios-interceptor-source-code/2554471-20211210010134831-1383263902.png)
2. 函数作用，创建一个错误实例对象，然后将包括这个错误实例，随同其它几个接收到的参数，传给函数`enhanceError` 进行再处理
3. 行3，来到`enhanceError`的定义位置，依路径地址进入模块文件

#### 进入模块文件`lib/core/enhanceError.js`

1. 函数`enhanceError`  
   ![image-20211205162657908](/essay-assets/axios-interceptor-source-code/2554471-20211210010135315-1957519614.png)
2. 能够看到，最后此函数会将传入的其它参数添加给参数1，也就是上面使用时传入的错误实例对象，最后返回添加完属性的参数1，这里就是 **axios 的失败返回**

#### axios 内部执行流程示例图

1. 执行流程  
   ![axios执行流程图](/essay-assets/axios-interceptor-source-code/2554471-20211211075403769-777062614.png)





## 目标解读

### 拦截器的定义

1. 回到拦截器的解读，进入之前找到的目标文件`/lib/core/inInterceptorManager.js`  
   可以看到首先自定义了一个构造函数，实例属性`handlers`（数组），以及在此构造函数原型上添加了3个方法  
   ![image-20211130005440289](/essay-assets/axios-interceptor-source-code/2554471-20211210010135203-245299261.png)
2. 行17：`use`方法，添加一个拦截器，平时的像`axios.interceptors.request.use()`这样的使用，其中的`use`方法就是来自这里。可以接收3个参数（第3个可选，为一个对象，可配置属性 `synchronous`和`runWhen`，缺省时各为`false`和`null`，即假值，有个印象，拦截器执行时会用到），读取参数，分配对应的属性名后，包装为一个对象尾部添加到实例属性`handlers`数组中，返回此包含了拦截器信息的对象在数组中的索引（用于移除拦截器）
2. 行32：`eject`方法，移除一个拦截器，接收拦截器在`handlers`数组中的索引作为参数，将此拦截器赋值`null`，之所以没有直接删除，目前推断是避免移除后会导致定义拦截器时返回的索引和实际索引不一致的问题
4. 行46：`forEach`方法，先看函数的内部代码，接收一个函数作为参数，函数体中调用了一个工具函数`forEach`（传入了两个参数，1存放拦截器信息的数组，2函数（暂时给个别名为 fn，下面提到的时候可以直接联想到这里）。  
   ![image-20211208232250028](/essay-assets/axios-interceptor-source-code/2554471-20211210010134828-514144237.png)
5. 轻车熟路的来到此工具函数`forEach`的定义位置，结合上面使用时传入的参数1为数组，解读目标可以直接放到行243-行246。  
   意思即为遍历参数1（数组），然后将依次将元素、索引、数组本身作为参数传递给参数2（函数）  
   ![image-20211208232357379](/essay-assets/axios-interceptor-source-code/2554471-20211210010134890-1752072675.png)
6. 焦点回到拦截器定义文件中，继续解读`forEach`方法，即传入拦截器信息数组，进行遍历，如果元素不为`null`（对应移除拦截器的赋值为`null`的处理，即拦截器未被移除），将此元素作为参数传给fn（上面4中的参数2）并立即执行。
7. 拦截器的定义知道了，下面看一下拦截器在 axios 的执行中是怎样参演的吧

### 拦截器的执行

#### 拦截器执行代码定位

来到模块文件`/lib/core/Axios.js`，即创建拦截器实例的地方，前面得知了平时类似`axios(参数)`这样的使用其实就是`Axios.prototype.request(参数)`，下面直接看向这个方法内部，粗略查看后 可以定位到行60-行117，拦截器的执行就在其中  
![image-20211209122332085](/essay-assets/axios-interceptor-source-code/2554471-20211210010135233-762918156.png)

#### 拦截器执行代码解构

然后再稍微细看一下行60-行117，从行78声明变量`promise`开始，紧跟了一个if 判断，其中包含了`return promise`（行91），再就是if 判断下面一直到最后行117，这里是另外一个条件下的`return promise`。

由此可以大体分为分为三部分：行60-行76（拦截器执行的前期准备部分），行80-行92（一种情况下的返回），行95-行117（另一种情况下的返回，与第二部分互斥）。

#### 拦截器执行代码第一部分

> 第一部分：行60-行76

1. 得益于变量名的语义化，可以轻松且提前得知变量或函数在代码 中的作用  
   ![image-20211209090514665](/essay-assets/axios-interceptor-source-code/2554471-20211210010135233-2043280596.png)
   
2. 行61：声明一个数组`requestInterceptorChain`，用于链式存放请求拦截器

3. 行62：声明一个状态位变量`synchronousRequestInterceptors`，标记请求拦截器是否为同步执行

4. 行63-行71：执行拦截器原型上面的方法`forEach`，传入一个函数作为参数。根据前面对原型方法`forEach`以及内部所用工具函数`forEach`的分析，这个作为参数的函数`unshiftRequestInterceptors`的参数为各个存放拦截器信息的对象

   1. 行64-66：读取拦截器信息对象的`runWhen`属性，如果此属性为一个函数且该函数在接收请求配置作为参数后的返回值为`false`，则直接`return`，即跳过当前遍历的请求拦截器  
      以上条件不满足则继续向下执行  

      ```js
      // 一个简单的 runWhen
      // 下面的声明表示如果请求方式为 POST 则跳过此条请求过滤器的处理
      function jumpPost(config) {
        if (config.method.toUpperCase() === 'POST')
          return false
      
      }
      
      // 使用
      // ...
      axios.interceptors.request.use((config) => {
        // ...
        return config
      }, (error) => {
        // ...
        return Promise.reject(error)
      }, {
        runWhen: jumpPost // 上面定义的函数 jumpPost
      })
      ```

      

   2. 行68：进行逻辑与判断，条件全部为真则`synchronousRequestInterceptors`再次（声明变量时有同时赋值`true`）赋值为`true`，  
      如果拦截器信息对象中配置了属性`synchronous`且值为假值，则此时`synchronousRequestInterceptors`被赋值为`false`  

      ```js
      // 使用
      // ...
      axios.interceptors.request.use((config) => {
        // ...
        return config
      }, (error) => {
        // ...
        return Promise.reject(error)
      }, {
        synchronous: false // 或者 true，缺省时也为 false
      })
      ```

      

   3. 行70：向请求过滤器链组`requestInterceptorChain`头部放入定义过滤器时的两个回调函数

5. 行73：声明一个数组`responseInterceptorChain`，用于链式存放响应拦截器

6. 行74-行76：依旧调用了拦截器原型上面的方法`forEach`，处理和上面的请求拦截器相比，没有那么多前置语句，直接向响应过滤器链组`responseInterceptorChain`尾部放入定义过滤器时的两个回调函数

7. 归纳：该部分将请求拦截器依照反序（相对于定义顺序来讲，下同）、响应拦截器依照正序，各自存放在一个数组中，另外请求拦截器方面如果配置了`synchronous`为`true`最后使得状态位变量`synchronousRequestInterceptors`为真则请求拦截器整体同步执行（至于怎样同步或异步看下面的二三部分）

#### 拦截器执行代码第二部分

> 第二部分：行80-行92

1. 代码如下  
   ![image-20211209194335895](/essay-assets/axios-interceptor-source-code/2554471-20211210010134824-1772496164.png)

2. 行80：判断条件，状态位变量`synchronousRequestInterceptors`是否为真，以决定是否执行此部分

3. 行81：声明并赋值一个数组`chain`，按顺序存放了两个元素，前面梳理axios的执行流程可知`dispatchRequest`为axios发起请求的环节

4. 行83：向数组`chain`头部添加`请求拦截器链组`，注意此时可不是将请求拦截器链组整个数组作为元素添加，这里通过了`apply`绑定，`requestInterceptorChain`这个数组会被分解传入 `unshift` 方法

5. 行84：将数组`chain`与响应拦截器链组进行合并

6. 行86：创建一个携带请求配置成功返回的Promise 对象

7. 行87-行89：开启 while 循环，条件为数组`chain`中有元素时

   1. 行88：循环内部仅有的一行代码，从数组`chain`头部两两取出元素（看到这里的两两取出，且联想一下内部拦截器是两两为一组存放的，那行81中的初始数组赋值就不难理解了，`undefined`其实就是为了配合作为占位用的），并执行  
      **且由于请求拦截器存入时是按照定义顺序头部依次放入，此时为头部按序取出，所以可得知请求拦截器是反向与定义顺序执行处理的**  
      **注意**，由于 JS 的执行机制，Promise 会被当做微任务进行处理，即此行的`.then()`会被放入异步事件列表随后进入事件队列，并非立即执行，执行的时机为主线程执行完毕，也就是说请求拦截器的处理会被主线程堵塞，当然了，数组`chain`中的剩余元素在取出执行时依然如此  
      可如下简单测试  
      
      ```js
      let promise = Promise.resolve('这是待处理的配置')
      let i = 3
      console.log('start')
      while (i) {
        console.log(i)
        i--
        promise = promise.then((a) => {
          console.log(a)
          return a
        }, e => Promise.reject(e))
      }
      console.log('finish')
      
      // 最后的执行结果如下，你想到了吗
      // start
      // 3
      // 2
      // 1
      // finish
      // 这是待处理的配置
      // 这是待处理的配置
      // 这是待处理的配置
      ```

8. 行91：返回结果（一个 Promise 对象)

8. 归纳：该部分的重点就是在行88，由于为 Promise 对象回调的缘故，因此处理会被放入异步中，等待主线程空闲时再继续执行

#### 拦截器执行代码第三部分

> 第三部分：行95-行117

1. 代码如下：  
   （运行此部分代码的条件为每一个请求拦截器定义时传入了第三个参数，一个含有属性`synchronous`值为`true`的对象）  
   ![image-20211209215412336](/essay-assets/axios-interceptor-source-code/2554471-20211210010135296-75191310.png)
   
2. 行95：声明新的变量接收请求配置

3. 行96：`while`循环，开启条件为请求拦截器链组不为空时，

4. 行97-行98：头部依次取出定义请求拦截器时定义的两个回调函数  
   这里简单写一下日常使用请求拦截器的代码  

   ```js
   axios.interceptors.request.use((config) => {
     // 在发送请求之前做些什么
     return config
   }, (error) => {
     // 对请求错误做些什么
     return Promise.reject(error)
   })
   ```

   

5. 行99-行104：正常执行请求拦截器的第一个回调函数，如一旦遇到错误则执行第二个回调函数，并跳出`while`的循环，取消后续请求拦截器的处理  
   此时遇到的错误并不会影响请求的正常发送，请求会拿着之前请求拦截器处理无误的配置（如果首个请求拦截器的处理就出错了那就是没处理过的配置）继续发送请求，  
   **注意**，此处对于请求拦截器的遍历执行，并非为第二部分中的 Promise 对象`then`回调，而只是一个普通的函数，因此对于请求拦截器的处理会在主线程中直接执行，这也是第二三部分最最主要的区别，也是参数对象`synchronous`属性的真实用意

6. 行107-行111：携带经请求拦截器处理过的配置发送请求拿到响应数据（上面对Axios 流程梳理时可得知执行函数`dispatchRequest`的结果为一个Promise 对象，因此此处的变量`promise`中存放了一个 Promise 对象，且该Promise对象是具有`then`回调（[上面分析axios执行流程中有贴代码截图](#进入模块文件`/lib/core/dispatchRequest.js`)|[备用跳转1](#进入模块文件libcoredispatchrequestjs)|[备用跳转2](#user-content-进入模块文件libcoredispatchrequestjs)），因此此处开始会和第二部分最后的情况一样被推入异步微任务，等待主线程任务执行完毕后才会执行），成功则跳过 catch 语句继续向下执行，有错误则进入 catch 直接返回一个失败的Promise 对象

7. 行113-行15：在经上面发送请求成功然后得到响应数据后，如果响应拦截器链组不为空（即定义了响应拦截器），开启while 循环，从链组中头部取出响应拦截器执行，处理响应数据

8. 行117：返回结果（一个 Promise 对象)

9. 归纳：这个部分与第二部分最明显的差别就是，请求拦截器的处理并不会当作异步任务，会在主线程中直接进行处理

### 拦截器源码解读总结

通过分析拦截器相关的源码，可得知请求拦截器的执行是反向与定义顺序的，以及除去平时使用时传入的两个回调函数外，还有第三个参数可选。此参数可以达到控制请求拦截器是否跟随主线程一同执行以及控制是否可以跳过某个请求拦截器的目的，前者的话如果日常使用场景会选择使用 async/await 这样的修饰符来使请求变为同步执行，那么可以不用深究了；至于后者，算是一个功能加强，平时如果碰到需求可以知道有这样的一个参数位就可以。
