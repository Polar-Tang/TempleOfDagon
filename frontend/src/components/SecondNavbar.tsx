import { ParentProps } from '@/types/ContextTypes'

const SecondNavbar = ({ children }: ParentProps) => {
  return (
    <div className="min-h-screen w-screen bg-black text-white">
    <header className="border-b border-gray-800 top-0 w-full h-15 px-4 py-2">
    </header>
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"></div>
        {children}
        </div>
      </main >
    </div >
  )
}

export default SecondNavbar