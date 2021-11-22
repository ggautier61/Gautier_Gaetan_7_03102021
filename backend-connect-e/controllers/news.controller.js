const db = require("../models");
const News = db.news;
const NewsComment = db.newscomment;

exports.getNews = function (req, res, next) { 

    News.findAll({ include: [{ model: NewsComment }]}).then(news => {
        res.status(200).send(news);  
      });
};

exports.postNews = (res, res) => {

    // Save News to Database
    var body = req.body;

    News.create({
        ownerId: body.id,
        message: body.message,
        imageURL: ''
    
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}