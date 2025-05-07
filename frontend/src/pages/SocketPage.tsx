import React, { useEffect, useRef, useState } from 'react'
import {Message, TypingIndicator} from "@/types/MessageSockets"
import { io, Socket } from 'socket.io-client';

const newSocket = io('http://localhost:3000');


const SocketPage = () => {
 
  
  const username = "Juan"
  const [socketState, setSocketState] = useState<Socket | null>(null);
  const [messages, setMessages] = useState([] as Message[])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  useEffect(() => {
    // Connect to the same port where your server is running
    const socket = io('http://localhost:3000', {
      // Auto reconnection
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      // Optional: For debugging connection issues
      transports: ['websocket', 'polling']
    });

    // Connection events
    socket.on('connect', () => {
      console.log('Connected to server!');
      console.log('Socket ID:', socket.id);
      setIsConnected(true);
      
      // Test message after connection
      socket.emit('thispayload', 'Hello from client!');
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
      setIsConnected(false);
    });

    // Listen for the response to our thispayload event
    socket.on('thispayload_response', (data) => {
      console.log('Received from server:', data);
      setMessages(prev => [...prev, data]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send a message to the server
  // const sendMessage = () => {
  //   if (!inputValue.trim()) return;
    
  //   const socket = io('http://localhost:3000');
  //   socket.emit('thispayload', inputValue);
  //   setInputValue('');
  // };
  


  const sendMessage = (e: React.FormEvent) => {
    // Emit a socket event with the message details
    e.preventDefault();
    newSocket.emit("send_message", {
      senderId: "123",    
      receiverId: "456",
      message: "Hello"  
    });
    // let messageFromInput = e.target
    // if (message.trim() && socket) {
    //   const newMessage = {
    //     id: Date.now().toString(),
    //     text: message,
    //   };
      
    //   socket.emit('message:send', newMessage);
    //   setMessage('');
      
    //   // Clear typing indicator
    //   if (typingTimeoutRef.current) {
    //     clearTimeout(typingTimeoutRef.current);
    //     socket.emit('user:typing', false);
    //   }
    // }
  };
  // Chat interface
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for online users */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Online Users</h2>
        </div>
        <div className="p-4">
          {/* <ul className="space-y-2">
            {connectedUsers.map((user) => (
              <li key={user} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">{user}</span>
              </li>
            ))} 
          </ul>
          */}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        {/* Chat header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">WebSocket Chat</h1>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === username ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'System'
                      ? 'bg-gray-200 text-gray-700'
                      : msg.sender === username
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  {msg.sender !== username && msg.sender !== 'System' && (
                    <div className="mb-1 text-xs font-medium">{msg.sender}</div>
                  )}
                  <div>{msg.text}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {/* <div ref={messagesEndRef} /> */}
            <form onSubmit={sendMessage} className="flex space-x-2">
            <input
              type="text"
              // value={message}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocketPage