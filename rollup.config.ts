import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
	input: 'src/index.ts',
	plugins: [
		typescript({ useTsconfigDeclarationDir: true })
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