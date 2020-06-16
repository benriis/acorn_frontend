import Link from 'next/link'

const PostLink = ({post, arrow, type}) => {

  

  return (
  <Link href={`/page/${post.id}`}>
    {arrow 
      ? arrow == "right" 
        ? <a className="postLink">{post.title} &rarr;</a>
        : <a className="postLink">&larr; {post.title}</a>
      : <a className="postLink">{post.title}</a>}
  </Link>
  )
}

export default PostLink