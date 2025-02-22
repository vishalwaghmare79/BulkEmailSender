import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "./context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      setLoading(true);
      const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/login`;
      const { data } = await axios.post(apiUrl, {
        email,
        password,
      });
  
      setToken(data.token);
      setUser(data.user);
  
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      toast.success(data.message || "Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center items-center">
     {loading ? (<Spinner />) :  <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>
        <div className="space-y-4">
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
          <div className="flex justify-between items-center mt-2">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </div>
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>}
    </div>
  );
}
