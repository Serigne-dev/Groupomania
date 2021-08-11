import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'

function HeaderForum(){
	return <div>
			<header className='groupomania-header'>
				<img src={logo} alt='Logo Groupomania' className='groupomania-logo' />
				<nav>
					<ul>
						<li><Link to={'/profils'}> Profil</Link></li>
						<li><a href="#Equipe">Equipe</a></li>
						<li><a href="#Deconnexion">Se deconnecter</a></li>
					</ul>
				</nav>
			</header>
			<div className='publications'> </div>
			<div className='MonProfil'> </div>
			</div>
}

export default HeaderForum