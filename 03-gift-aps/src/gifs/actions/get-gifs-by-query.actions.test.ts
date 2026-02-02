import { beforeEach, describe, expect, test, vi } from "vitest";
import { getgiftbyquery } from "./get-gifs-by-query.actions";
import { giphySearchResponseMock } from './../../../test/mocks/giphy.response.data'
//import { StrictMode } from "react";
import AxiosMockAdapter from 'axios-mock-adapter';
import { giphyApi } from "../api/giphy.api";

describe('get gifs by query', () => {
    let mock = new AxiosMockAdapter(giphyApi)

    //resetea el mock al lugar donde se acaba de instansear
    beforeEach(() => {
        //mock.reset()
        mock = new AxiosMockAdapter(giphyApi)
    })

    test('debe retornar una lista de gifs', async () => {
        mock.onGet('/search').reply(200, giphySearchResponseMock)

        const gifs = await getgiftbyquery('goku')
        expect(gifs.length).toBe(10)

        gifs.forEach(gif => {
            expect(typeof gif.id).toBe('string')
            expect(typeof gif.title).toBe('string')
            expect(typeof gif.url).toBe('string')
            expect(typeof gif.width).toBe('number')
            expect(typeof gif.height).toBe('number')
        })
    })

    test('debe retornar una lista vacia si la consulta esta vacia ', async () => {
        //mock.onGet('/search').reply(200, {data:[]})
        //va a rechazar toda la instancia
        mock.restore()

        const gifs = await getgiftbyquery('')
        expect(gifs.length).toBe(0)


    })

    test('deberia devolver un error cuando el API devuelve un error', async () => {
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => { })

        mock.onGet('/search').reply(400, {
            data: {
                message: 'Bad request'
            }
        })

        const gifs = await getgiftbyquery('goku')
        expect(gifs.length).toBe(0)
        //se asegura de se se llamo el error
        expect(consoleErrorSpy).toHaveBeenCalled()
        //se asegura que sea llamado 1 vez
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
        //se asegura que el error sea llamado con algo
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything())
    })
})