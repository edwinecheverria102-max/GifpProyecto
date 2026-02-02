import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { Buscador } from "./Buscador";

describe('Buscador', () => {
    test('deberia renderisar la barra de busqueda correctamente', () => {
        const { container } = render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={() => { }} />)

        //expect(container).toMatchSnapshot()
        expect(screen.getByRole('textbox')).toBeDefined()
        expect(screen.getByRole('button')).toBeDefined()
    })

    test('deberia llamar al manejo buscar con los correctos valores despues de 700ms', async () => {
        const manejobuscar = vi.fn()
        render(<Buscador buscador="buscar gif" boton="buscar" manejobuscar={() => { }} />)

        const input = screen.getByRole('textbox')
        fireEvent.change(input, { taget: { value: 'test' } })

        await new Promise((resolve) => setTimeout(resolve, 701))

        //await waitFor(() => {
        expect(manejobuscar).toHaveBeenCalled()
        expect(manejobuscar).toHaveBeenCalledWith('test')
        //})
    })
})