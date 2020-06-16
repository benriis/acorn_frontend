import { useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import PostLink from '../../components/PostLink'
import styles from './index.module.scss'

const Page = (props) => {  
  const Router = useRouter();
  
  useEffect(() => {
    console.log(props)
    if (props.error) Router.push('/auth/login')
  }, [])

  if (!props.error) {
    return (
      <div>
        <Link href="/page/new"><a>Create new post</a></Link>
        <ul className={styles.index}>
          {props.data.map((post, index) => (
            <li key={index} className={styles.link}>
              <PostLink post={post} />
            </li>
          ))}
        </ul>
      </div>
    )
  } 
  return (
    null
  )
}

export const getServerSideProps = async (ctx) => {
  let query = `${process.env.NEXT_PUBLIC_HOST}/api/pages`

  if (ctx.query) {
    query += "?"
    Object.keys(ctx.query).forEach(key => {
      query += `${key}=${ctx.query[key]}&`
    })
  }

  if (ctx.req.headers.cookie) {
    const res = await axios(query, {
      headers: {
        Cookie: ctx.req.headers.cookie
      }
    })
    const posts = await res.data
    return {
      props: posts
    }
  } else {
    return {
      props: {
        error: "error"
      }
    }
  }

  
}

export default Page