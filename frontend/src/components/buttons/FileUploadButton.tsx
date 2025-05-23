import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you're using shadcn/ui

const FileUploadButton = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current &&
            fileInputRef.current.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        
        
        const files = event.target.files
        if (!files) return;
        const file = files[0]

        try {
            setIsUploading(true);
            setUploadStatus('Uploading...');
            const formData = new FormData();
            formData.append('file', file);
            

            // Send the file to your backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/avatar`, {
                method: 'PUT',
                body: formData,
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`,
                }
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status: ${response.status}`);
            }

            const data = await response.json();
            setUploadStatus('Upload successful!');
            console.log('Upload response:', data);
        } catch (error) {
            setUploadStatus(`Error: ${error}`);
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            // Reset the file input so the same file can be uploaded again if needed
            event.target.value = '';
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white bg-black hover:cursor-pointer"
                onClick={handleButtonClick}
                disabled={isUploading}
            >
                <Upload className="h-4 w-4 z-10" />
            </Button>

            {uploadStatus && (
                <div className="text-sm mt-2">{uploadStatus}</div>
            )}
        </div>
    );
};

export default FileUploadButton;