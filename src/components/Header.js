import PropTypes from 'prop-types'

const Header = () => {
  return (
    <header className='header'>
      <h1>Task Tracker</h1>
    </header>
  )
}

Header.propTypes = {
    title: PropTypes.string,
}

// CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header