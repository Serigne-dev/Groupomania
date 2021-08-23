Projet 7 - Groupomania !
7ème projet de la formation développeur web d'Openclassrooms. Créer un réseau social d'entreprise. La stack utilisée pour ce projet:

react Js
NodeJs + express 
Mysql

Frontend
Ouvrir le dossier Frontend dans le terminal de votre éditeur puis exécuter la commande:

npm install
puis

npm start
si le navigateur ne s'ouvre pas automatiquement allez à :
http://localhost:3000/


Backend
Ouvrir le dossier Backend dans le terminal de votre éditeur puis exécuter la commande:
nodemon server
http://localhost:4200/

Base de données
Se connecter au serveur MySql de votre choix. Exécuter la commande: CREATE DATABASE Groupomania; Vérifiez les identifiants dans le fichier config.json du dossier Backend puis importer le fichier socialnetwork.sql s'il vous a été fourni :

mysql -u root -p Groupomania < groupomania_quieries.sql
Il faut remplacer groupomania_quieries.sql par le chemin du fichier dans votre machine. Vous pouvez lancer le projet sans importer le fichier.sql, au lancement de l'application un compte administrateur est automatiquement créé (les identifiants vous on été fourni dans un fichier Id_Admin).

Pour s'inscrire sur le reseau social de Groupomania, il vous faut renseigner :

Nom
Prenom
Une adresse mail valide
Un mot de passe (de 8 caractères minimum, lettres, chiffres, majuscules et minuscules, caractère special). Vous pouvez par la suite modifier votre profil (nom, prenom, email, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.
Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

des articles
des commentaires
Le modérateur peut les supprimer.