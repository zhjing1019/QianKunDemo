node.js v12.13.0
1104，主应用采用vue-cli脚手架，重新创建新的 demo

目录下
admin-wu 为主应用
microfrontend-demo 为主应用
sub-app1 为子应用
sub-app2 为子应用


### 已解决
1，子应用与主应用，子应用与子应用跨域问题  
2，主应用改造为webpack vue 应用  
3，主应用 路由切换子应用  
4，子应用加载 qiankun 的生命周期  
5，子应用内部切换路由  
6，部署
    -子应用部署可直接沿用以前的发布部署流程，没有什么要特殊处理的
    https://github.com/umijs/qiankun/issues/64  #[Bug]vue-cli3生产部署时发现的问题,并附带临时解决方法 #64
    -部署跨域，nginx 配置  
7，JS变量隔离（qiankun已有，使用JS Sandbox）
    每个子应用都有相应的生命周期，同一时间内，只会有一个子应用的实例生效。js沙箱封装在qiankun的生命周期中。
    当一个子应用被销毁，其js沙箱也就被销毁。唯一不足的地方是，window的对象,无法隔离,最好不要绑定原型。   
8，关于应用运行的一点总结
    -子应用与主应用整合,是通过主应用请求子应用的域名或者本地地址，所以不必是一个目录，甚至子应用可以是在服务端。   
9，css污染问题（只存在于子应用和主应用，暂时解决）
  	1，scoped（暂时解决方案：主应用的样式使用特殊class或者scoped）
  	2，主应用可以通过设置 prefixCls 的方式避免冲突   
10,支持单个子应用嵌套，可以在B应用 unmount 时手动卸载C应用.但是不支持多个子应用嵌套，  
11，利用Prefix的方式来避免CSS、Browser API、Web Event、Cookies或Local Storage的冲突。   
12，你的子应用的容器是在主应用里动态生成的，需要确保子应用在 mount 前容器已经 ready   


#### master分支说明
主分支，各个分支问题解决合并到此分支

#### testRouter分支说明（已解决）
测试，解决 路由问题

#### testSubAppComponents分支说明
测试，解决 子应用组件问题

#### 待解决/待验证问题项
1，子应用之间通信,子应用与主应用通信（目前没有，后续框架会封装）
    现有的后台管理需要通信的地方：
-  1、全局状态、登录状态、用户信息之类的数据如何维护
-  2、菜单、路由权限如何设计管理
    -使用本地存储，localStorage
    -服务端nodejs ,不需要考虑兼容。  
    目前官方的通信要在 2.0 版本才能出  
    可以使用其他通信方式，然后在vuex中存储    

2,history 模式子应用路由跳转后，刷新页面404问题  
3,hash 模式  
4，子应用实现在视图组件中加载，但是自刷新加载不到  


## 拉取远程分支到本地
```sh
#情况一：目前本地还没拉代码，直接拉分支代码
git clone -b <branchName> https://github.com/wusp1994/qiankunTestByWu.git
#情况二：本地已经拉取了代码，想拉取远程某一分支的代码到本地
git checkout -b <branchName> origin/<branchName> #当前分支上创建一个分支，拉取远程到本地（方式一）
  # 如果报错 git fetch 同步仓库
git fetch origin <branchName>:<branchName>  #拉取远程分支到本地(方式二)
```

路由分发式微前端
路由分发式微前端，即通过路由将不同的业务分发到不同的、独立前端应用上。其通常可以通过 HTTP 服务器的反向代理来实现，又或者是应用框架自带的路由来解决。
