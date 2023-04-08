---
update: 2023-04-08 21:42
title: 记录一次 k8s 起步
description: 记录一次 k8s 起步, centos7.9
date: 2023-04-08 10:30
tags:
  - k8s
  - docker
  - centos
---

## 目录

## 环境

- [centos7.9](http://isoredirect.centos.org/centos/7/isos/x86_64/)
- docker-ce 18.06.3.ce-3.el7
- kubeadm 1.17.2-0
- kubelet 1.17.2-0
- kubectl 1.17.2-0
- ipvs
- calico

## 虚拟机准备

> 前面只对一台虚拟机进行安装及配置, 后面的虚拟机都是基于这台虚拟机进行克隆的, 克隆后的虚拟机需要修改主机名以及IP地址

- qemu 7
- 3台虚拟机: 1台master, 2台worker
- 2G 内存
- 20G 硬盘
- 虚拟网络NAT: 192.168.100.0/24; 192.168.100.100 - 192.168.100.254
- [centos7.9](http://isoredirect.centos.org/centos/7/isos/x86_64/)

## 修改主机名

```bash
hostnamectl set-hostname master1
```

## 修改为静态IP地址

> master1 --> 192.168.100.100  
> worker1 --> 192.168.100.101  
> worker2 --> 192.168.100.102  

```bash
# 查看网卡名称
ip a

# 修改网卡配置 eth0是上面打印的网卡名称
vi /etc/sysconfig/network-scripts/ifcfg-eth0

## 修改
BOOTPROTO=static
ONBOOT=yes
## 尾部添加
IPADDR=192.168.100.100
NETMASK=255.255.255.0
GATEWAY=192.168.100.1
DNS1=119.29.29.29

# 重启网络服务
systemctl restart network
```

## 主机名解析

```bash
# 修改hosts文件
vi /etc/hosts

## 添加
192.168.100.100 master1
192.168.100.101 worker1
192.168.100.102 worker2
```

## 关闭防火墙

```bash
systemctl stop firewalld
systemctl disable firewalld

# 查看防火墙状态
systemctl status firewalld
```

## 关闭selinux

```bash
# 查看selinux状态
sestatus
## or
getenforce

# 关闭selinux
sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config && setenforce 0
```

## 关闭swap

```bash
# 查看swap状态
swapon -s

# 关闭swap
swapoff -a

# 永久关闭swap
sed -i 's/.*swap.*/#&/' /etc/fstab
```

## 时钟同步

```bash
# 安装ntpdate
yum install -y ntpdate

# 同步时间
ntpdate time1.aliyun.com

# 定时同步时间
crontab -e
## 添加 每小时同步一次
0 0 */1 * * ? ntpdate time1.aliyun.com
```

## 添加网桥过滤

```bash
# 添加网桥过滤及开启IP转发
cat > /etc/sysctl.d/k8s.conf << EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

# 加载 br_netfilter 模块
modprobe br_netfilter
# 查看 br_netfilter 模块状态
lsmod | grep br_netfilter

# 加载配置
sysctl -p /etc/sysctl.d/k8s.conf
```

## 开启 ipvs

```bash
# 安装ipvsadm
yum install -y ipset ipvsadm

# 开启ipvs
modprobe ip_vs
modprobe ip_vs_rr
modprobe ip_vs_wrr
modprobe ip_vs_sh
modprobe nf_conntrack_ipv4

# 查看ipvs状态
lsmod | grep ip_vs

# 下次开机自启动
cat > /etc/modules-load.d/ip_vs.conf << EOF
ip_vs
ip_vs_rr
ip_vs_wrr
ip_vs_sh
nf_conntrack_ipv4
EOF
```

## 安装docker

### 添加docker源

> [docker文档](https://docs.docker.com/engine/install/centos/)

```bash
# 安装 yum-utils
yum install -y yum-utils

# 添加docker源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 查看docker源
yum repolist all | grep docker
```

### 安装docker

```bash
# 查看可用版本
yum list docker-ce.x86_64 --showduplicates | sort -r

# 安装指定版本docker
yum install -y --setopt=obsoletes=0 docker-ce-18.06.3.ce-3.el7

# 查看docker版本
docker version

# 启动docker
systemctl start docker

# 设置开机启动
systemctl enable docker
```

### 修改docker配置

```bash
# 删除docker配置中ExecStart的 -H 参数及其值(如有)
vi /usr/lib/systemd/system/docker.service

# 修改docker配置
vi /etc/docker/daemon.json
## 添加
{
  "exec-opts": ["native.cgroupdriver=systemd"]
}

# 重启docker
systemctl restart docker
```

## 添加k8s源

> [tsinghua源](https://mirrors.tuna.tsinghua.edu.cn/help/kubernetes/)

```bash
# 添加k8s源
vi /etc/yum.repos.d/kubernetes.repo
## 添加
[kubernetes]
name=kubernetes
baseurl=https://mirrors.tuna.tsinghua.edu.cn/kubernetes/yum/repos/kubernetes-el7-$basearch
enabled=1
```

## 安装kubeadm、kubelet、kubectl

```bash
# 安装kubeadm、kubelet、kubectl
yum install -y --nogpgcheck --setopt=obsoletes=0 kubelet-1.17.2-0 kubeadm-1.17.2-0 kubectl-1.17.2-0

# 查看版本
kubeadm version
kubelet --version
kubectl version
```

### 修改kubelet配置

```bash
# 修改kubelet配置
vi /etc/sysconfig/kubelet
## 添加
KUBELET_EXTRA_ARGS="--cgroup-driver=systemd"

# 设置kubelet开机自启(由于没有生成配置文件,集群初始化后会自动生成启动)
systemctl enable kubelet
```

## 安装kubelet镜像

- [k8s.gcr.io](https://k8s.gcr.io/)

```bash
# 查看kubeadm镜像列表
kubeadm config images list

# 列表保存到文件
kubeadm config images list > images.list

# 修改文件为脚本
vi images.list
## 编辑为
#!/bin/bash
img_list='k8s.gcr.io/kube-apiserver:v1.17.17
k8s.gcr.io/kube-controller-manager:v1.17.17
k8s.gcr.io/kube-scheduler:v1.17.17
k8s.gcr.io/kube-proxy:v1.17.17
k8s.gcr.io/pause:3.1
k8s.gcr.io/etcd:3.4.3-0
k8s.gcr.io/coredns:1.6.5'

for img in $img_list
do
  docker pull $img
done

# 运行脚本拉取镜像 (需要科学上网)
sh ./images.list
```

- [aliyun](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors)

```bash
# 安装kubelet镜像
kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers
```

## 虚拟机克隆

- 克隆虚拟机
- 修改主机名
  - `hostnamectl set-hostname worker1`
  - `hostnamectl set-hostname worker2`
- 修改IP
  - `vi /etc/sysconfig/network-scripts/ifcfg-eth0`
  - worker1: IPADDR=192.168.100.101
  - worker2: IPADDR=192.168.100.102
- 重启网络 `systemctl restart network`

## 集群初始化

```bash
# master1: 初始化集群(需要科学上网)
kubeadm init --kubernetes-version=v1.17.2 --pod-network-cidr=172.16.0.0/16 --apiserver-advertise-address=192.168.100.100

# master1: 记录下初始化打印的日志中的kubeadm join命令, 用于worker加入集群
## kubeadm join ...
```

### 生成配置文件

```bash
# master1: 生成配置文件
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config
```

### 安装网络插件

#### calico

> [calico](https://docs.tigera.io/calico/latest/getting-started/kubernetes/quickstart)  
> [calico archive](https://docs.tigera.io/archive/v3.14/getting-started/kubernetes/quickstart)  

##### 通过`calico.yaml`安装


```bash
# master1: 下载calico.yaml文件
wget https://docs.projectcalico.org/manifests/calico.yaml -O calico.yaml --no-check-certificate

# master1: 修改calico.yaml文件
vi calico.yaml
```

```yaml
# ...
# 添加
- name: IP_AUTODETECTION_METHOD
  value: 'interface=eth.*'
# ...
# 修改
- name: CALICO_IPV4POOL_CIDR
  value: 172.16.0.0/16
# ...
```

```bash
# master1: 安装calico
kubectl apply -f calico.yaml

# master1: 观察calico状态
watch kubectl get pods --all-namespaces

# master1: 移除taints
kubectl taint nodes --all node-role.kubernetes.io/master-

# master1: 查看节点
kubectl get nodes -o wide
```

##### 通过`tigera-operator`安装

### 添加worker节点

kubeadm join 192.168.100.100:6443 --token iokpz6.62ooucv93m6rhsp4 \
--discovery-token-ca-cert-hash sha256:865da253a876a7de176e352924dcbae179063bab7be6fe298ea1aec7892cf5cf

```bash
# 使用前面初始化时记下的kubeadm join命令

# worker1: 添加worker节点
## kubeadm join ...
# worker2: 添加worker节点
## kubeadm join ...


# or 通过以下命令获取
# master1: 查看token
kubeadm token list
# master1: 查看ca证书
kubeadm token create --print-join-command
```

### 集群验证

```bash
# master1: 查看集群状态
## status是否healthy
kubectl get cs

# master1: 查看节点
## status是否ready
kubectl get nodes -o wide

# master1: 查看cluster-info
## *** is running at https://...
kubectl cluster-info

# master1: 查看pod
kubectl get pods --all-namespaces
```

