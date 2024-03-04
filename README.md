# ydb-ui-components &middot; [![npm package](https://img.shields.io/npm/v/ydb-ui-components)](https://www.npmjs.com/package/ydb-ui-components) [![CI](https://img.shields.io/github/actions/workflow/status/ydb-platform/ydb-ui-components/.github/workflows/ci.yml?branch=main&label=CI&logo=github)](https://github.com/ydb-platform/ydb-ui-components/actions/workflows/ci.yml?query=branch:main)

A set of React components used in YDB interfaces.

## Install

```shell
npm install --save-dev ydb-ui-components @gravity-ui/uikit
```

## I18N

Some components contain prepared text. For changing language use `configure` function.

**index.js**

```js
import {configure} from 'ydb-ui-components';

configure({
  lang: 'en',
});
```

## Development

To start the dev storybook

```shell
npm run start
```
