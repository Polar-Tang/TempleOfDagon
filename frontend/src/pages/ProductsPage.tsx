import {  ChevronDown, Grid, List, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProjectCard from "@/components/ProjectCard"
import Navbar from "@/components/Navbar"

export default function ProductsPage() {
  const projects = [
    {
      id: 1,
      name: "trian-tattoo-qmiy",
      url: "trian-tattoo-qmiy.vercel.app",
      repo: "Polar-Tang/TrianTattoo",
      description: "using static numbers instead of element properties that ar...",
      updatedAt: "2d ago",
      branch: "main",
    },
    {
      id: 2,
      name: "trian-tattoo",
      url: "trian-tattoo.vercel.app",
      repo: "Polar-Tang/TrianTattoo",
      description: "using static numbers instead of element properties that ar...",
      updatedAt: "2d ago",
      branch: "main",
    },
    {
      id: 3,
      name: "white-bakana",
      url: "white-bakana.vercel.app",
      repo: "Polar-Tang/single_opt-in_BAKANA",
      description: "DVH AND H-SCREEN ON LG",
      updatedAt: "Feb 21",
      branch: "main",
    },
  ]

  return (
    <div className="min-h-screen w-screen bg-black text-white">
      <header className="border-b border-gray-800 top-0 w-full h-15 px-4 py-2">
      <Navbar />   
      </header>


      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-auto flex-1 max-w-3xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search Repositories and Projects..."
                className="pl-10 bg-gray-900 border-gray-700 h-10 w-full"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="text-gray-300 border-gray-700 bg-gray-900 flex items-center gap-2">
                <span>Sort by activity</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              <div className="flex items-center border border-gray-700 rounded-md overflow-hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none bg-gray-900 text-gray-300">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none bg-gray-900 text-gray-300">
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button className="ml-2 bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                <span>Add New...</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

