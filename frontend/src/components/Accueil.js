import '../styles/Accueil.css'
import Connexion from './Connexion'
import CreationCompte from './CreationCompte'
import Forum from './forum/Forum'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Component } from 'react'
import Profils from './Profils'

class Accueil extends Component {

  render() {
    return (<Router>
        <div>
            <div className="Accueil">
          </div>
          <Route exact path="/" component={Connexion}></Route>
          <Route exact path="/creationCompte" component={CreationCompte}></Route>
          <Route exact path="/forum" component={Forum}></Route>
          <Route exact path="/profils" component={Profils}></Route>
        </div>
      </Router>
    );
  }
}


export default Accueil
