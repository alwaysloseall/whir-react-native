export default {
  esm: { type: 'babel' },
  extraBabelPlugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['import', { libraryName: 'antd-mobile' }]
  ],
}
