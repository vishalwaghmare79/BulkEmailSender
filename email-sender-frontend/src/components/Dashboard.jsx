import { useState, useEffect } from "react";
import {
  FiInbox,
  FiSend,
  FiMenu,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { SendEmailForm } from "./SendEmailForm";
import AllEmails from "./AllEmails";
import UserProfile from "./UserProfile";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "send"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:relative md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Email Dashboard</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            ✕
          </button>
        </div>
        <nav className="p-4 flex-1">
          <button
            className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg cursor-pointer ${
              activeTab === "user" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("user")}
          >
            <FiUser /> User Profile
          </button>
          <button
            className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg cursor-pointer ${
              activeTab === "send" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("send")}
          >
            <FiSend /> Send Email
          </button>
          <button
            className={`w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg cursor-pointer mt-2 ${
              activeTab === "inbox" ? "bg-blue-500 text-white" : "text-gray-700"
            }`}
            onClick={() => setActiveTab("inbox")}
          >
            <FiInbox /> All Emails
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-4 py-2 text-left rounded-lg cursor-pointer text-red-500"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded bg-blue-500 text-white mb-4"
        >
          <FiMenu size={24} />
        </button>
        {activeTab === "send" ? (
          <SendEmailForm />
        ) : activeTab === "inbox" ? (
          <AllEmails />
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  );
}
