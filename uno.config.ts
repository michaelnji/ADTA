import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
export default defineConfig({
    theme: {
        fontFamily: {
            display: 'Poppins',
            mono: 'Spline Sans Mono',
            compact: 'Manrope',
            body: 'Manrope',
            sans: 'Manrope'
        },

    },
    // safelist: ["fill-purple-500", "stroke-purple-500", "stroke-purple-300", "fill-purple-300", "fill-amber-500", "stroke-amber-500", "stroke-amber-300", "fill-amber-300"],
    presets: [
        presetUno(),
    ],
    transformers: [
        transformerDirectives(),
    ],
})