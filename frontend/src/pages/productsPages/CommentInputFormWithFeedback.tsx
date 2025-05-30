import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { commentsComponent } from '@/types/CommentsType';

// Alternative version with error handling and success feedback
export const CommentInputFormWithFeedback = ({ product_id, setcommentState }: commentsComponent) => {
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${product_id}`, {
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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as any);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write what you want to know..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    disabled={!message.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 px-6 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Search className="w-4 h-4" />
                    )}
                </Button>
            </form>

            {/* Error message */}
            {error && (
                <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded px-3 py-2">
                    {error}
                </div>
            )}

            {/* Success message */}
            {success && (
                <div className="text-green-400 text-sm bg-green-900/20 border border-green-800 rounded px-3 py-2">
                    Comment posted successfully!
                </div>
            )}
        </div>
    );
};