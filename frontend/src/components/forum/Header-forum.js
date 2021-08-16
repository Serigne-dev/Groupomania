import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import '../../styles/headerForum.css'

function HeaderForum(){

	const userData = JSON.parse(localStorage.getItem('userData'));

	const auth = useContext(AuthContext);
    // History context
    const history = useHistory();

	function logoutHandler(event){
		event.preventDefault();
        auth.logout();
        history.push("/");
	}

	return <div>
			<header className='groupomania-header'>
				<img src={logo} alt='Logo Groupomania' className='groupomania-logo' />
				<nav>
					<ul>
						<li><Link to={'/profils'}> Modifier profil</Link></li>
						<li><Button onClick={logoutHandler} variant="contained" color="primary">Se deconnecter</Button></li>
					</ul>
				</nav>
				<div>
				{userData.userName}, {userData.userPrenom}
				</div>
			</header>
			<div className='publications'> </div>
			<div className='MonProfil'> </div>
			</div>
}

export default HeaderForum