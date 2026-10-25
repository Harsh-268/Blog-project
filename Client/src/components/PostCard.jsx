import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/configeration.js'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-md">
        {featuredImage ? (
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
            No image
          </div>
        )}

        <div className="flex flex-1 flex-col justify-between p-5">
          <h2 className="text-lg font-semibold leading-snug text-gray-900 line-clamp-2">
            {title}
          </h2>
          <span className="mt-4 text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-900">
            Read more &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}

export default PostCard