import { promises as fs } from "fs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Archive, House, Plus, Settings, Tag } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Dashboard from "@/components/dashboard";

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
      <Dashboard notes={data.notes} />
    </>
  );
}
