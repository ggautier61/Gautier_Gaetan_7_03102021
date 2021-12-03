const db = require("../models");
const fs = require('fs');

const News = db.news;
const NewsComments = db.newscomment;
const Users = db.user;

// exports.getNews = function (req, res, next) { 

//     News.findAll({ include: [{ model: NewsComment }]}).then(news => {
//         res.status(200).send(news);  
//       });
// };

exports.postNews = (req, res) => {

    // Save News to Database

    var body = req.body;

    urlFile = '';

    if(req.file) {
        urlFile = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
    } 
    
    News.create({
        userId: body.userId,
        message: body.message,
        imageURL: urlFile
    
    })
    .then(news => {
        res.status(201).send(news);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.postComment = (req, res) => {
    const body = req.body;
    console.log(body);

    NewsComments.create({
        userId: body.userId,
        message: body.message,
        newsId: body.newsId
    
    })
    .then(comment => {
        console.log(comment);
        res.status(201).send(comment);
    })
    .catch(err => {
        res.status(400).send({ message: err.message });
    });

}

exports.deleteNews = function (req,res) {
    
    const id = req.params.id;
    let filename = '';

    News.findByPk(id).then(news => {

        if(news.imageURL != '') {
        filename = news.imageURL.split('/images/')[1];
        }

        news.destroy({ where: { id: id }}).then(() => {
            console.log('filename', filename);
            if(filename != '') {
                console.log('on passe ici');
                fs.unlinkSync(`images/${filename}`); 
            }
            res.status(200).send({ deleted: true, message: 'La publication et tous les commentaires ont été supprimés !' });
        })
        .catch(err => {
            res.status(500).send({ value: false, message: err.message });
        });
        
    })
    .catch(err => {
        res.status(500).send({ value: false, message: err.message });
    });
    
}

exports.deleteComment = function (req,res) {

    const id = req.params.id;

    NewsComments.destroy({ where: { id: id }}).then(response => {
        res.status(200).send({ deleted: true, message: 'Commentaire supprimé !'});
    })
    .catch(err => {
        res.status(500).send({ value: false, message: err.message });
    });

}

exports.getAllNews = (req, res) => {

    News.findAll({ 
        include: [
            {   
                model: Users, 
                attributes: ['id', 'firstname', 'lastname', 'imageURL']
            },
            {  model: NewsComments,
                include: 
                { 
                    model: Users,
                    attributes: ['id', 'firstname', 'lastname', 'imageURL']
                } 
            }
        ]
        
    }).then(newslist => {
        res.status(200).send(newslist);  
      });



}
