

## 配置需求
* node `^5.0.0`
* yarn `^0.23.0` or npm `^3.0.0`

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## 启动项目

```bash
$ yarn start  # Start the development server (or `npm start`)
```

|`yarn <script>`    |Description|
|-------------------|-----------|
|`start`            |项目启动|
|`build`            |项目打包到 ./dist|
|`test`             |单元测试 [testing](#testing)|
|`test:watch`       |单元测试监控|
|`lint`             |eslint|
|`lint:fix`         |eslint修复

## 项目目录说明

```
.
├── build                    # All build-related code
├── public                   # Static public assets (not imported anywhere in source code)
├── server                   # Express application that provides webpack middleware
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── index.html           # Main HTML page container for app
│   ├── main.js              # Application bootstrap and rendering
│   ├── normalize.js         # Browser normalization and polyfills
│   ├── components           # Global Reusable Components
│   ├── containers           # Global Reusable Container Components
│   ├── layouts              # Components that dictate major page structure
│   │   └── PageLayout       # Global application layout in which to render routes
│   ├── routes               # Main route definitions and async split points
│   │   ├── index.js         # Bootstrap main application routes with store
│   │   ├── Home             # Fractal route
│   │   │   ├── index.js     # Route definitions and async split points
│   │   │   ├── assets       # Assets required to render components
│   │   │   ├── components   # Presentational React Components
│   │   │   └── routes **    # Fractal sub-routes (** optional)
│   │   └── Counter          # Fractal route
│   │       ├── index.js     # Counter route definition
│   │       ├── container    # Connect components to actions and store
│   │       ├── modules      # Collections of reducers/constants/actions
│   │       └── routes **    # Fractal sub-routes (** optional)
│   ├── store                # Redux-specific pieces
│   │   ├── createStore.js   # Create and instrument redux store
│   │   └── reducers.js      # Reducer registry and injection
│   └── styles               # Application-wide styles (generally settings)
└── tests                    # Unit tests
```

## 技术栈

[ react + redux + webpack + es6 + react-router-dom ]

