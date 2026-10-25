import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, PostCard } from '../components/index.js'
import appwriteService from '../appwrite/configeration.js'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    appwriteService
      .getAllPosts()
      .then((res) => {
        if (res) setPosts(res.rows)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full py-12">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">All posts</h1>
            <p className="mt-1 text-gray-500">
              {loading
                ? 'Loading...'
                : `${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
            </p>
          </div>
          <Link
            to="/add-post"
            className="inline-block self-start px-5 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            New post
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl bg-white">
            <h2 className="text-xl font-semibold text-gray-900">No posts yet</h2>
            <p className="mt-2 text-gray-500">Write your first post to see it here.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts