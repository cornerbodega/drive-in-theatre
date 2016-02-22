module.exports = {
    createLooneyTune: function (req, res, next) {
        var myRootRef = new Firebase('https://connect502.firebaseio.com/looneytunes');
        console.log(req.body);
        myRootRef.push({name: req.body.name, text: req.body.text, user_id: });
        // res.send(myRootRef);
        res.send('Created Successfully')
    }
};
