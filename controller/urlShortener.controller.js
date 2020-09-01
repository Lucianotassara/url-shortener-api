import express from 'express';
import { Url } from '../models'
const shortid = require('shortid');

const urlShortenerController = express.Router();

//GET Acceder a un enlace corto
urlShortenerController.route('/l/:shortId').get(
   (req, res) => {
        Url.findOneAndUpdate({'shortUrl': req.params.shortId}, { $inc: {'requests': 1 } }, {new: false}, 
           function(err, e) {
          if (err)
            res.send(err);
          res.redirect(e.url);
        });
   }
);


// POST: Crear nuevo short link
urlShortenerController.route('/').post(
    async (req, res) => 
    {
        let urlobject = {
            url: req.body.url,
            shortUrl: shortid.generate(),
        }

        if(urlobject.url.startsWith('http://') || urlobject.url.startsWith('https://')){
            let regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
            if(req.body.url.match(regex)){
                var newUrl = new Url(urlobject);
                newUrl.save(function(err, n) {
                if (err)
                    res.send(err);
                res.json(n);
                });
            } else {
                res.status(401).json({message: `${urlobject.url} is not a valid url`})
            }
        } else {
            res.status(401).json({message: `${urlobject.url} is not a valid url, it should start with http:// or https://`})
        }        
    }
);

// GET: Ver todos los links
urlShortenerController.route('/list').get(
    (req, res) => {
        Url.find({}, function(err, n) {
            if (err)
              res.send(err);
            res.json(n);
          }).sort('-createdAt');
    }
);

// DELETE Eliminar url acortada. Id de parametro es el ID de la base de datos.
urlShortenerController.route('/:id').delete(
    async (req, res) => 
    {
        Url.remove({ _id: req.params.id }, function(err, n) {
            if (err)
                res.send(err);
            res.json({ message: 'Short url successfully deleted' });
        });
    }
  );



export default urlShortenerController;


