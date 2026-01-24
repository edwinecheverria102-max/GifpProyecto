import { useRef, useState } from 'react'
import type { Gif } from '../interfaces/gif.interfaces'
import { getgiftbyquery } from '../actions/get-gifs-by-query.actions'

export const useGifts = () => {
    const [gift, setgifts] = useState<Gif[]>([])
    const [previousterms, setpreviousterms] = useState<string[]>([])

    const giftCache = useRef<Record<string, Gif[]>>({})

    const clicktermino = async (term: string) => {

        if (giftCache.current[term]) {
            setgifts(giftCache.current[term])
            return
        }

        const gift = await getgiftbyquery(term)
        setgifts(gift)
    }

    const manejobuscar = async (query: string) => {
        // convertir la busqueda en minuscula y eliminar espacios en blanco
        query = query.trim().toLowerCase()

        //inpedir una busqueda vacia
        if (query.length === 0) return

        //evitar busquedas duplicadas
        if (previousterms.includes(query)) return

        //agrega una busqueda previa
        setpreviousterms([query, ...previousterms].splice(0, 7))

        const gift = await getgiftbyquery(query)
        setgifts(gift)

        giftCache.current[query] = gift
    }

    return {
        //valores
        gift,
        previousterms,
        //funciones
        clicktermino,
        manejobuscar,

    }
}
