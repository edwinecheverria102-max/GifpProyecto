import { useState } from 'react'

export const useCounter = (initialvalue: number) => {
    const [counter, setcounter] = useState(initialvalue)

    const handleAdd = () => {
        setcounter(counter + 1)
    }

    const handleless = () => {
        setcounter(counter - 1)
    }

    const Resettocero = () => {
        setcounter(0)
    }

    return {
        //valores
        counter,

        //metodos
        handleAdd,
        handleless,
        Resettocero
    }
}
