import { Activity, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
  project: {
    id: number
    name: string
    url: string
    repo: string
    description: string
    updatedAt: string
    branch: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-gray-800 rounded flex items-center justify-center text-gray-400">
              
            </div>

            <div>
              <h3 className="font-medium text-white">{project.name}</h3>
              <p className="text-sm text-gray-400">{project.url}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-gray-800 text-gray-400">
              <Activity className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full bg-transparent text-gray-400">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span className="text-gray-400">{project.repo}</span>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-400">{project.description}</p>

          <div className="mt-4 flex items-center text-xs text-gray-500">
            <span>{project.updatedAt} on</span>
            <div className="ml-1 flex items-center">
              <svg className="h-3 w-3 mr-1" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.93 8.5a4.002 4.002 0 01-7.86 0H.75a.75.75 0 010-1.5h3.32a4.002 4.002 0 017.86 0h3.32a.75.75 0 010 1.5h-3.32z"></path>
                <path d="M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
              </svg>
              <span>{project.branch}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

