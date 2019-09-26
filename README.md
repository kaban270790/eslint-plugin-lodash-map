# eslint-plugin-lodashtonativemap

lodash-to-native map

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lodashtonativemap`:

```
$ npm install eslint-plugin-lodashtonativemap --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lodashtonativemap` globally.

## Usage

Add `lodashtonativemap` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-to-native/map"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-to-native/map/rule-name": 2
    }
}
```

## Supported Rules

* [map](docs/rules/map.md)





