# Changelog

## [3.3.1](https://github.com/ydb-platform/ydb-ui-components/compare/v3.3.0...v3.3.1) (2023-08-09)


### Bug Fixes

* **NavigationTree:** fix actions overflow ([#58](https://github.com/ydb-platform/ydb-ui-components/issues/58)) ([38c816f](https://github.com/ydb-platform/ydb-ui-components/commit/38c816fc6b5ed3173dfe4c74752ceafff93f8fc5))

## [3.3.0](https://github.com/ydb-platform/ydb-ui-components/compare/v3.2.2...v3.3.0) (2023-08-09)


### Features

* **NavigationTree:** add additionalNodeElements to NavigationTree ([#55](https://github.com/ydb-platform/ydb-ui-components/issues/55)) ([d462aaf](https://github.com/ydb-platform/ydb-ui-components/commit/d462aafd8dd61aca3cc17b17f57419af4c7e8910))


### Bug Fixes

* **NavigationTree:** add new NavigationTreeNodeType 'stream' ([#57](https://github.com/ydb-platform/ydb-ui-components/issues/57)) ([270f607](https://github.com/ydb-platform/ydb-ui-components/commit/270f607e952f197c51fccd89a313390fdd8f055d))

## [3.2.2](https://github.com/ydb-platform/ydb-ui-components/compare/v3.2.1...v3.2.2) (2023-08-03)


### Bug Fixes

* update icons for external table ([#53](https://github.com/ydb-platform/ydb-ui-components/issues/53)) ([928e8f7](https://github.com/ydb-platform/ydb-ui-components/commit/928e8f7d591e7557a9d939f07edbe8ae6ebcdaff))

## [3.2.1](https://github.com/ydb-platform/ydb-ui-components/compare/v3.2.0...v3.2.1) (2023-07-26)


### Bug Fixes

* fix clip and fill rules ([#51](https://github.com/ydb-platform/ydb-ui-components/issues/51)) ([13d8f4a](https://github.com/ydb-platform/ydb-ui-components/commit/13d8f4a9be934bac18e704c88674dcb349355938))

## [3.2.0](https://github.com/ydb-platform/ydb-ui-components/compare/v3.1.0...v3.2.0) (2023-07-21)


### Features

* **NavigationTree:** support external table and data source ([b6334dc](https://github.com/ydb-platform/ydb-ui-components/commit/b6334dc66a073d9584d7b9d106f08e9103246b6a))

## [3.1.0](https://github.com/ydb-platform/ydb-ui-components/compare/v3.0.3...v3.1.0) (2023-03-28)


### chore

* update @gravity-ui/uikit to 4.3.0 ([6482a17](https://github.com/ydb-platform/ydb-ui-components/commit/6482a1747285730a8650b4cadc4f9c8040dec0ff))
* update react, react-dom to 18.2.0 ([aca9cbf](https://github.com/ydb-platform/ydb-ui-components/commit/aca9cbfa8a0825c3e180b310a825dcc5ebe13eb0))
* update peerDependencies ([aa131fd](https://github.com/ydb-platform/ydb-ui-components/commit/aa131fdb0819e9a40937329ceef9d7093c4121da))

## [3.0.3](https://github.com/ydb-platform/ydb-ui-components/compare/v3.0.2...v3.0.3) (2023-02-17)


### Bug Fixes

* **NavigationTree:** update IndexTable icon ([1deab3e](https://github.com/ydb-platform/ydb-ui-components/commit/1deab3eda7611faa4b25c80493f31fff821c9c80))

## [3.0.2](https://github.com/ydb-platform/ydb-ui-components/compare/v3.0.1...v3.0.2) (2022-12-16)


### Bug Fixes

* icons fill and clip rule in camelCase ([04638fc](https://github.com/ydb-platform/ydb-ui-components/commit/04638fc41279557d5e72d909995cbaf3f71566a0))

## [3.0.1](https://github.com/ydb-platform/ydb-ui-components/compare/v3.0.0...v3.0.1) (2022-09-23)


### Bug Fixes

* **NavigatioinTree:** update icons ([0d0674d](https://github.com/ydb-platform/ydb-ui-components/commit/0d0674dfc1b14bf8115135ee75090a7f967da2d4))

## [3.0.0](https://github.com/ydb-platform/ydb-ui-components/compare/v2.4.1...v3.0.0) (2022-09-21)


### ⚠ BREAKING CHANGES

* peer deps update: migrated from `@yandex-cloud/uikit` to `@gravity-ui/uikit`
* updated i18n, and removed it from peer deps
* removed deprecated i18n instance export

#### Setting language in ydb-ui-components

**v2**
```js
import {i18n} from 'ydb-ui-components';

i18n.setLang('en');
```

**v3**
```js
import {configure} from 'ydb-ui-components';

configure({lang: 'en'});
```

## [2.4.1](https://github.com/ydb-platform/ydb-ui-components/compare/v2.4.0...v2.4.1) (2022-08-02)


### Bug Fixes

* **NavigationTree:** add node types & update icons ([909b560](https://github.com/ydb-platform/ydb-ui-components/commit/909b5607b6309cb42401afdb7b869f2a2e8ab908))

## [2.4.0](https://github.com/ydb-platform/ydb-ui-components/compare/v2.3.0...v2.4.0) (2022-07-28)


### Features

* **NavigationTree:** virtualized render ([7388ff5](https://github.com/ydb-platform/ydb-ui-components/commit/7388ff5a5b05ffa30b86fb4ae2d8e52a7bd9dad8))
* **TreeView:** a prop to determine tree view nesting level ([2e5d42a](https://github.com/ydb-platform/ydb-ui-components/commit/2e5d42abf78e81fdd61747958822dc3b96eab42f))

## [2.3.0](https://github.com/ydb-platform/ydb-ui-components/compare/v2.2.0...v2.3.0) (2022-07-18)


### Features

* **i18n:** add configure function ([c48e58e](https://github.com/ydb-platform/ydb-ui-components/commit/c48e58e33e361cf4f507190cd0a8d0a896975fb1))

## [2.2.0](https://github.com/ydb-platform/ydb-ui-components/compare/v2.1.0...v2.2.0) (2022-07-05)


### Features

* **NavigationTree:** add index and index_table node types! ([d6ed6ba](https://github.com/ydb-platform/ydb-ui-components/commit/d6ed6bae7e882a6217d4205f931ac3704b8ed9f6))

## [2.1.0](https://github.com/ydb-platform/ydb-ui-components/compare/v2.0.2...v2.1.0) (2022-06-28)


### Features

* **NavigationTree:** explicitly specify expandable nodes ([1791d59](https://github.com/ydb-platform/ydb-ui-components/commit/1791d59d4ed5b27050fdbd9c29500c4fe916f631))

### [2.0.2](https://github.com/ydb-platform/ydb-ui-components/compare/v2.0.1...v2.0.2) (2022-05-30)


### Bug Fixes

* add i18n export ([13a34e0](https://github.com/ydb-platform/ydb-ui-components/commit/13a34e0056a9fa42b5ad02fc41e5323af0ac98e9))

### [2.0.1](https://github.com/ydb-platform/ydb-ui-components/compare/v2.0.0...v2.0.1) (2022-05-26)


### chore

* update @yandex-cloud/uikit to 2.4.0 ([663c8d2](https://github.com/ydb-platform/ydb-ui-components/commit/663c8d26c704bd83be97c81f4fd4080a7cfbb3d0))

## [2.0.0](https://github.com/ydb-platform/ydb-ui-components/compare/v1.2.3...v2.0.0) (2022-05-25)


### ⚠ BREAKING CHANGES

* major version update of peer dependency @yandex-cloud/uikit, see changelog here: https://github.com/yandex-cloud/uikit/blob/main/CHANGELOG_V2.md

### chore

* update @yandex-cloud/uikit to v2.3.1 ([ba67dd6](https://github.com/ydb-platform/ydb-ui-components/commit/ba67dd6f8f01b2a58ed67bd064ad8962f2f8a244))
* update @yandex-cloud/i18n to v0.6.0 ([237c2cd](https://github.com/ydb-platform/ydb-ui-components/commit/237c2cdd5064565da2cf62fbebb0fc0ae1195d0e))

### [1.2.3](https://github.com/ydb-platform/ydb-ui-components/compare/v1.2.2...v1.2.3) (2022-05-23)


### Bug Fixes

* **NavigationTree:** expand tree to initial active path ([6a84dfb](https://github.com/ydb-platform/ydb-ui-components/commit/6a84dfb8b89f8411bd5b11f7b18582ed547c6d0d))

### [1.2.2](https://github.com/ydb-platform/ydb-ui-components/compare/v1.2.1...v1.2.2) (2022-05-23)


### Bug Fixes

* add missing index file for TreeView ([7496d9b](https://github.com/ydb-platform/ydb-ui-components/commit/7496d9b7074d6ee5c2f280030ca38cc9373b0f34))

### [1.2.1](https://github.com/ydb-platform/ydb-ui-components/compare/v1.2.0...v1.2.1) (2022-05-23)


### Bug Fixes

* add missing component export ([9b71eb7](https://github.com/ydb-platform/ydb-ui-components/commit/9b71eb78f8c2adfd773e45edddc41ea97c64aa35))

## [1.2.0](https://github.com/ydb-platform/ydb-ui-components/compare/v1.1.3...v1.2.0) (2022-05-23)


### Features

* a param to always refetch nodes data ([6cee325](https://github.com/ydb-platform/ydb-ui-components/commit/6cee32581d0a16ecc8bb742eb8f2c27d2d9a1cad))

### [1.1.3](https://github.com/ydb-platform/ydb-ui-components/compare/v1.1.2...v1.1.3) (2022-05-23)


### Bug Fixes

* add @yandex-cloud/uikit to peer deps ([61d5628](https://github.com/ydb-platform/ydb-ui-components/commit/61d5628088528e5c532c096bacebb2eca3f68206))

### [1.1.2](https://github.com/ydb-platform/ydb-ui-components/compare/v1.1.1...v1.1.2) (2022-05-19)


### Bug Fixes

* move react-treeview to prod deps ([#5](https://github.com/ydb-platform/ydb-ui-components/issues/5)) ([04d307b](https://github.com/ydb-platform/ydb-ui-components/commit/04d307b226b8b0d7bdaf58542df8d214fb49acce))
* @yandex-cloud/browserslist-config as peer dependency ([c3b48a7](https://github.com/ydb-platform/ydb-ui-components/commit/c3b48a7ea0370c854fb68b1e1fc12541e8a6494e))
* use provided root path ([203abd1](https://github.com/ydb-platform/ydb-ui-components/commit/203abd1892ad1e8c8c4555b06b99aa41ff01ab01))
* include i18n files ([8363de6](https://github.com/ydb-platform/ydb-ui-components/commit/8363de686cbad9e10753b47a62e7917610dcc84d))

### [1.1.1](https://www.github.com/ydb-platform/ydb-ui-components/compare/v1.1.0...v1.1.1) (2022-05-13)


### Bug Fixes

* fix package ([67b3b0e](https://www.github.com/ydb-platform/ydb-ui-components/commit/67b3b0e3c2678452847ca3b1489be11fc73ea6c2))

## 1.1.0 (2022-04-18)
