import {useState, useEffect} from 'react'
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import Page from '../components/Page'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Mde = () => {
  const [value, setValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  const [html, setHtml] = useState("")
  const [input, setInput] = useState({
    title: "",
    topics: ""
  })

  useEffect(() => {
    console.log(typeof value)
    setHtml(converter.makeHtml(value))
  }, [value])

  const handleChange = e => {
    e.persist()
    setInput(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="container">
      <label htmlFor="title">Title of page</label>
      <input id="title" value={input.title} onChange={handleChange} />
      <label htmlFor="topics">Tags</label>
      <input id="topics" value={input.topics} onChange={handleChange} />
      <label htmlFor="value">Content</label>
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
        <Page metadata={input} content={html}/>
      </div>
    </div>
  );
}

export default Mde