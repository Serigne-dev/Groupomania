DROP TABLE IF EXISTS Employes;
CREATE TABLE Employes (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Nom VARCHAR(20) NOT NULL,
 Prenom VARCHAR(20) NOT NULL,
 Email VARCHAR(30) NOT NULL,
 Password varchar(60) NOT NULL,
 Photo_url varchar(255) DEFAULT NULL,
 isAdmmin boolean NOT NULL,
 PRIMARY KEY (id)
)
ENGINE=INNODB;


DROP TABLE IF EXISTS Article;
CREATE TABLE Article (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Employe_id SMALLINT UNSIGNED NOT NULL,
 Title varchar(50) NOT NULL,
 Texte TEXT,
 Photo_url varchar(255) DEFAULT NULL,
 Heure DATETIME,
 PRIMARY KEY (id),
 CONSTRAINT fk_employe_id
    FOREIGN KEY (Employe_id)
    REFERENCES Employes(id)
    ON DELETE CASCADE
)
ENGINE=INNODB;


DROP TABLE IF EXISTS Commentaires;
CREATE TABLE Commentaires (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Employe_id SMALLINT UNSIGNED NOT NULL,
 Texte TEXT,
 id_article SMALLINT UNSIGNED NOT NULL,
 PRIMARY KEY (id),
 CONSTRAINT fk_commentaire_employe_id FOREIGN KEY (Employe_id) REFERENCES Employes(id) ON DELETE CASCADE,
 CONSTRAINT fk_Article_id FOREIGN KEY (id_article) REFERENCES Article(id) ON DELETE CASCADE
)
ENGINE=INNODB;


INSERT INTO Employes
VALUES (1, 'admin', 'principal', 'admin@email.com', 'administrateur', '');

INSERT INTO Article
VALUES ('1','1','titre', 'je suis administrateur', '', now());