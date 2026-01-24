import { CustomHeader } from './shared/components/CustomHeader'
import { Buscador } from './shared/components/Buscador'
import { BusquedaPrevia } from './gifs/components/BusquedaPrevia'
import { Giftlist } from './gifs/components/Gift'
import { useGifts } from './gifs/hooks/useGifts'

export const GiftApp = () => {
    const { gift, manejobuscar, previousterms, clicktermino } = useGifts()

    return (
        <>
            {/*cabeza */}
            <CustomHeader
                titulo='Buscador de Gift'
                descripcion='Encuentra el gift perfecto'
            />

            {/*Buscador */}
            <Buscador
                boton='buscar'
                buscador='buscar gift'
                manejobuscar={manejobuscar}
            />

            {/*busqueda previa */}
            <BusquedaPrevia
                titulo='Busquedas previas'
                busquedas={previousterms}
                clickentermino={clicktermino}
            />

            {/*Gift*/}
            <Giftlist
                gifs={gift}
            />
        </>
    )
}
