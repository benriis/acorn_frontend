import axios from 'axios'
import Link from 'next/link'


const Index = (props) => {
  return (
    <div>
      <div className="tags">
        {props.data.sort((a,b) => b.count - a.count).map(t => (
          <Link href={{pathname: '/page', query:{tag: t.text}}} key={t.id}><a className="tag">{t.text} {t.count}</a></Link>
        ))}
      </div>
    </div>
  )
}

export default Index

export const getServerSideProps = async (ctx) => {
  let query = `${process.env.NEXT_PUBLIC_HOST}/api/topics`
  const res = await axios.get(query, {
    headers: {
      Cookie: ctx.req.headers.cookie
    }
  })
  
  const tags = await res.data

  return {
    props: tags
  }
}