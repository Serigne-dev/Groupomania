const db = require("../config/config_db");
const mysql = require("mysql");

exports.getAllArticles = (req, res, next) => {
  console.log("getting all posts");
  db.query ('SELECT * FROM Article ', (err, results) => {
    if (!err) {
        console.log ('Données reçues de Db:');
            res.status(200).json(results);
        } else {
            return next(new HttpError("Erreur de requête, les article n'ont pas pu être récupérées", 500));
        }
  });
};

exports.createArticle = (req, res, next) => {
  console.log("creation of an article");
  const commentaires = req.body.commentaire;
  const title = req.body.title;
  const createPostQuery = "INSERT INTO Article (Employe_id, Title, Texte, Photo_url, Heure) VALUES (?, ?, ?, ?, ?)";
  const inserts = [1, title, commentaires, "", new Date()];
  console.log("insert : "+inserts);
  const sql = mysql.format(createPostQuery, inserts);
  console.log("sql : "+sql);
  db.query (sql, (err, results) => {
    if (!err) {
        console.log ('Sauvegarde du post');
        res.status(201).json({ message: "Publication sauvegardée" });
    } else {
        res.status(404).json({ err });
    }
  });
};

exports.createCommentaire = (req, res, next) => {
  console.log("creation d'un commentaire");
  const commentaires = req.body.comment;
  const idArticle = req.body.article;
  const createPostQuery = "INSERT INTO commentaires (Employe_id, Texte, id_article) VALUES (?, ?, ?)";
  const inserts = [1, commentaires, idArticle];
  console.log("insert : "+inserts);
  const sql = mysql.format(createPostQuery, inserts);
  console.log("sql : "+sql);
  db.query (sql, (err, results) => {
    if (!err) {
        console.log ('Sauvegarde du commentaire');
        res.status(201).json({ message: "Commentaire sauvegardée" });
    } else {
        res.status(404).json({ err });
    }
  });
};

