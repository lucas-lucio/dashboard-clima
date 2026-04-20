"use client"

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

export default function GraficoHistorico({ horas, temperaturas, cidade }) {
  const dadosGrafico = horas.map((hora, i) => ({
    hora,
    temp: temperaturas[i]
  }))

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        📈 Temperatura ao longo do dia — {cidade}
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dadosGrafico}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
          <YAxis unit="°C" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
          <Tooltip formatter={(value) => [`${value}°C`, 'Temperatura']} labelFormatter={(label) => `Horário: ${label}`} />
          <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}