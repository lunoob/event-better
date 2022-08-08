import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

const publicConfig = {
    format: 'umd',
    name: 'evb'
}

const config = defineConfig({
    input: './src/index.ts',
    output: [
        { file: './evb.js', ...publicConfig },
        { file: './evb.min.js', ...publicConfig, plugins: [terser()] }
    ],
    plugins: [
        typescript({
            declaration: false
        })
    ]
})

export default config
