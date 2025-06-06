import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import apiService from '@/services/api.Service';
import { Input } from '@/components/ui/input';

export default function ViewLinkPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [message, setMessage] = useState<string | null>(null);
    const [passwordRequired, setPasswordRequired] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>(''); 
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        navigate('/');
    };

    const fetchData = async (id: string, password: string) => {
        try {
            const response = await apiService.getMessage(id, password);
            if (!response) {
                setMessage(null);
                setPasswordRequired(true);
                setError("No message found or invalid password.");
            } else {
                setMessage(response);
                setPasswordRequired(false);
                setError(null);
            }
        } catch (error) {
            console.log("Error fetching message:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id, '1234');
        }
    }, [id]);

    const handlePasswordSubmit = () => {
        if (id) {
            fetchData(id, passwordInput);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 mt-30">
            <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-xl font-semibold text-blue-800">Link Viewer</h1>
                    <button
                        onClick={handleClose}
                        className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                {!passwordRequired && (
                    <div className="bg-white p-4 rounded border border-gray-200 break-all">
                    {message ? (
                        <p className="text-blue-600">{message}</p>
                    ) : (
                        <p className="text-red-500">{error || "Link Expired!"}</p>
                    )}
                </div>
                )

                }
                

                {passwordRequired && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
                        <Input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handlePasswordSubmit}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
