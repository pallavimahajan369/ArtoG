import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegBookmark, FaDownload } from "react-icons/fa";
import * as sketchApi from "../api/SketchApi";
import { getComments, postComment, deleteComment } from "../api/commentApi";
import {
  saveDrawing,
  removeSavedDrawing,
  getDrawingSaveCount,
  getSaveStatus,   
} from "../api/saveApi";

import {
  likeDrawing,
  unlikeDrawing,
  getLikeStatus,
  getLikeCount,  
} from "../api/likeApi";
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SketchDetailPage = () => {
  const { id } = useParams();
  const [sketch, setSketch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
const [likeCount, setLikeCount] = useState(0);


  const userId = sessionStorage.getItem("userId");

  // Fetch sketch details
  const fetchSketch = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);

      const sketchData = await sketchApi.getSketchById(id);
      const commentsData = await getComments(id);
      const { totalSaves } = await getDrawingSaveCount(id);

      setSketch({ ...sketchData, comments: commentsData });
      setSaveCount(totalSaves);
    } catch (err) {
      console.error("Failed to fetch sketch details", err);
      setSketch(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

useEffect(() => {
  const fetchLikeStatusAndCount = async () => {
    if (!userId || !id) return;

    try {
      // Count laao
      const countRes = await getLikeCount(id);
      setLikeCount(countRes);

      // Status laao
      const { isLiked } = await getLikeStatus(id);
      setIsLiked(isLiked);
    } catch (err) {
      console.error("Failed to fetch like status/count", err);
    }
  };

  fetchLikeStatusAndCount();
}, [id, userId]);


const handleLikeToggle = async () => {
  if (!userId) {
    alert("You need to login to like drawings!");
    return;
  }

  try {
    if (isLiked) {
      await unlikeDrawing(sketch.drawingId);
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      await likeDrawing(sketch.drawingId);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  } catch (err) {
    console.error("Failed to update like", err);
    alert(err.response?.data?.message || "Failed to like/unlike");
  }
};



  // Check save status for current user
  useEffect(() => {
    const checkSaveStatus = async () => {
      if (!userId || !id) return;
      try {
        const { isSaved } = await getSaveStatus(id);
        setIsSaved(isSaved);
      } catch (err) {
        console.error("Failed to fetch save status", err);
      }
    };
    checkSaveStatus();
  }, [id, userId]);

  useEffect(() => {
    fetchSketch();
  }, [fetchSketch]);

  // Save/Unsave toggle
  const handleSaveToggle = async () => {
    if (!userId) {
      alert("You need to login to save drawings!");
      return;
    }
    if (!sketch?.drawingId) return;

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
      alert(err.response?.data?.message || "Failed to save/unsave");
    }
  };

  // Comment submit
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

  // Comment delete
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
              <img
                src={imageUrl}
                alt={sketch.title}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl flex-grow">
              <h1 className="text-5xl font-bangers text-yellow-400">
                {sketch.title}
              </h1>
              <p className="text-md text-gray-300 mt-1">
                by {sketch.uploadedByName}
              </p>
              <p className="mt-6 text-gray-200 leading-relaxed">
                {sketch.description}
              </p>

              {/* Likes + Saves */}
              <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-gray-200">
                  <button
                    onClick={handleLikeToggle}
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold"
                  >
                    <FaHeart className={`${isLiked ? "text-red-500" : "text-red-400"}`} />
                    <span>
                      {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                    </span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-200">
                  <button
                    onClick={handleSaveToggle}
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold"
                  >
                    <FaRegBookmark />
                    <span>
                      {saveCount} {saveCount === 1 ? "Save" : "Saves"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
               <button
                  onClick={handleLikeToggle}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-colors ${
                    isLiked
                      ? "bg-red-500/40 text-red-300 hover:bg-red-500/60"
                      : "bg-red-500/20 text-red-400 hover:bg-red-500/40"
                  }`}
                >
                  <FaHeart />
                  <span>{isLiked ? "Liked" : "Like"}</span>
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
