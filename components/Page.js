import { useEffect, useState } from 'react'
import Link from 'next/link'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import elixir from 'highlight.js/lib/languages/elixir';

import * as Showdown from 'showdown'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Page = (props) => {
  const [content, setContent] = useState("")

  useEffect(() => {
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('elixir', elixir);

  }, [props])

  useEffect(() => {
    setContent(converter.makeHtml(props.data.content))
  })

  return (
    <div className="page">
      <div className="top">
        <h1>{props.data.title}</h1>
      </div>
      <div className="tags">
        <p>tags: </p>
        {props.data.topics.map((topic, i) => (
          <Link href={{pathname: '/page', query:{tag: topic.text}}} key={topic.id}><a className="tag">{topic.text}</a></Link>
        ))}
      </div>
      <p>&mdash;</p>
      <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  )
}

export default Page