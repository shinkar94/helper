'use client'
import './globals.css'
import {Inter} from 'next/font/google'
import {ReactNode} from "react";
import Providers from "@/providers/providers";


const inter = Inter({subsets: ['latin']})

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({children}: RootLayoutProps) {

    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/manifest.json"/>
            <title>Helper</title>
        </head>
        <body className={inter.className}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    )
}
