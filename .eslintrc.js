module.exports = {
	env: {
		commonjs: true,
		es6: true,
		node: true,
	},
	eslintIgnore: ['build/'],
	extends: ['airbnb-base'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'no-console': 'off',
		'no-tabs': 'off',
		indent: ['error', 'tab'],
	},
};
