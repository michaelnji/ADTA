import presetUno from '@unocss/preset-uno'
import transformerDirectives from '@unocss/transformer-directives'
import { defineConfig } from 'unocss'
export default defineConfig({
    theme: {
        fontFamily: {
            mono: 'Jozsika',
            display: 'LT Wave',
            compact: 'Rogbold',
            body: 'Lufga',
            sans: 'Lufga',
            cursive: 'Handbuck'
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