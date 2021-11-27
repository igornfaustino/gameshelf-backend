module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	extends: ['airbnb-base', 'airbnb-typescript/base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		project: './tsconfig.json',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-console': 'off',
		'no-tabs': 'off',
		indent: 'off',
		'@typescript-eslint/indent': ['error', 'tab'],
		'import/extensions': 'off',
		'import/prefer-default-export': 'off',
		'no-underscore-dangle': 'off',
		"class-methods-use-this": "off"
	},
};
