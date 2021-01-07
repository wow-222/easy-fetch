import typescript from 'rollup-plugin-typescript2'
import eslint from '@rollup/plugin-eslint'
import pkg from './package.json'

export default {
	input: 'src/index.ts',
	plugins: [
		typescript({ useTsconfigDeclarationDir: true }),
		eslint()
	],
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: 'easyFetch'
		},
		{ file: pkg.module, format: 'es' },
	]
};