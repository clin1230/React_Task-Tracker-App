import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()}</p>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer