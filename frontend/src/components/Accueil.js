import '../styles/Accueil.css'
import Connexion from './Connexion'
import CreationCompte from './CreationCompte'
import Forum from './forum/Forum'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Component } from 'react'
import Profils from './Profils'
import { useAuth } from "../hooks/auth";
import { AuthContext } from "../context/auth-context";

const Accueil = () => {

  const { userId, userName, userPrenom, userEmail, userImg, userAdmin, token, login, logout } = useAuth();
 

    return (<AuthContext.Provider
            value={{
                isLoggedIn: !!token,
                token: token,
                userId: userId,
                userName: userName,
                userPrenom: userPrenom,
                userEmail: userEmail,
                userImg: userImg,
                userAdmin: userAdmin,
                login: login,
                logout: logout,
            }}
        >
            <Router>
        <div>
            <div className="Accueil">
          </div>
          <Route exact path="/" component={Connexion}></Route>
          <Route exact path="/creationCompte" component={CreationCompte}></Route>
          <Route exact path="/forum" component={Forum}></Route>
          <Route exact path="/profils" component={Profils}></Route>
        </div>
      </Router>
        </AuthContext.Provider>
    );
}


export default Accueil
