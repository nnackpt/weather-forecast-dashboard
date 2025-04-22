import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather Forecast Dashboard',
  description: '5-Day Weather Forecast for cities around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}