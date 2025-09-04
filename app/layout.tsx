/* eslint-disable react-refresh/only-export-components */
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AgentEva - AI Agent Platform',
  description: 'Deploy intelligent AI agents that work 24/7 for your business. Automate customer service, sales, and operations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans text-gray-800">
        {children}
      </body>
    </html>
  )
}
