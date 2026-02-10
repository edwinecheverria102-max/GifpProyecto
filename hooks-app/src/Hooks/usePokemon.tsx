import { useEffect, useState } from "react"

interface Pokemon {
    ID: number,
    nombre: string,
    imagenURL: string
}

interface props {
    ID: number,
}

export const usePokemon = ({ ID }: props) => {

    const [pokemon, setpokemon] = useState<Pokemon | null>(null)
    const [cargando, setcargando] = useState(true)

    const TenerPokemonID = async (ID: number) => {
        setcargando(true)
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`)
        const data = await respuesta.json()

        setpokemon({
            ID: ID,
            nombre: data.name,
            imagenURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ID}.png`
        })

        setcargando(false)
    }

    useEffect(() => {
        TenerPokemonID(ID)
    }, [ID])

    return {
        cargando,
        pokemon,

        FormularID: ID.toString().padStart(3, '0')
    }
}
