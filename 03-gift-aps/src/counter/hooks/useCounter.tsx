import { useState } from 'react'

export const useCounter = (initialvalue: number = 10) => {
    const [counter, setcounter] = useState(initialvalue)

    const handleAdd = () => {
        setcounter(counter + 1)
    }

    const handleless = () => {
        setcounter(counter - 1)
    }

    const handreset = () => {
        setcounter(initialvalue)
    }

    return {
        //valores
        counter,

        //metodos
        handleAdd,
        handleless,
        handreset
    }
}
