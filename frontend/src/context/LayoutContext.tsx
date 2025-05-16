import { createContext, useEffect, useState } from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppSidebar } from '@/components/menus/SideBar'
import type { LayoutContextProps, ParentProps } from '@/types/ContextTypes'
import { io, Socket } from 'socket.io-client';

export const LayoutContext = createContext({} as LayoutContextProps)

export const LayoutProvider = ({ children }: ParentProps) => {
  const [_, setSocket] = useState<Socket | null>(null)
  useEffect(() => {
    const newSocket = io(`${import.meta.env.VITE_API_URL}`, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    })

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO')
    })

    // ✅ Listen for 'challenge solved'
    newSocket.on('challenge solved', (data) => {
      console.log('🎉 Challenge Solved!', data)

      // 🔥 Call your animation here
      triggerConfetti(data)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO')
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const triggerConfetti = (data: any) => {

    console.log(`🏁 Challenge "${data.name}" completed.`)
  }

  const [string, setstring] = useState("this doesn't do anything")


  return (
    <LayoutContext.Provider value={{
      string,
      setstring
    }}>
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          {children}
          <Footer />
        </div>
      </SidebarProvider>
    </LayoutContext.Provider>
  )
}

export default LayoutProvider
