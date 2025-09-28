import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa';
import { 
  getMessages, 
  deleteMessage as deleteMessageAPI, 
  updateMessageStatus 
} from '../../api/contactApi';

const AdminContactsPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch messages from backend on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages();
        setMessages(data); 
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // Open message and mark as Read 
  const handleViewMessage = async (message) => {
    setSelectedMessage(message);

    if (message.status === 'New') {
     
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'Read' } : msg
        )
      );

      try {
        await updateMessageStatus(message.id, 'Read');
      } catch (error) {
        console.error("Error updating message status:", error);
      }
    }
  };

  const handleCloseModal = () => setSelectedMessage(null);

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessageAPI(id);
        setMessages(prev => prev.filter(msg => msg.id !== id));
        if (selectedMessage?.id === id) handleCloseModal();
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-white text-center mt-12">Loading messages...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bangers text-white tracking-wider drop-shadow-lg mb-8">
        Contact Messages
      </h1>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold max-w-sm">Message</th>
                <th className="p-4 font-semibold">Received</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr key={msg.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="p-4 align-top whitespace-nowrap">{msg.name}</td>
                  <td className="p-4 align-top whitespace-nowrap">{msg.email}</td>
                  <td className="p-4 align-top max-w-sm">
                    <p className="truncate">{msg.message}</p>
                  </td>
                  <td className="p-4 align-top whitespace-nowrap">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                        msg.status === 'New'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-4 align-top flex space-x-2">
                    <button
                      onClick={() => handleViewMessage(msg)}
                      className="p-2 rounded-md text-gray-400 hover:bg-blue-500 hover:text-white transition-colors"
                      title="View Message"
                    >
                      <FaEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="p-2 rounded-md text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {messages.length === 0 && (
          <div className="text-center p-12 text-gray-500">No messages.</div>
        )}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                Message from {selectedMessage.name}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-white">
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Received</p>
                <p className="text-white">
                  {selectedMessage?.createdAt
                    ? new Date(selectedMessage.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Message</p>
                <div className="mt-2 bg-gray-900/50 p-4 rounded-md max-h-60 overflow-y-auto">
                  <p className="text-white whitespace-pre-wrap">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-800/50 rounded-b-xl text-right">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactsPage;
