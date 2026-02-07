import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Buscador } from "./Buscador";

describe('Buscador', () => {
    test('deberia renderisar la barra de busqueda correctamente', () => {
        const { } = render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={() => { }} />)

        //expect(container).toMatchSnapshot()
        expect(screen.getByRole('textbox')).toBeDefined()
        expect(screen.getByRole('button')).toBeDefined()
    })

    test('deberia llamar al manejo buscar con los correctos valores despues de 700ms', async () => {
        const manejobuscar = vi.fn()
        render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={manejobuscar} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })

        await new Promise((resolve) => setTimeout(resolve, 701))

        //espera a que pasen los eventos
        await waitFor(() => {
            expect(manejobuscar).toHaveBeenCalled()
            expect(manejobuscar).toHaveBeenCalledWith('test')
        })
    })

    test('deberia llamarse una vez cuando dejas de escribir', async () => {
        const manejobuscar = vi.fn()
        render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={manejobuscar} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 't' } })
        fireEvent.change(input, { target: { value: 'te' } })
        fireEvent.change(input, { target: { value: 'tes' } })
        fireEvent.change(input, { target: { value: 'test' } })

        await waitFor(() => {
            expect(manejobuscar).toHaveBeenCalledTimes(1)
            expect(manejobuscar).toHaveBeenCalledWith('test')
        })
    })

    test('deberia llamarse el manejo buscar cuando boton es precionado', () => {
        const manejobuscar = vi.fn()
        render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={manejobuscar} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'test' } })

        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(manejobuscar).toHaveBeenCalledTimes(1)
        expect(manejobuscar).toHaveBeenCalledWith('test')
    })

    test('el buscador deberia estar bien posicionado', () => {
        const valor = 'buscar gift'
        render(<Buscador buscador={valor} boton="buscar" manejobuscar={() => { }} />)

        expect(screen.getByPlaceholderText(valor)).toBeDefined()

    })
})