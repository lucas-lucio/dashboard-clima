import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ erro: 'Latitude e longitude são obrigatórios' }, { status: 400 })
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m&forecast_days=1&timezone=America/Sao_Paulo`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error('Falha ao buscar dados da API')
    }

    const data = await res.json()

    return NextResponse.json({
      temperatura: data.current.temperature_2m,
      umidade: data.current.relative_humidity_2m,
      vento: data.current.wind_speed_10m,
      codigo: data.current.weather_code,
      historico: data.hourly.temperature_2m.slice(0, 12),
      horas: data.hourly.time.slice(0, 12).map(t => t.slice(11, 16)),
    })

  } catch (erro) {
    return NextResponse.json({ erro: 'Erro ao buscar dados meteorológicos' }, { status: 500 })
  }
}