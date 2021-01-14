import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser	} from "rollup-plugin-terser"

export default {
	input: 'src/index.ts',
	plugins: [
		typescript({ useTsconfigDeclarationDir: true })
	],
	output: [
		{
			file: pkg.main,
			format: 'umd',
			name: 'easyFetch',
			plugins: [terser()]
		},
		{ file: pkg.umd, format: "umd", name: 'easyFetch' },
		{ file: pkg.module, format: 'es' },
	]
};