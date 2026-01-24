import { useEffect, useState, type KeyboardEvent } from 'react'

interface props {
    boton: string,
    buscador: string

    manejobuscar: (query: string) => void
}



export const Buscador = ({ boton, buscador, manejobuscar }: props) => {
    const [query, setquery] = useState('')

    //funcion para la busqueda
    useEffect(() => {
        const timeoutid = setTimeout(() => {
            manejobuscar(query)
        }, 700)

        return () => {
            clearTimeout(timeoutid)
        }
    }, [query, manejobuscar])

    const Manejodebusqueda = () => {
        manejobuscar(query)
        setquery('')
    }

    const manejodeteclas = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            Manejodebusqueda()
        }
    }
    return (
        <div className='search-container'>
            <input
                type='text'
                placeholder={buscador}
                value={query}
                onChange={(event) => setquery(event.target.value)}
                onKeyDown={manejodeteclas}
            />
            <button onClick={Manejodebusqueda}>{boton}</button>
        </div>
    )
}
