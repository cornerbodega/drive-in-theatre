// var request = require('request');
module.exports = {
    create: function (req, res, next) {
        var myRootRef = new Firebase('https://connect502.firebaseio.com/users/'+req.body.license_number);
        console.log(req.body);
        myRootRef.update(req.body);
        // res.send(myRootRef);
        res.send('Created Successfully')
    },
    getAll: function (req, res, next) {
        var ref = new Firebase ("https://connect502.firebaseio.com/users")
        ref.on("value", function(snapshot){
            res.send(snapshot.val());
        })
    },
    // findOne: function(req, res, next) {
    //     res.send(new Firebase('https://connect502.firebaseio.com/users/'+req.body.user_id));
    // }
};
