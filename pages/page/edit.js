import { useRouter } from 'next/router'
import axios from 'axios'
import Mde from '../../components/mde'

const Edit = (props) => {
  const Router = useRouter();
  
  const submit = (data) => {
    axios({
      method: 'patch',
      url: `${process.env.NEXT_PUBLIC_HOST}/api/pages/${props.posts.data.id}`,
      data: {
        page: {...data, id: props.posts.data.id}
      },
      withCredentials: true
    }).then(res => {
      Router.push(`/page/${res.data.data.id}`)
    })
  }

  const formData = (dataFromForm) => {
    submit(dataFromForm)
  }

  return (
    <Mde dataToReturn={formData} post={props}/>
  )
}

export const getServerSideProps = async (ctx) => {
  const res = await axios(`${process.env.NEXT_PUBLIC_HOST}/api/pages/${ctx.query.page}`, {
    headers: {
      Cookie: ctx.req.headers.cookie
    }
  })
  
  const posts = await res.data
  
  return {
    props: {
      posts
    }
  }
}

export default Edit