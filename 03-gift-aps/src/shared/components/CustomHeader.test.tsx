import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from './CustomHeader'

describe('Pruevas a Custom Header', () => {
    const titulo = 'Custom Header'
    const descripcion = 'Descripcion'

    test('deberia renderisar el titulo correctamente', () => {

        render(<CustomHeader titulo={titulo} descripcion={descripcion} />)
        expect(screen.getByText(titulo)).toBeDefined
    })

    test('Deberia renderisar la descripcion', () => {
        render(<CustomHeader titulo={titulo} descripcion={descripcion} />)
        expect(screen.getByText(titulo)).toBeDefined
        expect(screen.getByRole('paragraph')).toBeDefined
        expect(screen.getByRole('paragraph').innerHTML).toBe(descripcion)
    })

    test('No deveria renderisar la descripcion cuando no es proporcionada', () => {
        const { container } = render(<CustomHeader titulo={titulo} />)

        const divElement = container.querySelector('.content-center')

        const h1 = divElement?.querySelector('h1')
        expect(h1?.innerHTML).toBe(titulo)

        const p = divElement?.querySelector('p')
        expect(p).toBeNull()
    })
})