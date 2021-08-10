import '../styles/Connexion.css'
import {Link} from 'react-router-dom'
import Header from './Header'
import Forum from './forum/Forum'

function Connexion(){
	return <div> 
        <Header />
		<h1>Se Connecter : </h1>
        <form action='' method='get' className='groupomania-connexion'>       
            <div className='form-email'>
                <label for='email'>E-mail: </label>
                <input type='email' name='email' id='email' required />
            </div>
          	<div>
    			<label for="pass">Mot de passe :</label>
    			<input type="password" id="pass" name="password" minlength="8" required />           		
			</div>
            <Link className="btn" to={'/forum'}>
			<input type="submit" value="Valider" />
            </Link>
        </form>
        		<Link className="btn" to={'/creationCompte'}>Créer un compte</Link>
        </div>
    
      	
}

export default Connexion