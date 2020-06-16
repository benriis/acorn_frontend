import Link from 'next/link'
import styles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <h3>Acorn</h3>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/page">
            <a>Pages</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar