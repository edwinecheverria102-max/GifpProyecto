import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MyCounterApp } from "./MyCounterApp";

describe('MyCounterApp', () => {
    test('Deberian renderisar los componentes', () => {
        render(<MyCounterApp />)

        screen.debug

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(' counter: 10')
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'reset' })).toBeDefined()
    })

    test('Debe incrementar el contador', () => {
        render(<MyCounterApp />)

        const labelh1 = screen.getByRole('heading', { level: 1 })
        const button = screen.getByRole('button', { name: '+1' })

        fireEvent.click(button)

        expect(labelh1.innerHTML).toContain(' counter: 11')
    })
})