# Lighthouse Plugin: MD5

[![NPM](https://img.shields.io/npm/v/lighthouse-plugin-md5.svg)](https://www.npmjs.com/package/lighthouse-plugin-md5) [![Github Workflow Status](https://github.com/aquariuslt/lighthouse-plugin-md5/workflows/build/badge.svg)](https://github.com/aquariuslt/lighthouse-plugin-md5) [![Codecov](https://codecov.io/gh/aquariuslt/lighthouse-plugin-md5/branch/master/graph/badge.svg)](https://codecov.io/gh/aquariuslt/lighthouse-plugin-md5)

A plugin to help you generate network requests content md5 and set in `resource-content-md5` audit.

## Usage

### Installation

```shell script
npm i lighthouse-plugin-md5
```

or use yarn

```shell script
yarn add lighthouse-plugin-md5
```

### Lighthouse Configuration

When programmatically use lighthouse, you can follow below

#### Add `plugins` and `configFlags.configPath` in Configuration

```js
// make configFixturePath to your project `<rootDir>/node_modules`
// it might be not clean but is a better workaround for standalone lighthouse plugin from public registry
const configFixturePath = resolve('node_modules');

const configJson = {
  extends: 'lighthouse:default',
  plugins: ['lighthouse-plugin-md5'],
  passes: [
    {
      passName: 'defaultPass',
      gatherers: [{ path: 'lighthouse-plugin-md5/lib/gatherers/resource-content-md5' }]
    }
  ]
};
const configPathFlags = { configPath: configFixturePath };

const result = await lighthouse(url, configPathFlags, configJson);
```

#### You can see a new audits with id `resource-content-md5` in LHR

like below

```json
{
  "audits": {
    "resource-content-md5": {
      "id": "resource-content-md5",
      "title": "Resource Content MD5",
      "description": "Resource Content with MD5 Validation",
      "score": 1,
      "scoreDisplayMode": "binary",
      "numericValue": 96,
      "details": {
        "type": "table",
        "headings": [
          { "key": "url", "itemType": "url", "text": "URL" },
          { "key": "md5", "itemType": "string", "text": "MD5" }
        ],
        "items": [
          {
            "url": "https://example.com/somepic.png",
            "md5": "1c9f929b054c91b4d45c376eebab291a"
          },
          {
            "url": "https://example.com/somejs.js",
            "md5": "dd8a239825fde9dcd882c4f3c8002b55"
          }
        ]
      }
    }
  }
}
```
