import '../styles.css'
import 'highlight.js/styles/default.css';
import "react-mde/lib/styles/css/react-mde-all.css";
import Navbar from '../components/Navbar'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}