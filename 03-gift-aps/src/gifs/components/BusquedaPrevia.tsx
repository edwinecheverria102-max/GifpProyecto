//import React from 'react'

interface props {
    titulo: string,
    busquedas: string[],

    clickentermino: (term: string) => void
}

export const BusquedaPrevia = ({ titulo, busquedas, clickentermino }: props) => {
    return (
        <div className='previous-searches'>
            <h2>{titulo}</h2>
            <ul className='previous-searches-list'>
                {busquedas.map((term) => (
                    <li key={term} onClick={() => clickentermino(term)}>
                        {term}
                    </li>
                ))}
            </ul>
        </div>
    )
}
