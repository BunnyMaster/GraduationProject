## 如何使用
### 启动服务
~~~shell
nodemon ./src/4-mySQL-test.ts -w
~~~

### 编译所有文件
~~~shell
tsc -w
~~~

## 下载的包
~~~shell
npm i -D @types/lodash dayjs eslint eslint-config-prettier mySQL mysql2 parcel-bundler prettier ts-node typescript uuid
~~~

## 设置脚本
~~~json
"scripts": {
    "serve": "parcel ./dist/index.html -p 1234",
    "dev": "parcel watch ./dist/index.html",
    "start": "nodemon ./src/serve.ts",
    "ts-watch": "tsc -w",
    "RunMySQL": "node src/MySQL.ts"
}
~~~

### 需要启动

~~~json
"scripts": {
    "start": "nodemon ./src/serve.ts",
    "ts-watch": "tsc -w",
    "RunMySQL": "node ./src/MySQL.ts"
}
~~~

