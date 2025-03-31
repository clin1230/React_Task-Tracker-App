import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title = 'Task Tracker', onAdd, showAdd }) => {
    console.log('Rendering Header with title:', title); // ← Add this line here

    return (
        <header className='header'>
          <h1>{title}</h1>
            <Button
              color={showAdd ? 'red' : 'green'}
              text={showAdd ? 'Close' : 'Add'}
              onClick={onAdd}
            />
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