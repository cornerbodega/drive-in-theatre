var request = require('request');
var _ = require('lodash');
module.exports = {
    create: create
}

function create(req, res) {

    console.log(req);
    console.log(req.body);
    request(lcbPost(req.body), formatAndReturn);

    function formatAndReturn(error, manifestResponse, manifestBody){
        if (error) return console.log("Error 7d687 Getting Manifests! "+ error)
        if (!manifestBody) return console.log('Error 23ee2: Error getting Manifests!')
        res.send(manifestBody);
    }

};

function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
