const db = require("../models");
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
    // console.log(JSON.stringify(body.news.stringify()));
    console.log(body);

    urlFile = '';

    if(req.file) {
        urlFile = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
        console.log(urlFile);
    } 
    
    News.create({
        userId: body.userId,
        message: body.message,
        imageURL: urlFile
    
    })
    .then(news => {
        console.log(news);
        res.status(201).send(news);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
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