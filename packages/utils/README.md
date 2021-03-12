# @whir-react-native/utils

whir-react-native 提供的工具库

## API Reference

### backPress
> 安卓的返回键管理模块

#### addBackPressListener: (callback, intercept = true) => void
> 添加返回键监听事件

- ```callback```
  - () => boolean
- ```intercept```
  - boolean 是否拦截@whir-react-native/components/BasicNavigationContainer 提供的默认返回事件

#### removeBackPressListener: () => void
> 移除返回键监听事件


### fixStyleSheet
> 兼容的样式设置模块

#### setPX: (value: number) => void
> 设置设计稿px单位的数值

- ```value```
  - number

#### fixStyleSheet: (styles) => styles

> 设置兼容的样式

- ```styles```
  - object 参考 react-native/StyleSheet

### loading
> 全局的 loading 提示，多个loading会连续不间断的进行提示

#### showLoading: (title: string) => void
> 打开loading

- ```title```
  - string 提示的内容

#### hideLoading: () => void
> 关闭loading
