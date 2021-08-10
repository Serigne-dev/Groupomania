DROP TABLE IF EXISTS Employes;
CREATE TABLE Employes (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Nom VARCHAR(20) NOT NULL,
 Prenom VARCHAR(20) NOT NULL,
 Email VARCHAR(30) NOT NULL,
 Password varchar(60) NOT NULL,
 Photo_url varchar(255) DEFAULT NULL,
 PRIMARY KEY (id)
)
ENGINE=INNODB;


DROP TABLE IF EXISTS Article;
CREATE TABLE Article (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Employe_id SMALLINT UNSIGNED NOT NULL,
 Texte TEXT,
 Photo_url varchar(255) DEFAULT NULL,
 Heure DATETIME,
 PRIMARY KEY (id),
 CONSTRAINT fk_employe_id
    FOREIGN KEY (Employe_id)
    REFERENCES Employes(id)
)
ENGINE=INNODB;


DROP TABLE IF EXISTS Commentaires;
CREATE TABLE Commentaires (
 id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
 Employe_id SMALLINT UNSIGNED NOT NULL,
 Texte TEXT,
 id_article SMALLINT UNSIGNED NOT NULL,
 PRIMARY KEY (id),
 CONSTRAINT fk_commentaire_employe_id
    FOREIGN KEY (Employe_id)
    REFERENCES Employes(id),
 CONSTRAINT fk_Article_id
    FOREIGN KEY (id_article)
    REFERENCES Article(id)   
)
ENGINE=INNODB;