angular
.module('countryApp')
.factory('FormRequestFormatter', [ FormRequestFormatter ])
function FormRequestFormatter() {
    return {
        format: function (form) {
            console.log(form);
            var req = { action: form.action }
            if (form.action === 'plant_cure') {
                req.barcodeid = form.plant.plantid
                if (!form.final) req.collectadditional = 1
                if (form.final) req.collectadditional = 0
                req.new_room = form.room
                req.location = Data.mylocation
                req.weights = [
                    {
                        amount: form.plant_harvest_other_plant_material_amount,
                        uom: 'g',
                        invtype: 9
                    },
                    {
                        amount: form.plant_harvest_waste_amount,
                        uom: 'g',
                        invtype: 27
                    },
                    {
                        amount: form.plant_harvest_flower_amount,
                        uom: 'g',
                        invtype: 6
                    }
                ]

            }
            if (form.action === 'plant_harvest_schedule') {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
            }
            if (form.action === 'plant_harvest') {
                req.barcodeid = form.plant.id
                if (!form.final) req.collectadditional = 1
                if (form.final) req.collectadditional = 0
                req.new_room = form.room
                req.weights = [
                    {
                        amount: form.plant_harvest_other_plant_material_amount,
                        uom: 'g',
                        invtype: 9
                    },
                    {
                        amount: form.plant_harvest_waste_amount,
                        uom: 'g',
                        invtype: 27
                    },
                    {
                        amount: form.plant_harvest_flower_amount,
                        uom: 'g',
                        invtype: 6
                    }
                ]

            }
            if (form.action === 'plant_destroy') {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
            }
            if (form.action === 'plant_move') {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                req.room = form.room
            }
            if (form.action === 'plant_destroy_schedule') {
                req.barcodeid = form.plants.map(function(plant){
                    return plant.id
                })
                req.reason = form.reason
                req.reason_extended = form.reason_extended
                req.override = 1
            }
            if (form.action === 'inventory_room_remove') {
                req.id = form.room
            }
            if (form.action === 'inventory_room_add') {
                req.name = form.name
                req.location = form.mylocation
                req.id = form.id
            }
            if (form.action === 'plant_room_remove') {
                req.id = form.room
            }
            if (form.action === 'plant_room_add') {
                req.name = form.name
                req.location = form.mylocation
                req.id = form.id
            }
            if (form.action === 'plant_new') {
                req.location = form.mylocation
                req.source = form.source
                req.room = form.room
                req.strain = form.strain
                req.quantity = form.quantity
                var m = 0
                if (form.mother) m = 1
                req.mother = m
            }
            if (form.action === 'inventory_transfer_inbound') {
                req.data = []
                form.accepted_items = {}
                console.log(form);
                // form.itemsInfo.map(function(item){
                //
                // })
                _.map(form.accept, function(accepted, id){
                    // console.log( accepted);
                    // console.log(accepted);
                    var quantity = _.find(form.itemsInfo, {barcode_id:id}).quantity
                    console.log(quantity);
                    if(accepted) form.accepted_items[id] = quantity
                })
                for (id in form.accepted_items) {
                    req.data.push({barcodeid:id, quantity: form.accepted_items[id], uom:'g'})
                }
                req.location = form.mylocation
            }
            if (form.action === 'inventory_transfer_outbound') {
                req.manifest_id = form.manifest_to_transfer.manifestid
                req.data = []
                for (property in form.manifest_prices) {
                    req.data.push({barcodeid: property, price: form.manifest_prices[property]})
                }
            }
            if (form.action === 'inventory_manifest') {
                req.location = JSON.parse(localStorage.getItem('vendors')).vendorsbyubi[JSON.parse(sessionStorage.user).ubi].location
                req.employee_id = form.employee.employee_id
                req.vehicle_id = form.vehicle.vehicle_id
                req.stop_overview = [{}]
                req.stop_overview[0].approximate_departure = new Date(form.approximate_departure).getTime()/1000
                req.stop_overview[0].approximate_arrival = new Date(form.approximate_arrival).getTime()/1000
                req.stop_overview[0].approximate_route = form.approximate_route
                req.stop_overview[0].vendor_license = form.vendor.vendor_license
                req.stop_overview[0].stop_number = 1
                req.stop_overview[0].barcodeid = form.inventoryitems.map ( function(item) {
                    return item.id
                })


            }
            if (form.action === 'employee_remove') {
                req.employee_id = form.employee.employee_id

            }
            if (form.action === 'employee_modify') {
                req.employee_name = form.employee_name
                var hirearray = new Date(form.hire_date).toISOString().slice(0,10).split("-")
                var birtharray = new Date(form.birth_date).toISOString().slice(0,10).split("-")
                req.birth_day = birtharray[2]
                req.birth_year = birtharray[0]
                req.birth_month = birtharray[1]
                req.hire_day = hirearray[2]
                req.hire_year = hirearray[0]
                req.hire_month = hirearray[1]
                req.employee_id = form.employee.employee_id

            };
            if (form.action === 'employee_add') {
                req.employee_name = form.employee_name
                var hirearray = new Date(form.hire_date).toISOString().slice(0,10).split("-")
                var birtharray = new Date(form.birth_date).toISOString().slice(0,10).split("-")
                req.birth_day = birtharray[2]
                req.birth_year = birtharray[0]
                req.birth_month = birtharray[1]
                req.hire_day = hirearray[2]
                req.hire_year = hirearray[0]
                req.hire_month = hirearray[1]
                var employee_ids = Data.formatted.employees.map( function (employee) {
                    return employee.employee_id
                })
                max = Math.max.apply(null, employee_ids);
                req.employee_id = max + 1


            };
            if (form.action === 'vehicle_remove') {
                req.vehicle_id = form.vehicle.vehicle_id

            }
            if (form.action === 'vehicle_modify') {
                req.color = form.color
                req.make = form.make
                req.model = form.model
                req.plate = form.plate
                req.vin = form.vin
                req.year = form.year
                req.vehicle_id = form.vehicle.vehicle_id

            }
            if (form.action === 'vehicle_add') {
                // set vehicle_id to max vehicle_id + 1
                var vehicle_ids = JSON.parse(localStorage.getItem('vehicles')).map( function (vehicle) {
                    return vehicle.vehicle_id
                })
                max = Math.max.apply(null, vehicle_ids);
                req.vehicle_id = max + 1
                req.color = form.color
                req.make = form.make
                req.model = form.model
                req.plate = form.plate
                req.vin = form.vin
                req.year = form.year
                req.nickname = form.nickname

            }
            if (form.action === 'inventory_destroy') {
                req.barcodeid = form.inventoryitems.map( function(item) {
                    return item.id
                })

            }
            if (form.action === 'inventory_convert') {
                req.data = {}
                req.data.barcodeid = form.inventoryitem.id
                req.data.remove_quantity = form.remove_quantity
                req.data.remove_quantity_uom = 'g'
                req.derivative_type = form.new_derivative_type.id
                req.derivative_quantity = form.derivative_quantity
                req.derivative_usable = form.derivative_usable
                req.derivative_strain = form.derivative_strain
                req.derivative_product = form.derivative_product
                req.waste = form.waste
                req.waste_uom = 'g'
                req.derivative_quantity_uom = 'g'
                req.no_modification = 1

            }
            if (form.action === 'inventory_adjust') {
                var data = form.inventoryitems.map( function(item) {
                    return {
                        barcodeid: item.id,
                        quantity: form.quantity[item.id],
                        reason: form.adjust_reason,
                        type: form.adjust_type.id
                    }
                });
                req.data = data;

            }
            if (form.action === 'inventory_destroy_schedule') {
                var barcodeid = form.inventoryitems.map ( function(item) {
                    return item.id
                })
                req.barcodeid = barcodeid
                req.reason = form.reason
                req.reason_extended = form.reason_extended

            }

            return req

        }
    }
}
