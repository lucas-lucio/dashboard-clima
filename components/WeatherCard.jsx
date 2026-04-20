"use client"

function getCorTemperatura(temp) {
  if (temp === null || temp === undefined) return {
    fundo: 'bg-gray-100',
    texto: 'text-gray-800',
    badge: 'bg-gray-200 text-gray-700',
    icone: '❓'
  }
  if (temp < 15) return {
    fundo: 'bg-blue-50 border-blue-200',
    texto: 'text-blue-900',
    badge: 'bg-blue-100 text-blue-700',
    icone: '🥶'
  }
  if (temp < 25) return {
    fundo: 'bg-cyan-50 border-cyan-200',
    texto: 'text-cyan-900',
    badge: 'bg-cyan-100 text-cyan-700',
    icone: '🌤️'
  }
  if (temp < 35) return {
    fundo: 'bg-orange-50 border-orange-200',
    texto: 'text-orange-900',
    badge: 'bg-orange-100 text-orange-700',
    icone: '☀️'
  }
  return {
    fundo: 'bg-red-50 border-red-200',
    texto: 'text-red-900',
    badge: 'bg-red-100 text-red-700',
    icone: '🔥'
  }
}

export default function WeatherCard({ cidade, dados, carregando, erro }) {
  const cor = getCorTemperatura(dados?.temperatura)

  return (
    <div className={`rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 ${cor.fundo}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className={`text-xl font-bold ${cor.texto}`}>{cidade.nome}</h2>
          <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${cor.badge}`}>
            {cidade.uf}
          </span>
        </div>
        <span className="text-4xl">{cor.icone}</span>
      </div>

      {carregando && (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          <span>Buscando dados...</span>
        </div>
      )}

      {erro && !carregando && (
        <p className="text-red-500 text-sm">⚠️ Erro ao carregar dados</p>
      )}

      {dados && !carregando && (
        <div className="space-y-3">
          <div className={`text-5xl font-black ${cor.texto}`}>
            {dados.temperatura}°C
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span>💧</span>
              <span className={cor.texto}>{dados.umidade}% umidade</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💨</span>
              <span className={cor.texto}>{dados.vento} km/h vento</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}