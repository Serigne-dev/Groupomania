const db = require("../config/config_db");
const mysql = require("mysql");
var async = require('async');

const querySelect = "SELECT  Article.id AS articleId,  Employes.Nom, Employes.Prenom, Article.Title, Article.Texte, Article.Photo_url, Article.Heure FROM Article JOIN Employes ON Article.Employe_id=Employes.id";

const querySelectComments = "SELECT Commentaires.Texte, Commentaires.id_article, Employes.Nom, Employes.Prenom FROM Commentaires JOIN Employes ON Employes.id=Commentaires.employe_id WHERE Commentaires.id_article = ?";



exports.getAllArticles = (req, res, next) => {

        const getArticles = () => {
          return new Promise((resolve, reject) => {
              try {
                  const string = "SELECT  Article.id AS articleId,  Employes.Nom, Employes.Prenom, Employes.Photo_url as userImg, Article.Title, Article.Texte, Article.Photo_url, Article.Heure FROM Article JOIN Employes ON Article.Employe_id=Employes.id";
                  // Requête
                  db.query (string, (err, articles) => {
                    if (!err) {
                        resolve(articles);
                    } else {
                        reject(err);
                    }
                  });
              } catch (err) {
                  reject(err);
              }
          });
    };

     // Fetch comments par post
    const getComments = (article_id) => {
        return new Promise((resolve, reject) => {
            try {
                const string = "SELECT Commentaires.Id, Commentaires.Texte, Commentaires.id_article, Employes.Nom, Employes.Prenom FROM Commentaires JOIN Employes ON Employes.id=Commentaires.employe_id WHERE Commentaires.id_article = ?";
                const inserts = [article_id];
                const sql = mysql.format(string, inserts);

                // Requête
                db.query(sql, (error, comments) => {
                   if (!error) {
                      resolve(comments);
                  } else {
                      reject(error);
                  }
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    // Compose articles avec commentaires
    const composeArticles = async () => {
        try {
          let articles = await getArticles();
            // Pour chaque article, recuperer les commentaires et les ajouter
            for (let i = 0; i < articles.length; i++) {
                const comments = await getComments(articles[i].articleId);
                articles[i].comments = comments;
            }
            return articles;
        } catch (err) {
            return new Error(err);
        }
    };

    composeArticles()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            return next(new HttpError("Erreur de requête, les publications n'ont pas pu être récupérées", 500));
        });

}

exports.createArticle = (req, res, next) => {
  const commentaires = req.body.commentaire;
  const title = req.body.title;
  const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  const createPostQuery = "INSERT INTO Article (Employe_id, Title, Texte, Photo_url, Heure) VALUES (?, ?, ?, ?, ?)";
  const inserts = [req.body.userId, title, commentaires, imageUrl, new Date()];
  const sql = mysql.format(createPostQuery, inserts);
  console.log(sql);
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
  const inserts = [req.body.userId, commentaires, idArticle];
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

