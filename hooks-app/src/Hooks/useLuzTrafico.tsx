import { useEffect, useState } from "react"

const colores = {
    rojo: 'bg-red-500 animate-pulse',
    amarillo: 'bg-yellow-500 animate-pulse',
    verde: 'bg-green-500 animate-pulse'
}

//tipar los colores deacuerdo a los que ya existen
type LuzTraficoColores = keyof typeof colores

export const useLuzTrafico = () => {
    const [luz, setluz] = useState<LuzTraficoColores>('rojo')
    const [contador, setcontador] = useState(5)

    //efecto que controla el contador
    useEffect(() => {
        if (contador === 0) {
            return
        }

        const intervaloID = setInterval(() => {
            setcontador(prev => prev - 1)
        }, 1000)

        return () => (
            clearInterval(intervaloID)
        )
    }, [contador])

    //efecto para que cambie de color
    useEffect(() => {
        if (contador > 0) {
            return
        }

        if (contador === 0) {
            setcontador(5)
            if (luz === 'rojo') {
                setluz('verde')
                return
            }

            if (luz === 'verde') {
                setluz('amarillo')
                return
            }

            if (luz === 'amarillo') {
                setluz('rojo')
                return
            }
        }
    }, [contador, luz])
    return {
        contador,
        colores,
        luz,

        porcentaje: (contador / 5),
        LuzRoja: luz === 'rojo' ? colores[luz] : 'bg-gray-500',
        LuzAmarilla: luz === 'amarillo' ? colores[luz] : 'bg-gray-500',
        LuzVerde: luz === 'verde' ? colores[luz] : 'bg-gray-500'
    }
}
