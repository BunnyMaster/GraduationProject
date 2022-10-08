## 如何使用
### 启动服务
~~~shell
nodemon ./src/4-mysql-test.ts -w
~~~

### 编译所有文件
~~~shell
tsc -w
~~~

## 下载的包
~~~shell
npm i -D @types/lodash dayjs eslint eslint-config-prettier mysql mysql2 parcel-bundler prettier ts-node typescript uuid
~~~

## 设置脚本
~~~shell
"scripts": {
    "serve": "parcel ./dist/index.html -p 1234",
    "dev": "parcel watch ./dist/index.html"
}
~~~