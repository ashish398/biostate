// src/components/Dashboard.tsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAllUsers } from "../api/get";
import { updateUserRole } from "../api/post";

type UserRole = "member" | "manager";

const UserDashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<any[]>("allUsers", fetchAllUsers);

  const [selectedRole, setSelectedRole] = useState<{ [key: number]: UserRole }>(
    {}
  );

  const mutation = useMutation(updateUserRole, {
    onSuccess: () => {
      queryClient.invalidateQueries("allUsers");
      alert("User role updated successfully!");
    },
    onError: () => {
      alert("Failed to update user role.");
    },
  });

  const handleRoleChange = (userId: number, role: UserRole) => {
    setSelectedRole((prev) => ({ ...prev, [userId]: role }));
  };

  const handleSave = (userId: number) => {
    if (selectedRole[userId]) {
      mutation.mutate({ userId, role: selectedRole[userId] });
    } else {
      alert("Please select a role to save.");
    }
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error)
    return <div className="text-red-500 p-4">Error loading users.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Username</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <select
                    className="border rounded p-1"
                    value={selectedRole[user.id] || user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as UserRole)
                    }
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleSave(user.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
