// src/pages/admin/AdminSketchesPage.jsx
import React, { useEffect, useState } from "react";
import { FaTrash, FaUndo, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getAllSketchesAdmin,
  softDeleteSketch,
  restoreSketch,
} from "../../api/SketchApi";
import { getLikeCount } from "../../api/likeApi";
import { getDrawingSaveCount } from "../../api/saveApi";

const AdminSketchesPage = () => {
  const [sketches, setSketches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Fetch sketches + like/save counts
  const fetchSketches = async () => {
    try {
      setLoading(true);
      const data = await getAllSketchesAdmin();

      const sketchesWithCounts = await Promise.all(
        data.map(async (sketch) => {
          const likeCountData = await getLikeCount(sketch.drawingId);
          const saveCountData = await getDrawingSaveCount(sketch.drawingId);

          return {
            ...sketch,
            status: sketch.isActive ? "active" : "deleted",
            artist: sketch.uploadedByName || sketch.user?.username || "Unknown",
            imageUrl: sketch.imageBase64
              ? `data:image/jpeg;base64,${sketch.imageBase64}`
              : sketch.imageUrl || sketch.src,
            likes: likeCountData || 0,
            saves: saveCountData?.totalSaves || 0,
          };
        })
      );

      setSketches(sketchesWithCounts);
    } catch (error) {
      console.error("Error fetching sketches:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSketches();
  }, []);

 // Toggle sketch status (soft delete / restore)
            const toggleStatus = async (sketch) => {
            try {
                if (sketch.isActive) {
                await softDeleteSketch(sketch.drawingId);
                } else {
                await restoreSketch(sketch.drawingId);
                }

                // Correctly update status in local state
                setSketches((prev) =>
                prev.map((s) =>
                    s.drawingId === sketch.drawingId
                    ? { 
                        ...s, 
                        isActive: !sketch.isActive, // use the passed-in sketch value
                        status: sketch.isActive ? "deleted" : "active" 
                        }
                    : s
                )
                );
            } catch (error) {
                console.error("Error updating sketch status:", error);
            }
            };



  // Pagination
  const totalPages = Math.ceil(sketches.length / pageSize);
  const displayedSketches = sketches.slice((page - 1) * pageSize, page * pageSize);

  if (loading) return <p className="text-white text-center py-10">Loading sketches...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bangers text-white tracking-wider drop-shadow-lg">
          Manage Sketches
        </h1>
        
      </div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Artist</th>
              <th className="p-4 font-semibold">Likes</th>
              <th className="p-4 font-semibold">Saves</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedSketches.map((sketch) => (
              <tr
                key={sketch.drawingId}
                className="border-b border-gray-700 hover:bg-gray-700/30"
              >
                <td className="p-4">
                  <img
                    src={sketch.imageUrl}
                    alt={sketch.title}
                    className="w-16 h-20 object-cover rounded-md"
                  />
                </td>
                <td className="p-4">{sketch.title}</td>
                <td className="p-4">{sketch.artist}</td>
                <td className="p-4">{sketch.likes}</td>
                <td className="p-4">{sketch.saves}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      sketch.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {sketch.status}
                  </span>
                </td>
                <td className="p-4">
                    {/* Edit Button */}
                    <Link
                        to={`/admin/sketches/edit/${sketch.drawingId}`} // navigate to edit page
                        className="p-2 rounded-md text-gray-400 hover:bg-orange-500 hover:text-white transition-colors mr-4"
                    >
                        Edit
                    </Link>
                  <button
                    onClick={() => toggleStatus(sketch)}
                    className={`p-2 rounded-md text-gray-400 transition-colors ${
                      sketch.status === "active"
                        ? "hover:bg-red-500 hover:text-white"
                        : "hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    {sketch.status === "active" ? <FaTrash /> : <FaUndo />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                page === idx + 1
                  ? "bg-orange-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSketchesPage;
