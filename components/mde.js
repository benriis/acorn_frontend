import {useState, useEffect} from 'react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import Page from './Page'
import styles from './mde.module.scss'
import { useRouter } from 'next/router'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Mde = (props) => {
  const Router = useRouter();

  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  // const [html, setHtml] = useState("")
  const [input, setInput] = useState({
    title: "",
    topics: ""
  })

  useEffect(() => {
    console.log(props)
    if (props.post != null) {
      setInput(prev => ({
        ...prev,
        title: props.post.posts.data.title,
        topics: props.post.posts.data.topics.map(t => t.text).join(", ")
      }))
      setValue(props.post.posts.data.content)
    }
  }, [])

  const handleChange = e => {
    e.persist()
    setInput(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="container">
      <div className={styles.mdeForm}>
        <div className={styles.top}>
          <label htmlFor="title">Title of page</label>
          <div className="mdeButtons" onClick={() => Router.back()}>
            <button>Cancel</button>
            <button onClick={() => props.dataToReturn({...input, ...{content: value}})}>save</button>
          </div>
        </div>
        <input id="title" value={input.title} onChange={handleChange} />
        <label htmlFor="topics">Tags</label>
        <input id="topics" value={input.topics} onChange={handleChange} />
        <label htmlFor="value">Content</label>
      </div>
      <ReactMde
        value={value}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    
      <div>
        <Page data={{...input, ...{content: value}, ...{topics: input.topics.split(", ").map(p => new Object({text: p}))}}}/>
      </div>
    </div>
  );
}

export default Mde