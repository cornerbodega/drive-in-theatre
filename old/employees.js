var request = require('request');
var _ = require('lodash');
module.exports = {
    get: get
}

function get(req, res) {
    var ereq = {
        action: 'sync_employee',
        sessionid: req.params.sessionid
    }

    request(lcbPost(ereq), formatAndReturn);

    function formatAndReturn(error, employeeResponse, employeeBody){
        if (error) return console.log("Error 7d687 Getting Employees! "+ error)
        if (!employeeBody) return console.log('Error 23ee2: Error getting Employees!')
        res.send(employeeBody.employee);
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
