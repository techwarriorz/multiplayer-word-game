var User = require('../datasets/user.js');
  module.exports.signup = function(req, res){

    userExists();

    function userExists(){
      User.findOne({username: req.body.username}, function(err, user){
        if (err || user === null){
          addUser(req.body)
        } else {
          check();
        }
      })
    }

    function check(){
      User.findOne(req.body, function(err, result){
        if (err || result === null){
          res.status(400);
          res.send();
        } else {
          console.log("Logged In");
          res.status(200);
          res.send();
        }
      })
    }

    function addUser(newUser){
      var user = new User(newUser);
      user.save();
      res.json(user);
    }

  };
