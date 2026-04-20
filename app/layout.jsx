import './globals.css'

export const metadata = {
  title: 'Clima Dashboard',
  description: 'Dashboard meteorológico com Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}