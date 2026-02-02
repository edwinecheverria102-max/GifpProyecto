import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifts } from "./useGifts";
import { act } from "react";
import * as gifActions from "../actions/get-gifs-by-query.actions";

describe('useGift', () => {
    test('debe retornal los valores por default y metodos', () => {
        const { result } = renderHook(() => useGifts())

        expect(result.current.gift.length).toBe(0)
        expect(result.current.previousterms.length).toBe(0)
        expect(result.current.manejobuscar).toBeDefined()
        expect(result.current.clicktermino).toBeDefined()
    })

    test('debe retornal los valores por default y metodos', async () => {
        const { result } = renderHook(() => useGifts())

        await act(async () => {
            await result.current.manejobuscar('goku')
        })


        expect(result.current.gift.length).toBe(10)
    })

    test('deteria retornar una lista de gifs cuando clicktermino es presionado', async () => {
        const { result } = renderHook(() => useGifts())

        await act(async () => {
            await result.current.clicktermino('goku')
        })

        expect(result.current.gift.length).toBe(10)
    })

    test('deberia retornar una lista de gifs del cache', async () => {
        const { result } = renderHook(() => useGifts())

        await act(async () => {
            await result.current.clicktermino('goku')
        })

        expect(result.current.gift.length).toBe(10)

        vi.spyOn(gifActions, 'getgiftbyquery')
            .mockRejectedValue(
                new Error('este es mi error customisado')
            )

        await act(async () => {
            await result.current.clicktermino('goku')
        })

        expect(result.current.gift.length).toBe(10)
    })

    test('deberia retornar no mas de 8 terminos', async () => {
        const { result } = renderHook(() => useGifts())

        vi.spyOn(gifActions, 'getgiftbyquery')
            .mockResolvedValue([])

        await act(async () => {
            await result.current.manejobuscar('goku1')
        })

        await act(async () => {
            await result.current.manejobuscar('goku2')
        })

        await act(async () => {
            await result.current.manejobuscar('goku3')
        })

        await act(async () => {
            await result.current.manejobuscar('goku4')
        })

        await act(async () => {
            await result.current.manejobuscar('goku5')
        })

        await act(async () => {
            await result.current.manejobuscar('goku6')
        })

        await act(async () => {
            await result.current.manejobuscar('goku7')
        })

        await act(async () => {
            await result.current.manejobuscar('goku8')
        })

        await act(async () => {
            await result.current.manejobuscar('goku9')
        })

        expect(result.current.previousterms.length).toBe(7)
        expect(result.current.previousterms).toStrictEqual([
            'goku9', 'goku8',
            'goku7', 'goku6',
            'goku5', 'goku4',
            'goku3'
        ])
        console.log(result.current.previousterms)
    })
})