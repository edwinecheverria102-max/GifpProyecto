import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import { GiftApp } from './GiftApp.tsx'
//import { MyCounterApp } from './counter/components/MyCounterApp.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GiftApp />
    {/*<MyCounterApp />*/}
  </StrictMode>,
)
