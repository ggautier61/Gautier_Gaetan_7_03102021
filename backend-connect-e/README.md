# Groupomania #

Projet 7 - Créer un réseau social d'entreprise - de la formation Développeur Web d'Openclassroom. Il fallait développer la partie backend de l'application pour la société Groupomania.

Voir ci-dessous comment installer et démarrer le backend de l'application.

## Backend Installation ##

Go to the `backend` folder and run the commande `npm install`.

## Fichier de configuration ##

Create a `.env` file in the `backend` folder. In this file, create 4 variables and add the value corresponding :

LOGIN_DB = (your login of your mysql Database)
PWD_DB = (your mysql password)
HOST = (localhost)
DATABASE = (name of the database)

Save the file.

## Run Backend ##

From the folder `backend`, run the command `nodemon server`.

The server will start en `localhost` and use port `3000`.

If everything is ok, the message `Connexion à MySql réussie !` should appear in the console.

The server should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.