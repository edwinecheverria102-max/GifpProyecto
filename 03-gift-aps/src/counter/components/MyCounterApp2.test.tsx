import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { MyCounterApp } from "./MyCounterApp";
//import { useCounter } from "../hooks/useCounter";

const handleAddmock = vi.fn()
const handlelessmock = vi.fn()
const handresetmock = vi.fn()

//simulacion de los hooks
vi.mock('../hooks/useCounter', () => ({
    useCounter: () => ({
        //fn nos permite saber cuantas veces se ha llamado
        counter: 20,
        handleAdd: handleAddmock,
        handleless: handlelessmock,
        handreset: handresetmock
    })
}))

describe('My counter app 2', () => {
    test('deberia renderisar los componenetes', () => {
        render(<MyCounterApp />)

        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(' counter: 20')
        expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
        expect(screen.getByRole('button', { name: 'reset' })).toBeDefined()
    })

    test('deberia llamar handleadd si el boton es presionado', () => {
        render(<MyCounterApp />)

        const button = screen.getByRole('button', { name: '+1' })

        fireEvent.click(button)

        expect(handleAddmock).toHaveBeenCalled()
    })
})