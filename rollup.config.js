import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'

const publicConfig = {
    format: 'umd',
    name: 'evb'
}

const config = defineConfig([
    {
        input: 'src/index.ts',
        output: [
            { file: 'evb.js', ...publicConfig },
            { file: 'evb.min.js', ...publicConfig, plugins: [terser()] }
        ],
        plugins: [
            typescript({
                declaration: false
            })
        ]
    },
    {
        input: 'esm/index.d.ts',
        output: {
            file: 'index.d.ts',
            format: 'es'
        },
        plugins: [dts()]
    }
])

export default config
