# ydb-ui-components

A set of React components used in YDB interfaces.

## Install

```shell
npm install --save-dev ydb-ui-components @yandex-cloud/uikit @yandex-cloud/i18n @yandex-cloud/browserslist-config
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
