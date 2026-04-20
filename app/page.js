"use client"

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import WeatherCard from '../components/WeatherCard'
import GraficoHistorico from '../components/GraficoHistorico'
import CIDADES from '../lib/cidades'

export default function Home() {
  const [cidadeSelecionada, setCidadeSelecionada] = useState(CIDADES[0])
  const [dadosCidades, setDadosCidades] = useState({})
  const [loading, setLoading] = useState({})
  const [erros, setErros] = useState({})

  async function buscarDados(cidade) {
    setLoading(prev => ({ ...prev, [cidade.nome]: true }))
    setErros(prev => ({ ...prev, [cidade.nome]: false }))

    try {
      const res = await fetch(`/api/clima?lat=${cidade.lat}&lon=${cidade.lon}`)
      const data = await res.json()

      if (data.erro) throw new Error(data.erro)

      setDadosCidades(prev => ({ ...prev, [cidade.nome]: data }))
    } catch (e) {
      setErros(prev => ({ ...prev, [cidade.nome]: true }))
    } finally {
      setLoading(prev => ({ ...prev, [cidade.nome]: false }))
    }
  }

  useEffect(() => {
    CIDADES.forEach(cidade => buscarDados(cidade))
  }, [])

  const dadosGrafico = dadosCidades[cidadeSelecionada.nome]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">🗺️ Cidades Monitoradas</h2>
          <p className="text-gray-500 text-sm mt-1">Clique em uma cidade para ver o gráfico detalhado</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {CIDADES.map(cidade => (
            <div
              key={cidade.nome}
              onClick={() => setCidadeSelecionada(cidade)}
              className={`cursor-pointer transition-transform hover:scale-105 ${
                cidadeSelecionada.nome === cidade.nome ? 'ring-4 ring-blue-400 ring-offset-2 rounded-2xl' : ''
              }`}
            >
              <WeatherCard
                cidade={cidade}
                dados={dadosCidades[cidade.nome]}
                carregando={loading[cidade.nome]}
                erro={erros[cidade.nome]}
              />
            </div>
          ))}
        </div>

        {dadosGrafico && (
          <GraficoHistorico
            horas={dadosGrafico.horas}
            temperaturas={dadosGrafico.historico}
            cidade={cidadeSelecionada.nome}
          />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => CIDADES.forEach(c => buscarDados(c))}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-xl active:scale-95"
          >
            🔄 Atualizar Dados
          </button>
        </div>
      </main>
    </div>
  )
}