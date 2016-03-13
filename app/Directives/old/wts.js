// var request = require('request');
module.exports = {
    create: function (req, res, next) {
        var wtsRef = new Firebase('https://connect502.firebaseio.com/wts/'+req.body.id);
        var userRef = new Firebase('https://connect502.firebaseio.com/users/'+req.body.seller+/wts/);

        req.body.at = Firebase.ServerValue.TIMESTAMP
        userRef.push({id: req.body.id, at: req.body.at});
        wtsRef.set(req.body);
        res.send('Created Successfully')
    },
//     get: function(req, res){
//         console.log(req.params);
//         var myWtsRef = new Firebase('https://connect502.firebaseio.com/wts/'+req.params.ubi+/wts/);
//         // res.send(userRef)
//         myWtsRef.on("child_added", function(snapshot){
//             res.send(snapshot.val());
//         })
//         var ref = new Firebase("https://docs-examples.firebaseio.com/web/org");
// // // fetch a list of Mary's groups
// // ref.child("users/mchen/groups").on('child_added', function(snapshot) {
// //   // for each group, fetch the name and print it
// //   String groupKey = snapshot.key();
// //   ref.child("groups/" + groupKey + "/name").once('value', function(snapshot) {
// //     System.out.println("Mary is a member of this group: " + snapshot.val());
// //   });
// // });
//
//     }
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
