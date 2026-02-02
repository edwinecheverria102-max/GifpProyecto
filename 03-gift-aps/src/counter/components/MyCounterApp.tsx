//import React, { useState } from 'react'
import { useCounter } from '../hooks/useCounter'

export const MyCounterApp = () => {
    const { counter, handleAdd, handleless, handreset } = useCounter(10)
    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            <h1> counter: {counter}</h1>

            <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleAdd}>+1</button>
                <button onClick={handleless}>-1</button>
                <button onClick={handreset}>reset</button>
            </div>

        </div>
    )
}
