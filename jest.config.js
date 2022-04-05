module.exports = {
    verbose: true,
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    transform: {
        'vee-validate/dist/rules': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!vee-validate/dist/rules)'],
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/src/$1',
    },
};