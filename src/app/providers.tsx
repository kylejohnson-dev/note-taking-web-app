'use client'

import { TagsProvider } from "@/contexts/tags"
import { PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren) {
  return (
    <TagsProvider>
      {children}
    </TagsProvider>
  )
}