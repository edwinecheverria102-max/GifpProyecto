//import React from 'react'
import type { Gif } from '../interfaces/gif.interfaces'

type NewType = Gif[]

interface prop {
    gifs: NewType
}
export const Giftlist = ({ gifs }: prop) => {
    return (
        <div className='gifs-container'>
            {gifs.map((gif) => (
                <div key={gif.id} className='gif-card'>
                    <img src={gif.url} alt={gif.title} />
                    <h3>{gif.title}</h3>
                    <p>
                        {gif.width}x{gif.height} (1.5mb)
                    </p>
                </div>
            ))
            }
        </div>
    )
}
