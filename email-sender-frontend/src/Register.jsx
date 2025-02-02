import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLock, FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/register`
    
            const { data } = await axios.post(apiUrl, { 
                name, 
                email, 
                password 
            });

            toast.success(data.message || "Registration successful! Please login.");
            navigate("/login"); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an Account</h2>
                <div className="space-y-4">
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiUser size={20} className="text-gray-600" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiUser size={20} className="text-gray-600" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiLock size={20} className="text-gray-600" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500">
                        <FiLock size={20} className="text-gray-600" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 focus:outline-none"
                        />
                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className={`w-full text-white py-3 rounded-lg mt-4 transition duration-300 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
                <div className="mt-6 text-center">
                    <span className="text-sm text-gray-600">Already have an account? </span>
                    <a href="/login" className="text-sm text-blue-600 font-semibold hover:underline">
                        Login here
                    </a>
                </div>
            </div>
        </div>
    );
}
