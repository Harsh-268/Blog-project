import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/configeration.js'
import { Container, PostCard } from '../components/index.js'

const features = [
  {
    title: 'Write freely',
    text: 'A rich text editor with headings, images, lists and links, so your posts look the way you imagined them.',
  },
  {
    title: 'Share instantly',
    text: 'Publish with one click and your story is live for everyone to read. No setup and no waiting.',
  },
  {
    title: 'Stay in control',
    text: 'Edit or delete your posts whenever you like. Your words stay yours.',
  },
]

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService
      .getAllPosts()
      .then((res) => {
        if (res) setPosts(res.rows)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <Container>
          <div className="py-12 md:py-28 text-center max-w-3xl mx-auto">
            <p className="text-xs md:text-sm font-medium uppercase tracking-widest text-gray-400 mb-3 md:mb-4">
              A place for ideas
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Write. Share. Be read.
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-400">
              Discover stories from writers around the world, or start your own in minutes.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 md:gap-4">
              {authStatus ? (
                <>
                  <Link
                    to="/add-post"
                    className="px-6 py-3 rounded-lg bg-white text-gray-900 text-center font-medium hover:bg-gray-200 transition-colors"
                  >
                    Write a post
                  </Link>
                  <Link
                    to="/my-posts"
                    className="px-6 py-3 rounded-lg border border-gray-600 text-gray-200 text-center font-medium hover:bg-gray-700 transition-colors"
                  >
                    View my posts
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-6 py-3 rounded-lg bg-white text-gray-900 text-center font-medium hover:bg-gray-200 transition-colors"
                  >
                    Get started
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-lg border border-gray-600 text-gray-200 text-center font-medium hover:bg-gray-700 transition-colors"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Latest posts */}
      <section className="py-10 md:py-16">
        <Container>
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Latest posts</h2>
              <p className="mt-1 text-sm md:text-base text-gray-500">Fresh reads from the community.</p>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8 md:py-12">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="text-center px-4 py-10 md:py-12 border border-dashed border-gray-300 rounded-xl bg-white">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Sign In to see all Posts</h3>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                {authStatus
                  ? 'Be the first to publish something.'
                  : 'Log in or sign up to start writing.'}
              </p>
              <Link
                to={authStatus ? '/add-post' : '/signup'}
                className="inline-block mt-6 px-5 py-2.5 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                {authStatus ? 'Write a post' : 'Create an account'}
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Why write here */}
      <section className="py-10 md:py-16 bg-white border-y border-gray-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Why write here</h2>
            <p className="mt-2 text-sm md:text-base text-gray-500">Simple tools that stay out of your way.</p>
          </div>
          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {features.map((item, index) => (
              <div key={item.title} className="flex items-start gap-4 text-left md:block">
                <div className="shrink-0 md:mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-1 md:mt-2 text-sm md:text-base text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing call to action */}
      {!authStatus && (
        <section className="py-10 md:py-16">
          <Container>
            <div className="rounded-2xl bg-gray-800 px-5 py-10 md:px-6 md:py-12 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Ready to share your story?
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-400">
                Create a free account and publish your first post today.
              </p>
              <Link
                to="/signup"
                className="block sm:inline-block mt-6 md:mt-8 px-6 py-3 rounded-lg bg-white text-gray-900 text-center font-medium hover:bg-gray-200 transition-colors"
              >
                Sign up free
              </Link>
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}

export default Home