---
title: Vue+Element+对象存储 图片上传组件简单封装
description: 环境参考：vue`2.6.10`, element-ui`2.13.2`, 阿里云对象存储OSS ali-oss`6.16.0`
date: 2021-12-14 20:30
update: 2021-12-14 20:30
tags:
  - vue
head:
  - - meta
    - name: keywords
      content: vue element oss
---


## 目录

> 环境参考：vue`2.6.10`, element-ui`2.13.2`, 阿里云对象存储OSS ali-oss`6.16.0`

## 描述

以 [Element](https://element.eleme.cn/#/zh-CN) 组件库中的上传组件的为基础，添加上传进度展示、上传遮罩、上传到对象存储，控制上传数量，大图预览

## 效果展示

![](/essay-assets/component-image-upload.gif)


## NPM包准备

```bash
# 安装 Element 组件库
npm i element-ui -S

# 安装阿里云对象存储OSS
npm i ali-oss -S
```

## 结构

```html
<template>
  <div class="image-upload-container">
    <!-- 图片上传 -->
    <el-upload
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      action=""
      :http-request="handleUpload"
      :class="{'hide-plus': imgLen}"
    >
      <i class="el-icon-plus" />
      <!-- 利用作用域插槽自定义图片上传的展示逻辑 -->
      <template #file="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
        <!-- 上传成功标示 -->
        <label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-check" /></label>
        <!-- 鼠标悬浮操作选项 -->
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePreview(file)"> <i class="el-icon-zoom-in" /> </span>
          <span class="el-upload-list__item-delete" @click="handleRemove(file)"> <i class="el-icon-delete" /> </span>
        </span>
        <!-- 遮罩及进度条 -->
        <template v-if="file.status !== 'success' && progressBar.isShow">
          <div class="upload-mask" />
          <el-progress class="upload-progress" type="circle" :percentage="progressBar.percentage" />
        </template>
      </template>
    </el-upload>

    <!-- 图片大图预览弹窗 -->
    <el-dialog width="80%" title="图片预览" :visible.sync="previewDialog.isShow">
      <img width="100%" :src="previewDialog.imgUrl" alt="">
    </el-dialog>
  </div>
</template>
```

## 样式

1. 使用css预处理器嵌套  
    ```html
    <style scoped lang="scss">
    .image-upload-container {
      .hide-plus::v-deep {
        .el-upload.el-upload--picture-card { // 隐藏上传按钮
          display: none;
        }
      }
      .el-upload-list__item {
        &.is-success .el-upload-list__item-status-label {
          display: block!important; // 避免右上角上传标志在图片hover时（由于权重不够）被隐藏
        }
        .upload-mask { // 遮罩
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .upload-progress::v-deep { // 进度条文字与遮罩形成颜色反差
          .el-progress__text {
            color: #fff!important;
          }
        }
      }
    }
    </style>
    ```

2. 原生CSS  

    ```html
    <style scoped>
     /* // 隐藏上传按钮 */
    .image-upload-container .hide-plus::v-deep .el-upload.el-upload--picture-card {
      display: none;
    }
     /* // 避免右上角上传标志在图片hover时（由于权重不够）被隐藏 */
    .image-upload-container .el-upload-list__item.is-success .el-upload-list__item-status-label {
      display: block!important;
    }
     /* // 遮罩 */
    .image-upload-container .el-upload-list__item .upload-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
    }
     /* // 进度条文字与遮罩形成颜色反差 */
    .image-upload-container .el-upload-list__item .upload-progress::v-deep .el-progress__text {
      color: #fff!important;
    }
    </style>
    ```

## 行为

```html
<script>
import OSS from 'ali-oss'
export default {
  name: 'ImageUpload',
  props: {
    limit: { // 上传数量限制
      type: Number,
      default: 1
    },
    defaultImage: { // 外部传入的需要显示在列表的图片的地址（对默认图片大于上传限制的情况没有做处理，全部展示）
      // String: 'http://xxxx.jpg' 单张
      // String: 'http://xxxx.jpg;http://xxxx.jpg' 多张
      type: String,
      default: ''
    }
  },
  data() {
    return {
      previewDialog: { // 图片预览弹窗信息
        isShow: false,
        imgUrl: ''
      },
      progressBar: { // 控制上传进度条
        isShow: false,
        percentage: 0
      },
      fileList: [], // 存放图片的列表
      fileFormat: '' // 存放待上传文件的格式
    }
  },
  computed: {
    imgLen() { // 设定一个计算属性 判断是否已到达上传限制
      return this.fileList.length >= this.limit
    }
  },
  watch: {
    defaultImage: { // 侦听是否有默认图片需要展示
      handler(newVal) {
        this.fileList = []
        this.handleDefaultImageProp(newVal)
      }
    }
  },
  methods: {
    initOSS() { // 阿里云对象存储OSS初始化 实例化OSS Client
      return new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: 'xxxxxxxxxxxxxxxxxxxxx', // 必填
        // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
        accessKeyId: 'xxxxxxxxxxxxxxxxxx', // 必填
        accessKeySecret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // 必填
        // // 从STS服务获取的安全令牌（SecurityToken）。
        // stsToken: 'yourSecurityToken',
        // refreshSTSToken: async() => {
        // // 向您搭建的STS服务获取临时访问凭证。
        //   const info = await fetch('your_sts_server')
        //   return {
        //     accessKeyId: info.accessKeyId,
        //     accessKeySecret: info.accessKeySecret,
        //     stsToken: info.stsToken
        //   }
        // },
        // // 刷新临时访问凭证的时间间隔，单位为毫秒。
        // refreshSTSTokenInterval: 300000,
        // 填写Bucket名称。
        bucket: 'xxxxxxxxxxxxxxxx' // 必填
      })
    },
    handlePreview(file) { // 图片大图预览
      this.previewDialog = { imgUrl: file.url, isShow: true }
    },
    handleRemove(file) { // 处理图片删除
      this.fileList.some((item, idx) => {
        if (item.uid === file.uid) {
          this.fileList.splice(idx, 1)
          this.$message.success('图片删除成功')
          return true
        } else {
          return false
        }
      })
    },
    async handleUpload({ file, onProgress, onSuccess, onError }) { // 覆盖默认的上传行为，可以自定义上传的实现
      this.progressBar.isShow = true // 展示上传进度条
      onProgress('开始上传') // 调用进度回调，对ready状态文件进行处理
      const that = this // 存放当前vue组件实例对象
      const client = this.initOSS() // 对象存储实例化
      const fileName = `img/banner${Date.parse(new Date())}.${this.fileFormat}` // 自定义上传文件的文件名
      let netUrl = '' // 文件的线上地址，后面作为响应数据进行返回
      try { // 上传到远端 阿里云 对象存储OSS // multipartUpload 分片上传支持上传进度，简单上传put 不支持上传进度
        // fileName 表示上传到OSS的文件名称，支持路径
        // file 表示浏览器中需要上传的文件，支持HTML5 file和Blob类型
        const { res: { status, requestUrls }} = await client.multipartUpload(fileName, file, {
          progress(p) { // 上传进度回调
            console.log('进度: ', p)
            that.progressBar.percentage = Number.parseInt(p * 100) // 同步上传进度
          },
          partSize: 1024 * 100 // 分块大小, 最小为100k
        })
        if (!status === 200) throw new Error() // 上传不成功抛出异常
        netUrl = requestUrls[0].split('?')[0] // 处理线上地址，准备传入文件上传(成功)回调
      } catch {
        onError('上传失败') // 异常中调用文件上传失败的回调
      } finally {
        this.progressBar = { // 重置进度条
          isShow: false,
          percentage: 0
        }
      }
      return netUrl // 如果上面没有上传失败的回调，此处返回的数据会作为响应传入成功回调
    },
    handleProgress(event, file, fileList) { // 处理上传进度，预先放入本地文件(使用blob地址)
      console.log('进度回调')
      if (this.limit === 1) { // 图片数量上限限制为一张时直接替换，否则添加
        this.fileList = [{ ...file }]
      } else {
        this.fileList.push({ ...file })
      }
    },
    handleSuccess(res, file, fileList) { // 处理上传成功
      console.log('成功回调')
      // 实际观察后发现 file.response 中存放的就是上传(这里就是函数handleProgress的返回值)的结果
      // 且直接修改file 参数对象会直接影响到 数据变量 fileList 中的对应元素 (或者可以遍历文件列表寻找相同uid文件对之进行操作)
      file.url = file.response
      this.$message.success('图片上传成功')
    },
    handleError(err, file, fileList) { // 处理上传失败
      console.log('失败回调')
      console.log(err)
      this.handleRemove(file) // 删除图片
      this.$message.error('图片上传失败')
    },
    beforeUpload(file) { // 上传前的操作 返回布尔值决定是否继续上传
      const types = ['image/png', 'image/jpeg', 'image/gif']
      if (!types.includes(file.type)) { // 检测文件的类型
        this.$message.error('必须上传png,jpg,jpeg,gif格式的文件')
        return false
      }
      if (file.size / 1024 / 1024 > 1) { // 检测文件的大小(限制1M以内)
        this.$message.error('图片不可以超过1M')
        return false
      }
      this.fileFormat = file.name.split('.').at(-1) // 这里直接使用了数组新API `at` ，如果需要考虑低版本浏览器可以利用数组长度-1
      return true
    },
    handleDefaultImageProp(data) { // 对外部传入的图片进行处理
      if (data && typeof data === 'string') {
        const temp = data.split(';').reduce((acc, val) => {
          acc.push({ url: val })
          return acc
        })
        this.fileList.push(...temp)
      } else {
        return false
      }
    }
  }
}
</script>

```

### 调用示例

```html
<image-upload />
<image-upload :limit="3" />
<image-upload :limit="3" :default-image="'http://xxxx.jpg'" />
<image-upload :limit="3" :default-image="'http://xxxx.jpg;http://xxxx.jpg'" />
```
