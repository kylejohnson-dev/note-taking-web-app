import { Clock, Tag } from "lucide-react";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function CreateNote() {
  const [note, setNote] = useState('')
  const [title, setTitle] = useState('')

  return (
    <div className="w-full flex flex-col gap-y-4 border-r border-neutral-200 px-6 py-5">
      {/* <h2 className="text-neutral-950 font-[family-name:var(--font-inter)] text-[24px] font-bold leading-[120%] -tracking-[0.5px]">React Performance Optimization</h2> */}
      <Input 
        placeholder="Enter a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-neutral-950 font-[family-name:var(--font-inter)] text-[24px] font-bold leading-[120%] -tracking-[0.5px]"
      />
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
            {/* <span className="text-neutral-700 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">Last edited</span> */}
            <Input placeholder="Add tags separated by commas (e.g. Work, Planning)" />
          </div>
          <div>
            <span className="text-neutral-950 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">29 Oct 2024</span>

          </div>
        </div>
      </div>
      <Separator />
      <div className="text-neutral-800 font-[family-name:var(--font-inter)] text-[14px] leading-[130%] -tracking-[0.2px]">
        <Textarea 
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="resize-none  shadow-none rounded-none border-none p-0"
          placeholder="Start typing your note here..."
        >
        </Textarea>
      </div>
      <Separator className="mt-auto" />
      <div className="flex gap-x-4">
        <Button>Save Note</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  )
}