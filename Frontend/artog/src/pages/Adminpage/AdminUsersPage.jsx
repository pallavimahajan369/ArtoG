import React, { useEffect, useState } from "react";
import { FaTrash, FaUndo } from "react-icons/fa";
import { getAllUsers, deleteUser, restoreUser } from "../../api/userApi";
import { toast } from "react-toastify";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Soft-delete user
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      toast.success("User deactivated successfully");
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate user");
    }
  };

  // Restore user
  const handleRestore = async (userId) => {
    try {
      await restoreUser(userId);
      toast.success("User restored successfully");
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error(error);
      toast.error("Failed to restore user");
    }
  };

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bangers text-white tracking-wider drop-shadow-lg mb-8">
        Manage Users
      </h1>
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Username</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              (user) => (
                console.log(user),
                (
                  <tr
                    key={user.userId}
                    className="border-b border-gray-700 hover:bg-gray-700/30"
                  >
                    <td className="p-4">{user.username}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.status === "active" ? (
                        <button
                          onClick={() => handleDelete(user.userId)}
                          className="p-2 rounded-md text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestore(user.userId)}
                          className="p-2 rounded-md text-gray-400 hover:bg-green-500 hover:text-white transition-colors"
                        >
                          <FaUndo className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersPage;
