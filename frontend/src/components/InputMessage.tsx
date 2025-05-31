import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Reply } from 'lucide-react';
import { comment } from '@/types/CommentsType';

const InputMessage = ({comment_id, setcommentState}: {comment_id: string, setcommentState: React.Dispatch<React.SetStateAction<comment[]>> }) => {
     const [message, setMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState(false);
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
    
            if (!message.trim()) return;
    
            setIsLoading(true);
            setError(null);
            setSuccess(false);
    
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/post/${comment_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
                    },
                    body: JSON.stringify({
                        message: message.trim()
                    })
                });
    
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.response.payload.message || `HTTP error! status: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Comment posted successfully:', data);
    
                // Clear the input and show success
                setMessage('');
                setSuccess(true);
                setcommentState(prevState => ({
                    ...prevState,
                    data
                }))
                // Hide success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
    
            } catch (error) {
                console.error('Error posting comment:', error);
                setError(error instanceof Error ? error.message : 'Failed to post comment');
            } finally {
                setIsLoading(false);
            }
        };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell the truth to this fool..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="s-2 animate-spin" />
                    ) : (
                        <Reply className="s-2" />
                    )}
                </Button>
            </form>
  )
}

export default InputMessage