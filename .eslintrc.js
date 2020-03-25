module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest":true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "experimentalDecorators": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "no-debugger": 0,
        "no-console":0,
        "indent": [
            "warn",
            2
        ],
        "no-unused-vars": [1],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-trailing-spaces": [
            2,
            { "skipBlankLines": true }
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "comma-dangle": [
            "warn",
            "always-multiline"
        ],
        "react/jsx-uses-vars": 1,
        "jest/no-disabled-tests": 0,
    }
};
