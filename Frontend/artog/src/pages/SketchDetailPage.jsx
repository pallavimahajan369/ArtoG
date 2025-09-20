import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegBookmark, FaDownload } from "react-icons/fa";
import * as sketchApi from "../api/SketchApi"; 
import { getComments, postComment, deleteComment } from "../api/commentApi";
import { saveDrawing, removeSavedDrawing, getDrawingSaveCount } from "../api/saveApi";
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SketchDetailPage = () => {
  const { id } = useParams();
  const [sketch, setSketch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);

  const userId = sessionStorage.getItem("userId");

  const fetchSketch = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);

      // Fetch sketch details
      const sketchData = await sketchApi.getSketchById(id);

      // Fetch comments
      const commentsData = await getComments(id);

      // Fetch save count
      const { totalSaves } = await getDrawingSaveCount(id);

      setSketch({ ...sketchData, comments: commentsData });
      setSaveCount(totalSaves);

      // Optionally, check if current user has saved it
      if (userId && sketchData.savedByUser) {
        setIsSaved(sketchData.savedByUser);
      }

    } catch (err) {
      console.error("Failed to fetch sketch details", err);
      setSketch(null);
    } finally {
      setLoading(false);
    }
  }, [id, userId]);

  useEffect(() => {
    fetchSketch();
  }, [fetchSketch]);

  const handleSaveToggle = async () => {
    if (!userId) {
      alert("You need to login to save drawings!");
      return;
    }
    if (!sketch || !sketch.drawingId) return;

    try {
      if (isSaved) {
        await removeSavedDrawing(sketch.drawingId);
        setIsSaved(false);
        setSaveCount((prev) => prev - 1);
      } else {
        await saveDrawing(sketch.drawingId);
        setIsSaved(true);
        setSaveCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to update save", err);
    }
  };

  const handleCommentSubmit = async (text) => {
    if (!userId) {
      alert("You need to login to comment!");
      return;
    }
    try {
      const newComment = await postComment(sketch.sketchId, { content: text });
      setSketch((prev) => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])],
      }));
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setSketch((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c.commentId !== commentId),
      }));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  if (loading)
    return <div className="text-center py-20 text-white">Loading Sketch...</div>;
  if (!sketch)
    return <div className="text-center py-20 text-white">Sketch not found.</div>;

  const imageUrl = `data:image/jpeg;base64,${sketch.imageBase64}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-orange-800 to-gray-900 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-15">
          {/* Left - Image */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <img src={imageUrl} alt={sketch.title} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl flex-grow">
              <h1 className="text-5xl font-bangers text-yellow-400">{sketch.title}</h1>
              <p className="text-md text-gray-300 mt-1">by {sketch.uploadedByName}</p>
              <p className="mt-6 text-gray-200 leading-relaxed">{sketch.description}</p>

              {/* Likes + Saves */}
              <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-gray-200">
                  <FaHeart className="text-red-500" />
                  <span>{sketch.likes?.toLocaleString() || 0} Likes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-200">
                  <button
                    onClick={handleSaveToggle}
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                  >
                    <FaRegBookmark />
                    <span>{saveCount} {saveCount === 1 ? "Save" : "Saves"}</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <button className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors font-semibold">
                  <FaHeart /> <span>Like</span>
                </button>

                <button
                  onClick={handleSaveToggle}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isSaved
                      ? "bg-yellow-500/40 text-yellow-300 hover:bg-yellow-500/60"
                      : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/40"
                  }`}
                >
                  <FaRegBookmark />
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={() => {
                    if (!userId) {
                      alert("You need to login to download!");
                      return;
                    }
                    const link = document.createElement("a");
                    link.href = `data:image/jpeg;base64,${sketch.imageBase64}`;
                    link.download = `${sketch.title.replace(/\s+/g, "_")}.jpg`;
                    link.click();
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition-colors font-semibold"
                >
                  <FaDownload /> <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-12">
          <CommentSection
            comments={sketch.comments || []}
            onCommentSubmit={handleCommentSubmit}
            onCommentDelete={handleCommentDelete}
            userId={userId}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SketchDetailPage;
