import logo from '../images/logo.png'
import '../styles/Header.css'

function Header(){
	return <header className='groupomania-header'>
				<img src={logo} alt='Logo Groupomania' className='groupomania-logo' />
			</header>
}

export default Header