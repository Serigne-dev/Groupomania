const bcrypt = require('bcrypt'); // package de chiffrement
const jwt = require('jsonwebtoken'); // pour créer et verifier les tokens
var CryptoJS = require("crypto-js"); // permet de crypter l'email
const db = require("../config/config_db");
const mysql = require("mysql");

function validationPassword(password){
  if (password.match( /[0-9]/g) && 
                    password.match( /[A-Z]/g) && 
                    password.match(/[a-z]/g) && 
                    password.match( /[^a-zA-Z\d]/g) &&
                    password.length >= 8){
             } 
            else {
                throw 'Mot de passe trop faible.'; } 
}

//pour que l'utilisateur s'inscrive
exports.signup = (req, res, next) => {
  try{
    validationPassword(req.body.password);
    const email = CryptoJS.MD5(req.body.email).toString();
    const password = null;
    const createEmployeQuery = "insert into Employes (Nom, Prenom, Email, Password) VALUES (?,?,?,?)";
    bcrypt.hash(req.body.password, 10) 
    .then(hash => { 
      password = hash;
    const inserts = [req.body.nom, req.body.prenom, email, password];
    const sql = mysql.format(createEmployeQuery, inserts);
    console.log("sql:"+sql);
    db.query(sql, (err,results) =>{
      if(!err){
        console.log('sauvegarde de l\'employe');
        res.status(201).json({ message: 'Utilisateur créé !' });
      }else{
        res.status(400).json({ err });
      }
    })  
    })
    .catch(error => res.status(500).json({ error }));
  }catch(e){
    return res.status(401).json({e});
  }	 
};

//pour que l'utilisateur se connecte
exports.login = (req, res, next) => {
	User.findOne({ email: CryptoJS.MD5(req.body.email).toString() }) // verification email
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // compare le mdp entré par l'utilisateur avec le hash de la bdd
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ //reponse 200 avec userID et token
            userId: user._id,
            token: jwt.sign( // sign de json web token pour encoder nouveau token
              { userId: user._id },// token contient l'id user en tant que payload
              'RANDOM_TOKEN_SECRET', //chaine secrete de developpement temporaire pour encoder le token
              { expiresIn: '24h' } // durée de validité du token
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};