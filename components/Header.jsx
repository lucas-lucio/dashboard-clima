"use client"

import { useState, useEffect } from 'react'

export default function Header() {
  const [hora, setHora] = useState('')

  useEffect(() => {
    const atualizar = () => {
      setHora(new Date().toLocaleTimeString('pt-BR'))
    }
    atualizar()
    const intervalo = setInterval(atualizar, 1000)
    return () => clearInterval(intervalo)
  }, [])

  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-6 px-8 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">🌦️ Clima Dashboard</h1>
          <p className="text-blue-100 text-sm mt-1">Dados meteorológicos em tempo real</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-bold">{hora}</p>
          <p className="text-blue-100 text-sm">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>
    </header>
  )
}
