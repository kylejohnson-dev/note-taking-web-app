'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Archive, Clock, House, Plus, Settings, Tag, Trash2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Fragment, useState } from "react";

export default function Dashboard({ notes }) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'all' | 'archived'>('all')

  const tags = notes.map((note) => note.tags)
  const tagsArray = [...new Set(tags.flat())]

  const filterNotesByArchived = viewMode === 'all'
    ? notes.filter(note => !note.isArchived)
    : notes.filter(note => note.isArchived)
  
  const filterNotesByTag = activeTag 
    ? notes.filter(note => note.tags.includes(activeTag))
    : notes

  function filterByTag(n, tag) {
    if (!tag) {
      return n
    }

    return n.filter(_n => _n.tags.includes(tag))
  }
  const filteredNotes = () => {
    return filterByTag(filterNotesByArchived, activeTag)
  }

  return (
    <>
      {/* Sidebar */}
      <aside className="hidden lg:block absolute top-0 bottom-0 left-0 w-[272px] bg-white border-r border-neutral-200 px-4 py-3">
        <div className="flex flex-col gap-y-4">
          <div className="py-3">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div>
            <div className="flex flex-col items-stretch gap-y-1 bg-white p-0">
              <button 
                value="all-notes"
                onClick={() => setViewMode('all')}
                className="flex items-center gap-x-2 text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[120%] -tracking-[0.2px] px-3 py-2.5"
              >
                <House strokeWidth={1.5} className="w-5 h-5" />
                All Notes
              </button>
              <button 
                value="archived-notes"
                onClick={() => setViewMode('archived')}
                className="flex items-center gap-x-2 text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[120%] -tracking-[0.2px] px-3 py-2.5"
              >
                <Archive strokeWidth={1.5} className="w-5 h-5" />
                Archived Notes
              </button>
            </div>
            <Separator className="bg-neutral-200 mt-2" />
            <p className="text-neutral-500 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[120%] -tracking-[0.2px] px-2 my-2">Tags</p>
            {tagsArray.sort().map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)} className="flex items-center gap-x-2 px-3 py-2.5">
                <Tag strokeWidth={1.5} />
                {tag}
              </button>
            ))}
          </div>
        </div>
      </aside>
      {/* Navbar */}
      <header className="absolute top-0 left-[272px] right-0 h-[81px] border-b border-neutral-200 bg-white px-8">
        <div className="w-full h-full flex items-center justify-between">
          <div>
            <h1 className="text-neutral-950 font-[family-name:var(--font-inter)] text-[24px] font-bold leading-[120%] -tracking-[0.5px]">All Notes</h1>
          </div>
          <div className="flex items-center gap-x-4">
            <Input 
              placeholder="Search by title, content, or tags..." 
              className="w-[268px]"
            />
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </div>
        </div>
      </header>
      {/* Main */}
      <main className="absolute top-[81px] bottom-0 left-0 lg:left-[272px] right-0 flex bg-white">
        <ScrollArea className="hidden shrink-0 w-[242px] lg:flex flex-col border-r border-neutral-200 px-4 py-5">
          <Button className="w-full">
            <Plus />
            Create New Note
          </Button>
          {notes.length ? (
            // Full stste - with notes
            <Tabs>
              <TabsList className="h-auto flex flex-col items-stretch gap-y-1 bg-white p-0 mt-4">
                {filteredNotes().map((n) => {
                  const { title, tags, lastEdited } = n
                  const date = new Date(lastEdited).toDateString().slice(4)

                  return (
                    <Fragment key={title}>
                      <TabsTrigger
                        value={title}
                        className="flex-col items-start justify-start gap-y-3 p-2"
                      >
                        <h2 className="text-wrap text-left text-neutral-950 font-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[120%] -tracking-[0.3px]">{title}</h2>
                        <div className="flex items-center gap-1 flex-wrap">
                          {tags.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
                        </div>
                        <p className="text-neutral-700 font-[family-name:var(--font-inter)] text-[12px] leading-[120%] -tracking-[0.2px]">{date}</p>
                      </TabsTrigger>
                      <Separator className="my-1" />
                    </Fragment>
                  )
                })}
              </TabsList>
            </Tabs>
          ) : (
            // Empty state - no notes
            <div className="bg-neutral-100 rounded-[8px] border border-neutral-200 p-2 mt-4">
              <p className="text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">You don&#39;t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
            </div>
          )
        }
        </ScrollArea>
        <div className="flex">
          <div className="w-full flex flex-col gap-y-4 border-r border-neutral-200 px-6 py-5">
            <h2 className="text-neutral-950 font-[family-name:var(--font-inter)] text-[24px] font-bold leading-[120%] -tracking-[0.5px]">React Performance Optimization</h2>
            <div>
              <div className="flex">
                <div className="w-28 flex items-center gap-x-1.5">
                  <Tag strokeWidth={1} className="w-4 h-4 mt-0.5" />
                  <span className="text-neutral-700 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">Tags</span>
                </div>
                <div>
                  <span className="text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">Dev, React</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-28 flex items-center gap-x-1.5">
                  <Clock strokeWidth={1} className="w-4 h-4 mt-0.5" />
                  <span className="text-neutral-700 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">Last edited</span>
                </div>
                <div>
                  <span className="text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">29 Oct 2024</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="text-neutral-800 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">
              {"Key performance optimization techniques:\n\n1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n\n2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n\n3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks"}
            </div>
            <Separator className="mt-auto" />
            <div className="flex gap-x-4">
              <Button>Save Note</Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </div>
          <div className="hidden w-[258px] lg:flex flex-col gap-y-3 px-4 py-5 ml-auto">
            <Button className="gap-x-2">
              <Archive />
              Archive Note
            </Button>
            <Button>
              <Trash2 />
              Delete Note
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
