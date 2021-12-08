### 使用storybook构建的一套React组件库

### 分支规范
    - 开发分支 dev
    - 主分支 master

### 本地开发

```
# 安装依赖
$ npm install
# 启动storybook 开发组件
$ npm run storybook

```
####  本地项目开发，其他本地项目引入方式，使用 npm 安装
```
# 地址只是举例说明
npm install git+ssh://git@git.funpinpin.cn:2222/gaea/gaea-ui-components-react.git#master
```
####  本地项目开发，其他本地项目引入方式，使用 link 
首先在本项目执行
```
npm run link
```
然后在需要使用ui组件的项目执行
```
npm link gaea-ui-components-react
```