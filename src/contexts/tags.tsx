import { createContext, useContext, useState } from "react";

type TagsContextType = {
  activeTag: string | null
  updateActiveTag: (tag: string) => void
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

type TagsProviderProps = {
  children: React.ReactNode
}

export function TagsProvider({ children }: TagsProviderProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const updateActiveTag = (tag: string) => {
    setActiveTag(tag)
  }

  return (
    <TagsContext.Provider value={{ activeTag, updateActiveTag}}>
      {children}
    </TagsContext.Provider>
  )
}

export function useTags() {
  const context = useContext(TagsContext)

  if (!context) {
    throw new Error('useTags must be used within a TagsProvider')
  }

  return context
}