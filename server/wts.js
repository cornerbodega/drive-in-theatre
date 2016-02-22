// var request = require('request');
module.exports = {
    create: function (req, res, next) {
        var ltsRef = new Firebase('https://connect502.firebaseio.com/lts/'+req.body.id);
        ltsRef.set(req.body);
        var userRef = new Firebase('https://connect502.firebaseio.com/users/'+req.body.seller+/lts/);
        userRef.push(req.body.id);
        res.send('Created Successfully')
    },
    // getAll: function (req, res, next) {
    //     var ref = new Firebase ("https://connect502.firebaseio.com/users")
    //     ref.on("value", function(snapshot) {
    //         res.send(snapshot.val());
    //     });
    // },
    // findOne: function(req, res, next) {
    //     res.send(new Firebase('https://connect502.firebaseio.com/users/'+req.body.user_id));
    // }
};
