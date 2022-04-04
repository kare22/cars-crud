module.exports = {
    env: {
        node: true,
    },

    root: true,
    extends: ['plugin:vue/recommended', 'eslint:recommended',],
    parser: 'vue-eslint-parser',

    rules: {
        'no-debugger': 'error',
        'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
        semi: ['error', 'always'],
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'no-negated-condition': ['error'],
        camelcase: 'off',
        curly: 'error',
        'vue/no-v-html': 'off',
        'vue/no-side-effects-in-computed-properties': 'error',
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/no-mutating-props': 'off',
        'vue/valid-v-slot': 'off',
        "vue/max-attributes-per-line": ["error", {
            "singleline": {
                "max": 1,
                "allowFirstLine": true
            },
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/html-closing-bracket-spacing": ["error", {
            "startTag": "never",
            "endTag": "never",
            "selfClosingTag": "always"
        }],
        "vue/no-multi-spaces": ["error", {
            "ignoreProperties": false
        }],
        "vue/no-spaces-around-equal-signs-in-attribute": ["error"],
        "vue/attribute-hyphenation": ["error", "always"],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "always"
        }],
        "vue/html-indent": ["error", 4, {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
        }],
        "vue/html-quotes": ["error", "double", { "avoidEscape": false }],
        "vue/mustache-interpolation-spacing": ["error", "always"],
        "vue/v-bind-style": ["error", "shorthand"],
        "vue/v-on-style": ["error", "shorthand"],

        '@typescript-eslint/no-explicit-any': 'off'
    },

    overrides: [
        {
            files: ['**/__tests__/*.js?(x)', '**/__mocks__/*.js?(x)', '**/tests/unit/**/*.spec.js?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
