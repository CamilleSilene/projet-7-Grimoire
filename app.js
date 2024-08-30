//fonction d'importation d'express
const express = require("express");

//constante app qui va appeler la méthode express
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

const User = require("./models/Users");
const Book = require("./models/Books");

mongoose
  .connect(
    "mongodb+srv://pierrotcamille04:qhqKTmyT9KsEbumx@cluster0.b8lhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée :/ !"));

//middleware général : appliqué à toutes les routes du serveur
//fonction pour ajouter des en-têtes aux réponses qu'on renvoie au navigateur pour autoriser l'accès à l'API
//pour permettre la possibilité d'envoyer des requêtes avec les méthodes mentionnées
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//renvoie un tableau de tous les éléments du modèle Books
app.get('/api/books', (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
});

//renvoie un élément avec l'id fourni
app.get('/api/books/:id', (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }));
});

//suppression de _id dans le req.body car l'id des éléments sera généré par MongoDB
//création d'une const thing qui reprend le modèle Thing en lui passant les infos requises dans le body
//utilisation de SPREAD "..." pour faire une copie de tous les éléments de req.body
//la méthode .save renvoie une promise
app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const book = new Book({
      ...req.body
    });
  thing.save()
  .then(() => res.status(201).json({message: 'Livre enregistré'}))
  .catch(error => res.status(400).json({error}));
  });

//route de suppression avec l'id dans le path
//méthode .deleteOne qui prend l'id en paramètres
app.delete("/api/books/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(400).json({ error }));
});

//méthode updateOne pour mettre à jour/modifier
//1er argument c'est l'objet que l'on modifie : id dans les paramètres de requête
//2eme argument c'est la nouvelle version de l'objet en faisant correspondre les id
app.put("/api/books/:id", (req, res, next) => {
  Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre modifié" }))
    .catch((error) => res.status(400).json({ error }));
});
