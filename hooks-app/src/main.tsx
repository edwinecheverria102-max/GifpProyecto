import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FocusScreen } from './03-useRef/FocusScreen'
import { PaginaPokemon } from './02-ejemplos/PaginaPokemon'
import { LuzTraficohook } from './01-UseEfect/LuzTraficohook'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LuzTraficohook />
    <PaginaPokemon />
    <FocusScreen />
  </StrictMode>,
)
