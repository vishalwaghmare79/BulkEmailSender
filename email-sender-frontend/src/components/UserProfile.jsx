import React, { useState } from 'react';
import { FiEdit, FiKey, FiTrash } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';

const UserProfile = () => {
  const {user} = useAuth();

  console.log("User Data:", user);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <div className="mb-4">
        <p className="text-gray-700 font-medium">Name:</p>
        <p className="text-gray-900">{user.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 font-medium">Email:</p>
        <p className="text-gray-900">{user.email}</p>
      </div>
      <div className="flex flex-row gap-3 mt-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white">
          <FiEdit /> Edit Profile
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white">
          <FiKey /> Reset Password
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white">
          <FiTrash /> Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
