import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export interface Message {
  id: string
  text: string
  sender?: string
  timestamp?: string
}

export interface TypingIndicator {
  username: string
  isTyping: boolean
}

// Initialize socket connection
export const initSocket = (url: string = `${import.meta.env.VITE_URL}`): Socket => {
  if (!socket) {
    socket = io(url)
    console.log('Socket initialized')
  }
  return socket
}

// Get current socket instance
export const getSocket = (): Socket | null => {
  return socket
}

// Disconnect socket
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
    console.log('Socket disconnected')
  }
}

// Join chat room
export const joinChat = (username: string): void => {
  if (socket) {
    socket.emit('user:join', username)
  }
}

// Send a message
export const sendMessage = (message: Omit<Message, 'sender' | 'timestamp'>): void => {
  if (socket) {
    socket.emit('message:send', message)
  }
}

// Send typing indicator
export const sendTypingIndicator = (isTyping: boolean): void => {
  if (socket) {
    socket.emit('user:typing', isTyping)
  }
}

// Event listeners
export const onMessageReceived = (callback: (message: Message) => void): void => {
  if (socket) {
    socket.on('message:receive', callback)
  }
}

export const onUserTyping = (callback: (data: TypingIndicator) => void): void => {
  if (socket) {
    socket.on('user:typing', callback)
  }
}

export const onUserListUpdated = (callback: (users: string[]) => void): void => {
  if (socket) {
    socket.on('user:list', callback)
  }
}

// Remove event listeners
export const offMessageReceived = (): void => {
  if (socket) {
    socket.off('message:receive')
  }
}

export const offUserTyping = (): void => {
  if (socket) {
    socket.off('user:typing')
  }
}

export const offUserListUpdated = (): void => {
  if (socket) {
    socket.off('user:list')
  }
}

// Create a cleaner hook-friendly version
export const useSocketService = () => {
  return {
    initSocket,
    disconnectSocket,
    joinChat,
    sendMessage,
    sendTypingIndicator,
    onMessageReceived,
    onUserTyping,
    onUserListUpdated,
    offMessageReceived,
    offUserTyping,
    offUserListUpdated,
  }
}
