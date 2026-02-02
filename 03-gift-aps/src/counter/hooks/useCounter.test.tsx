import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useCounter } from "./useCounter";

describe('Use Counter', () => {
    test('deberia inicializar con el valor por defecto', () => {
        //Renderhook se usa para renderisar hooks
        const { result } = renderHook(() => useCounter())

        expect(result.current.counter).toBe(10)
    })

    test('deberia inicializar con el valor de 20', () => {
        //Renderhook se usa para renderisar hooks
        const valor = 20

        const { result } = renderHook(() => useCounter(valor))

        expect(result.current.counter).toBe(valor)
    })

    test('deberia incrementar el contador cuando la suma es llamada', () => {
        const { result } = renderHook(() => useCounter())

        //act se una para llamar funciones de forma correcta
        act(() => {
            result.current.handleAdd()
        })

        expect(result.current.counter).toBe(11)
    })

    test('deberia restar el contador cuando la resta es llamada', () => {
        const { result } = renderHook(() => useCounter())

        //act se una para llamar funciones de forma correcta
        act(() => {
            result.current.handleless()
        })

        expect(result.current.counter).toBe(9)
    })

    test('deberia reiniciar el valor cuando el recet es llamado', () => {
        const { result } = renderHook(() => useCounter())

        //act se una para llamar funciones de forma correcta
        act(() => {
            result.current.handreset()
        })

        expect(result.current.counter).toBe(10)
    })

})