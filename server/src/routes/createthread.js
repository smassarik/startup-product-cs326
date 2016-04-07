var ThreadSchema = require('../schemas/thread.json');

var validate = require('express-jsonschema').validate;

exports.setApp = function(app,getUserIdFromToken, addDocument, readDocument, writeDocument)
{
  app.post('/thread', validate({ body: ThreadSchema }), function(req, res) {
    var body = req.body;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if (fromUser === body.originalPost.author) {
      /*console.log(body.boards);
      console.log(body.originalPost.author);
      console.log(body.originalPost.title);
      console.log(body.originalPost.date);
      console.log(body.originalPost.time);
      console.log(body.originalPost.img);
      console.log(body.originalPost.description);*/
      if (typeof(body.originalPost.title) !== 'string' || typeof(body.originalPost.description) !== 'string') {
        // 400: Bad request.
        res.status(400).end();
        return;
      }

      var thread = {
        'boards': body.boards,
        'commentsNo': 0,
        'viewsNo': 0,

        'originalPost': {
          'author': body.originalPost.author,
          'title': body.originalPost.title,
          'date': body.originalPost.date,
          'time': body.originalPost.time,
          'img': body.originalPost.img,
          'postDate': new Date().getTime(),
          'description': body.originalPost.description
        },

        'replies': []
      };

      thread = addDocument('threads', thread);

      for(var i in body.boards){
          var board = readDocument('boards', body.boards[i]);
          board.threads.push(thread._id);
          writeDocument('boards', board);
      }

      res.status(201);
      //console.log(threadData);
      res.set('Location', '/threads/' + thread._id);
      res.send(thread);
    }
    else {
      // 401: Unauthorized.
      res.status(401).end();
    }
  });
};