import { useState } from "react"


export const useContador = (ValorInicial: number) => {
    const [contador, setcontador] = useState(ValorInicial)

    const incremento = () => {
        setcontador(contador + 1)
    }

    const decremento = () => {
        if (contador <= 0) {
            return
        }
        setcontador(contador - 1)
    }


    return {
        contador,
        incremento,
        decremento
    }

}
