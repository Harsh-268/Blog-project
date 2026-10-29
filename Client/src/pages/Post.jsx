import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import appwriteService from "../appwrite/configeration.js";
import { Container } from "../components/index.js";
import ConfirmModal from "../components/ConfirmModal.jsx";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((res) => {
        if (res) setPost(res);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    setDeleting(true);
    const status = await appwriteService.deletePost(post.$id);

    if (status) {
      if (post.featuredImage)
        await appwriteService.deleteFile(post.featuredImage);
      navigate("/");
    } else {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  if (!post) {
    return (
      <div className="py-24 text-center text-gray-500">Loading post...</div>
    );
  }

  const date = new Date(post.$createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-10">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Top bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            {" "}
            <Link
              to="/"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
            >
              &larr; Back to posts
            </Link>
            {isAuthor && (
              <div className="flex items-center gap-3">
                <Link
                  to={`/edit-post/${post.$id}`}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Edit
                </Link>
                <button onClick={() => setShowConfirm(true)} className="rounded-lg borderborder-gray-300 bg-red-500 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-700">Delete</button>

                <ConfirmModal
                  isOpen={showConfirm}
                  title="Delete this post?"
                  message="This can't be undone."
                  loading={deleting}
                  onConfirm={deletePost}
                  onCancel={() => setShowConfirm(false)}
                />
              </div>
            )}
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
              <time dateTime={post.$createdAt}>{date}</time>
              {post.status !== "active" && (
                <span className="rounded-full bg-gray-800 px-3 py-0.5 text-xs font-medium text-white">
                  Draft
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
              {post.title}
            </h1>
          </header>

          {/* Featured image */}
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="mb-10 max-h-[28rem] w-full rounded-2xl object-cover"
            />
          )}

          {/* Content */}
          <div className="post-content rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </article>
  );
}
