import React, { useState } from "react";



const CommentSection = ({ comments, onCommentSubmit, onCommentDelete, userId }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onCommentSubmit(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <h3 className="text-2xl font-bold text-white mb-6">
        Comments ({comments.length})
      </h3>

      {/* Add new comment */}
      {userId && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-start space-x-4">
            <img
              src="https://picsum.photos/40"
              alt="Your avatar"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                rows={3}
              ></textarea>
              <button
                type="submit"
                className="mt-3 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-500"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.commentId} className="flex items-start space-x-4">
            <img
              src="https://picsum.photos/40"
              alt={`${comment.userName}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-2">
                    <p className="font-semibold text-white">{comment.userName}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {userId && userId == comment.userId && (
                    <button
                      onClick={() => onCommentDelete(comment.commentId)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-2 text-gray-300">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
