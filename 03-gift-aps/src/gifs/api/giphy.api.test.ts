import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe('giphy api test', () => {
    test('deberia estar configurado correctamente', () => {
        const params = giphyApi.defaults.params

        expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs')
        expect(params.lang).toBe('es')
        expect(params.api_key).toBe(import.meta.env.VITE_GIPHY_APY_KEY)

        //para evaluar objetos mas estrictos
        expect(params).toStrictEqual({
            lang: 'es',
            api_key: import.meta.env.VITE_GIPHY_APY_KEY
        })

    })
})