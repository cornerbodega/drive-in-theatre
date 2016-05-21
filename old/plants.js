var request = require('request');
var _ = require('lodash');
var pnServerUtils = require('./pnServerUtils')
module.exports = {
    get: get
}

function get(req, res) {

    var ereq = {
        action: 'sync_plant',
        sessionid: req.params.sessionid
    }
    var req = pnServerUtils.pnGetSyncCheckRequestFor(['plant','plant_room'], req.params.sessionid)

    // request(lcbPost(ereq), getPlantRooms);
    request(lcbPost(req), formatAndReturn);
    // function getPlantRooms(error, plantResponse, plantBody){
    //     if (!plantBody) return console.log('Error iuiu98: Error getting plants!')
    // }
    function formatAndReturn(error, plantResponse, plantBody){
        if (error) return console.log("Error 8989 Getting plants! "+ error)
        if (!plantBody) return console.log('Error iuiu98: Error getting plants!')
        // console.log(plantRoomsBody);
        res.send(formatPlants(res.plant, res.plany_rooms))
    }

};

function formatPlants(plants, plant_rooms) {
    if (!plants) return
    var plantstatus = {
        0: 'Growing',
        1: 'Drying',
        2: 'Cured'
    }
    var plant_rooms_by_id = {}
    plant_rooms.map(function(room) {
        plant_rooms_by_id[room.roomid] = room.name
    })
    console.log(plant_rooms_by_id);
    plants.map(function(plant){
        plant.plantstatus = plantstatus[plant.state]
        // plant.plantbirthday = new Date(plant.sessiontime*1000)
        plant.plantbirthday = new Date(plant.sessiontime*1000).toISOString().slice(0,10)
        plant.plantlabel =  '['+plant.id+']' + ' ' + plant.strain + ' ' + plant.plantbirthday + ' ('+plant.plantstatus+')'
        plant.plant_room_name = plant_rooms_by_id[plant.room]
        plant.category = plant.plant_room_name

    })
    return plants
};


function lcbPost(body) {
    return {
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,
        body: body
    }
}
