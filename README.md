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

# 使用 storybook 开发新组件时，组件内样式需要 手动引入 .storybook/style.js 中

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

### 说明：
dist 目录为全量包文件
lib 目录 各个组件分开打包后的文件

#### 使用方式一
```
# ui 组件使用时， 在app 中引入样式文件import './App.css';
import React from 'react'
import 'gaea-ui-components-react/dist/index.css'
import { Button, Header } from 'gaea-ui-components-react'

function App() {
  return (
    <div className="App">
      <Header />
      <Button />
    </div>
  );
}

export default App;

```
#### 使用方式二

```
# ui 组件使用时， 在app 中引入样式文件import './App.css';
import React from 'react'
import 'gaea-ui-components-react/dist/index.css'
import Button from 'gaea-ui-components-react/lib/Button'

function App() {
  return (
    <div className="App">
      <Header />
      <Button />
    </div>
  );
}

export default App;

```