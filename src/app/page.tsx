import { promises as fs } from "fs";
import Dashboard from "@/components/dashboard";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/lib/data.json', 'utf-8')
  const data = JSON.parse(file)

  return (
    <div className="fixed inset-0">
      <Dashboard notes={data.notes} />
    </div>
  );
}
