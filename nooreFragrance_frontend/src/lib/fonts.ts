// app/fonts.ts or lib/fonts.ts
import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google'

export const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-bodoni-moda', 
  display: 'swap',
  weight: ['400', '600'],
  style: ['italic'],
})

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  weight: ['400', '500', '700'],
  style: ['normal'],
})