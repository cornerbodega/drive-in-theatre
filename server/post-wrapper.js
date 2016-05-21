var request = require('request');
var _ = require('lodash');
module.exports = {
    post: post,
}

function post(req, res) {
    // console.log(req.body);
    // console.log(req.body.request);
    return request(lcbPost(req.body.request), formatAndReturn);
    function formatAndReturn(error, response, body){
        // console.log(req.body.request);
        console.log(body);
        res.send(body);
    }
}

function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
