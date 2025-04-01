import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-section">
          <h3>Version Information</h3>
          <p>Current Version: 1.0.0</p>
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="about-section">
          <h3>Contact</h3>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <div className="contact-info">
            <p>Email: support@tasktracker.com</p>
            <p>GitHub: github.com/tasktracker</p>
          </div>
        </div>
      </div>
      <Link to='/' className="back-button">Back to Tasks</Link>
    </div>
  )
}

export default About