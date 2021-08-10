import '../styles/CreationCompte.css'
import Header from './Header'
import Forum from './forum/Forum'
import {Link} from 'react-router-dom'

function CreationCompte(){
	return <div> 
        <Header />
		<h1>Nouveau Commpte : </h1>
        <form action='' method='get' className='groupomania-connexion'>
            <label>
                    Nom :
                    <input type="text" name="Nom" />
                </label>
                <label>
                    Prenom :
                    <input type="text" name="Prenom" />
                </label>       
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required />
            </div>
          	<div>
    			<label for="pass">Mot de passe (8 caractères minimum):</label>
    			<input type="password" id="pass" name="password" minlength="8" required />           		
			</div>
            <Link className="btn" to={'/forum'}>
			<input type="submit" value="Valider" />
            </Link>
        </form>
        </div>
}

export default CreationCompte