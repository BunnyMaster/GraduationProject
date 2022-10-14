# mes-systems

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
## 怎么打包?
- 在vue,config.js中添加以下
~~~JavaScript
 publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
  indexPath: "index.html",
~~~
- 在路由组件中添加以下
~~~JavaScript
  history: createWebHistory(process.env.BASE_URL), //默认---开发时
  // history: createWebHashHistory(process.env.BASE_URL), //修改后---上线时
~~~