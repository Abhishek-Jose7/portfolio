"use client"

import { ThemeProvider } from "@/components/ThemeProvider"
import { PortfolioContent } from "@/components/PortfolioContent"

export default function CatchAllPage() {
    return (
        <ThemeProvider>
            <PortfolioContent />
        </ThemeProvider>
    )
}
