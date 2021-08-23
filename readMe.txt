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
npm install
nodemon server
http://localhost:4200/

Base de données
Se connecter au serveur MySql de votre choix. Exécuter la commande: CREATE DATABASE Groupomania; 
mysql -u root -p Groupomania < groupomania_quieries.sql
Vérifiez les identifiants dans le fichier  config_db.js du dossier Backend puis importer le fichier groupomania_queries.sql s'il vous a été fourni :

Pour s'inscrire sur le reseau social de Groupomania, il vous faut renseigner :
Nom
Prenom
Une adresse mail valide
Un mot de passe (de 8 caractères minimum, lettres, chiffres, majuscules et minuscules, caractère special). Vous pouvez par la suite modifier votre profil (nom, prenom, email, photo) en allant sur votre profil. Votre compte peut être supprimé par vous-même ainsi que par l'administrateur.
Une fois connecté vous pouvez voir les publications des utilisateurs et publier au choix:

des articles
des commentaires
Le modérateur peut les supprimer.
pour etre moderateur , entrez dans la base de données :
UPDATE Employes SET isAdmmin=1 WHERE id="numero de l'id de l'employé"
(l'admin par defaut est: serigne@gmail.com, mot de passe : Azerty123*)