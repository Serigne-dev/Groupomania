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
  try {
    console.log("signup");
    validationPassword(req.body.password);
    console.log("password validé" + req.body.password);
    //const email = CryptoJS.MD5(req.body.email).toString();
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const createEmployeQuery =
        "insert into Employes (Nom, Prenom, Email, Password, Photo_url, isAdmmin) VALUES (?,?,?,?,?,?)";
      const inserts = [req.body.nom, req.body.prenom, req.body.email, hash, "", false];
      const sql = mysql.format(createEmployeQuery, inserts);
      db.query(sql, (err, results) => {
        if (!err) {
          console.log("sauvegarde de l'employe");
          res.status(201).json({ message: "Utilisateur créé !" });
        } else {
          res.status(400).json({ err });
        }
      });
    });
  } catch (e) {
    return res.status(401).json({ e });
  }
};

//pour que l'utilisateur se connecte
exports.login = (req, res, next) => {
    const selectEmailQuery = "select * FROM Employes where Email = ?";
    const inserts = [req.body.email];
    const sql = mysql.format(selectEmailQuery, inserts);
    console.log("SQL : "+sql);
    db.query(sql, (err, results) => {
        if (!err && results.length != 0) {
          bcrypt.compare(req.body.password, results[0].Password) // compare le mdp entré par l'utilisateur avec le hash de la bdd
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ //reponse 200 avec userID et token
            userId: results[0].id,
            userName: results[0].Nom, 
            userPrenom: results[0].Prenom,
            userEmail: results[0].Email,
            userImg: results[0].Photo_url,
            token: jwt.sign( // sign de json web token pour encoder nouveau token
              { 
                userId: results[0].id ,
                userName: results[0].Nom, 
                userPrenom: results[0].Prenom,
                userEmail: results[0].Email,
                userImg: results[0].Photo_url,
              },
              'RANDOM_TOKEN_SECRET', 
              { expiresIn: '24h' } 
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
        } else {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
      });
};

exports.modify = (req, res, next) => {
  let imageUrl = null;
  if(req.file){
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  const modifyUserQuery = "UPDATE Employes SET nom=?, prenom=?, email=?,Photo_url=? WHERE id=?";
  const inserts = [req.body.userName, req.body.userPrenom, req.body.userEmail, imageUrl, req.body.userId];
  const sql = mysql.format(modifyUserQuery, inserts);
  console.log("modif user : "+sql);
  db.query(sql, (err, results) => {
        if (!err) {
          console.log("modification de l'employe");
          res.status(200).json({ //reponse 200 avec userID et token
            userImg: imageUrl,
            message: "Utilisateur modifié !"
          });
        } else {
          res.status(400).json({ err });
        }
  });
};

exports.delete = (req, res, next) => {
  const deleteUserQuery = "delete FROM Employes where id = ?";
  const inserts = [req.body.userId];
  const sql = mysql.format(deleteUserQuery, inserts);
  db.query(sql, (err, results) => {
        if (!err) {
          console.log("suppression de l'employe");
          res.status(201).json({ message: "Utilisateur supprimé !" });
        } else {
          res.status(400).json({ err });
        }
  });
};
