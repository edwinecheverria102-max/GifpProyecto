//import React from 'react'

interface props {
    titulo: string,
    descripcion: string
}

export const CustomHeader = ({ titulo, descripcion }: props) => {
    return (
        <div className='content-center'>
            <h1>{titulo}</h1>
            {descripcion && <p>{descripcion}</p>}
        </div>
    )
}
