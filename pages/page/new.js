import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Mde from '../../components/mde'

const New = (props) => {
  const router = useRouter();

  const submit = (data) => {
    axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_HOST}/api/pages`,
      data: {
        page: {...data, ...{parent_id: props.postId}}
      },
      withCredentials: true
    }).then(res => {
      console.log(res.data.data.id)
      Router.push(`/page/${res.data.data.id}`)
    })
  }

  const formData = (dataFromForm) => {
    console.log(dataFromForm)
    submit(dataFromForm)
  }

  return (
    <Mde dataToReturn={formData} post={null}/>
  )
}

export async function getServerSideProps(ctx) {
  const parent_id = ctx.query.page
  return {
    props: {
      postId: parent_id ? parent_id : null
    }
  }
}

export default New