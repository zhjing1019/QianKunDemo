node.js v12.13.0
1104，主应用采用vue-cli脚手架，重新创建新的 demo

目录下
main_admin 为主应用
main_manage 为主应用
sub-app1 为子应用
sub-app2 为子应用

##### 启动项目
```javascript
// 启动 main_admin 主应用
cd main_admin
yarn install 或者 npm install
yarn serve 或者 npm serve

// 启动 main_manage 主应用
cd main_manage
yarn install 或者 npm install
yarn serve 或者 npm serve

// 启动 sub-app1 子应用
cd sub-app1
yarn install 或者 npm install
yarn serve 或者 npm serve

// 启动 sub-app2 子应用
cd sub-app1
yarn install 或者 npm install
yarn serve 或者 npm serve

```


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


##### 什么是微前端
通俗易懂的来说，微前端是可以将一个大应用的不同部分进行独立的部署，各个部分之间相互独立，独立部署的能力允许他们构建孤立或松散耦合的服务。
即将单页面前端应用由单一的单体应用转变为多个小型前端应用聚合为一的应用。

##### 微前端的核心设计理念
+ 技术栈无关
_主框架不限制接入应用的技术栈，微应用具备完全自主权_

+ 独立开发、独立部署
_微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新_

+ 增量升级
_在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略_

+ 独立运行时
_每个微应用之间状态隔离，运行时状态不共享_

微前端的核心目标是将巨石应用拆解成若干个可以独立的子应用




