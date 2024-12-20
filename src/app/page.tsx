import { promises as fs } from "fs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Archive, House, Plus, Settings, Tag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/lib/data.json', 'utf-8')
  const data = JSON.parse(file)

  const tags = data.notes.map((note) => note.tags)
  const tagsArray = [...new Set(tags.flat())]

  return (
    // <div className="h-screen flex flex-col">
    //   <header className="z-10 fixed top-0 h-[54px] w-full bg-neutral-100 px-4 py-3">
    //     <img src="/logo.svg" alt="logo" />
    //   </header>
    //   <main className="grow flex flex-col gap-4 rounded-t-[8px] bg-white px-4 py-5 pb-14 mt-[54px]">
    //     <div>
    //       <h1 className="text-neutral-950 font-[family-name:var(--font-inter)] text-[24px] font-bold leading-[120%] -tracking-[0.5px]">All Notes</h1>
    //     </div>
    //     <div className="flex flex-col gap-4 self-stretch">
    //       {data.notes.map((note) => {
    //         const { title, tags, content, lastEdited, isArchived } = note
    //         const date = new Date(lastEdited).toDateString().slice(4)

    //         return (
    //           <>
    //             <div key={title} className="space-y-2">
    //               <h2 className="text-neutral-950 front-[family-name:var(--font-inter)] text-[16px] font-semibold leading-[120%] -tracking-[0.3px]">{title}</h2>
    //               <div className="flex gap-1">
    //                 {tags.map((tag) => (
    //                   <div 
    //                     key={tag} 
    //                     className="text-neutral-950 font-[family-name:var(--font-inter)] font-[12px] leading-[120%] -tracking-[0.2px] bg-neutral-200 rounded-sm px-1.5 py-0.5"
    //                   >
    //                     {tag}
    //                   </div>
    //                 ))}
    //               </div>
    //               <p className="text-neutral-700 font-[family-name:var(--font-inter)] font-[12px] leading-[120%] -tracking-[0.2px]">{date}</p>
    //             </div>
    //             <Separator />
    //           </>
    //         )
    //       })}
    //     </div>
    //   </main>
    //   <footer className="fixed bottom-0 w-full h-14 bg-white border-t border-neutral-200 shadow-[0px_-4px_6px_0px_rgba(240,240,240,0.60)] px-6 py-3">
    //     <div className="flex items-center justify-between">
    //       <div className="grow flex justify-center">
    //         <img src="/icon-home.svg" alt="home" />
    //       </div>
    //       <div className="grow flex justify-center">
    //         <img src="/icon-search.svg" alt="home" />
    //       </div>
    //       <div className="grow flex justify-center">
    //         <img src="/icon-archive.svg" alt="home" />
    //       </div>
    //       <div className="grow flex justify-center">
    //         <img src="/icon-tag.svg" alt="home" />
    //       </div>
    //       <div className="grow flex justify-center">
    //         <img src="/icon-settings.svg" alt="home" />
    //       </div>
    //     </div>
    //   </footer>
    // </div>

    <>
      {/* Sidebar */}
      <aside className="absolute top-0 bottom-0 left-0 w-[272px] bg-white border-r border-neutral-200 px-4 py-3">
        <div className="flex flex-col gap-y-4">
          <div className="py-3">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div>
            <Tabs defaultValue="all-notes">
              <TabsList className="h-auto flex flex-col items-stretch gap-y-1 bg-white p-0">
                <TabsTrigger 
                  value="all-notes"
                  className="justify-start gap-x-2 text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[120%] -tracking-[0.2px] px-3 py-2.5"
                >
                  <House strokeWidth={1.5} className="w-5 h-5" />
                  All Notes
                </TabsTrigger>
                <TabsTrigger 
                  value="archived-notes"
                  className="justify-start gap-x-2 text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-[120%] -tracking-[0.2px] px-3 py-2.5"
                >
                  <Archive strokeWidth={1.5} className="w-5 h-5" />
                  Archived Notes
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator className="bg-neutral-200 mt-2" />
            {tagsArray.sort().map((tag) => (
              <div key={tag} className="flex items-center gap-x-2 px-3 py-2.5">
                <Tag strokeWidth={1.5} />
                {tag}
              </div>
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
      <main className="absolute top-[81px] bottom-0 left-[272px] right-0 flex bg-white">
        <ScrollArea className="w-[242px] flex flex-col border-r border-neutral-200 px-4 py-5">
          <Button className="w-full">
            <Plus />
            Create New Note
          </Button>
          {data.notes.length ? (
            // Full stste - with notes
            <Tabs>
              <TabsList className="h-auto flex flex-col items-stretch gap-y-1 bg-white p-0 mt-4">
                {data.notes.filter((note) => !note.isArchived).map((n) => {
                  const { title, tags, lastEdited } = n
                  const date = new Date(lastEdited).toDateString().slice(4)

                  return (
                    <>
                      <TabsTrigger
                        key={title}
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
                    </>
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
        <div className=""></div>
      </main>
    </>
  );
}
