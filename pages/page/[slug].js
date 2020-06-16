import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import PostLink from '../../components/PostLink'
import * as Showdown from 'showdown'
import Page from '../../components/Page'


const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

axios.defaults.withCredentials = true;

function Post({posts}) {
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState()

  useEffect(() => {
    document.title = posts.data.title
    setContent(converter.makeHtml(posts.data.content))

  }, [])

  return (
    <div className="page">
      <Page data={{...posts.data}} />
      <div className="post-children" >
        <p>Related:</p>
        <ul>
          {posts.data.parent != null &&
            <li>
              <PostLink post={posts.data.parent} arrow={"left"} />
            </li>
          }
          {posts.data.children.map((child) => (
            <li key={child.id}>
              <PostLink post={child} arrow={"right"} />
            </li>
          ))}
        </ul>
        <Link href={{pathname: '/page/new', query: {page: posts.data.id}}}><a>Create new post</a></Link><br />
        <Link href={{pathname: '/page/edit', query: {page: posts.data.id}}}><a>Edit</a></Link>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await axios(`${process.env.NEXT_PUBLIC_HOST}/api/pages/${ctx.params.slug}`, {
    headers: {
      Cookie: ctx.req.headers.cookie
    }
  })
  
  const posts = await res.data
  // posts.data.topics = posts.data.topics.map(i => i.text).join(", ")
  
  return {
    props: {
      posts
    }
  }
}

export default Post;