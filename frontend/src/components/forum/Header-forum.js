import logo from '../../images/logo.png'
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import '../../styles/headerForum.css'

function HeaderForum(){

	
    const history = useHistory();
	const userData = JSON.parse(localStorage.getItem('userData'));
    const auth = useContext(AuthContext);
    
    useEffect(() => {
        fetch('http://localhost:4200/auth/profil', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({token: userData.token})
        })
            .then(response => response.json())
            .then(function(data){
            if(data != null){
                auth.login(data.userId, data.userName, data.userPrenom, data.userEmail, data.userImg, data.userAdmin, data.token);
            }
          })
    }, []);


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
						<li><Button onClick={logoutHandler} variant="contained" color="red">Se deconnecter</Button></li>
					</ul>
				</nav>
				<div>
				{auth.userName}, {auth.userPrenom}
				</div>
			</header>
			<div className='publications'> </div>
			<div className='MonProfil'> </div>
			</div>
}

export default HeaderForum