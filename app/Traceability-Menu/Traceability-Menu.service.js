(function(){
    angular
    .module('countryApp')
    .factory('TraceabilityMenuService', [ TraceabilityMenuService ]);

    function TraceabilityMenuService() {
        return{
            getIconAndLabel: function(pathpart){
                // console.log(this.paths());
                var paths = this.paths()
                // console.log(paths);
                //console.log(pathpart);
                var icon_map = {}
                _.map(paths, function(options){
                    // console.log(options);
                    _.map(options, function(option){
                        // console.log(option.id);
                        icon_map[option.id] = {label:option.label,icon:option.icon}
                    })
                })
                // console.log(pathpart);
                // console.log(icon_map);
                return icon_map[pathpart]
                // var results = _.find(paths, function(options) {
                //     return _.find(options, {id: pathpart})
                // })
                // // console.log(ret);
                // console.log(results);
                // // if (!!results) return results
                // // return console.log('Warning! No Icon for ' + pathpart);
                //
                //     // _.map(options, function(option){
                //     //     if (option.id === pathpart) return
                //     // })
                // // }
                // // _.find(option)
            },
            paths: function(){
                return {
                    "/":[
                        { label: 'Traceability', id: 'traceability', icon: 'fa-pencil-square-o' },
                    ],
                    "/traceability/help": [
                        { label: 'Feedback', id: 'help' },
                    ],
                    "/traceability": [
                        { label: 'Plants', id: 'plants', icon: 'fa-lemon-o' },
                        { label: 'Inventory', id: 'inventory', icon: 'fa-barcode' },
                        // { label: 'QA Labs', id: 'qa_lab', icon: 'fa-graduation-cap' },
                        // { label: 'Marketplace', id: 'market', icon: 'fa-exchange' },
                        // { label: 'Vendors', id: 'vendors', icon: 'fa-industry' },
                        // { label: 'Sales', id: 'sales', icon: 'fa-line-chart' },
                        // { label: 'Tax Report', id: 'tax_report', icon: 'fa-meh-o' },
                        { label: 'Location', id: 'location', icon: 'fa-building-o' },
                    ],
                    "/traceability/location": [
                        { label: 'Employees', id: 'employees', icon: 'fa-users' },
                        { label: 'Vehicles', id: 'vehicles', icon: 'fa-car' },
                        { label: 'Rooms', id: 'rooms', icon: 'fa-object-group' },
                    ],
                    "/traceability/location/rooms/inventory_rooms": [
                        // { label: 'Browse Inventory Rooms', id: 'browse_inventory_rooms', icon:'' },
                        { label: 'Add Inventory Room', id: 'inventory_room_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Inventory Room', id: 'inventory_room_modify', icon:'' },
                        { label: 'Remove Inventory Room', id: 'inventory_room_remove', icon:'fa-minus-circle' },
                    ],
                    "/traceability/location/rooms/plant_rooms":
                    [
                        // { label: 'Browse Plant Rooms', id: 'browse_plant_rooms', icon:'' },
                        { label: 'Add Plant Room', id: 'plant_room_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Plant Room', id: 'plant_room_modify', icon:'' },
                        { label: 'Remove Plant Room', id: 'plant_room_remove', icon:'fa-minus-circle' },
                    ],
                    "/traceability/location/rooms":
                    [
                        { label: 'Plant Rooms', id: 'plant_rooms', icon:'fa-leaf' },
                        { label: 'Inventory Rooms', id: 'inventory_rooms', icon:'fa-cubes' },
                    ],
                    "/traceability/location/vehicles": [
                        // { label: 'Browse Vehicles', id: 'browse_vehicles', icon:'fa-folder-open' },
                        { label: 'Add Vehicle', id: 'vehicle_add', icon:'fa-plus-circle' },
                        // { label: 'Modify Vehicle', id: 'vehicle_modify', icon:'' },
                        { label: 'Remove Vehicle', id: 'vehicle_remove', icon:'fa-times-circle' }
                    ],

                    "/traceability/location/employees": [
                        // { label: 'Browse Employees', id: 'browse_employees', icon:'fa-folder-open' },
                        { label: 'Add Employee', id: 'employee_add', icon:'fa-user-plus' },
                        // { label: 'Modify Employee', id: 'employee_modify', icon:'' },
                        { label: 'Remove Employee', id: 'employee_remove', icon:'fa-user-times' }
                    ],

                    "samples": [
                        { label: 'View QA Sample Results', id: 'qa_view_sample_results'},
                    ],
                    "/traceability/inventory":
                    [
                        // { label: 'Browse', id: 'view_inventory', icon: 'fa-folder-open' },
                        { label: 'Convert', id: 'inventory_convert', icon: 'fa-code-fork' },
                        { label: 'Manifests & Transfers', id: 'manifests', icon: 'fa-truck' },
                        { label: 'Adjust Quantity', id: 'inventory_adjust', icon: 'fa-crop' },
                        { label: 'Schedule Destruction', id: 'inventory_destroy_schedule', icon: 'fa-calendar-times-o' },
                        { label: 'Destroy', id: 'inventory_destroy', category: 'Inventory Cleanup', icon: 'fa-trash' },
                    ],

                    // "/traceability/inventory/manifests/inbound":
                    // [
                    //     { label: 'Browse Inbound', id: 'transfers_view_inbound', icon: 'fa-folder-open'},
                    //     { label: 'Receive New Inbound', id: 'inventory_transfer_inbound', icon: 'fa-cart-arrow-down'},
                    // ],

                    "/traceability/inventory/manifests/outbound":
                    [
                        { label: 'Browse Outbound', id: 'browse_manifests', icon: 'fa-folder-open'},
                        { label: 'Schedule New Outbound', id: 'inventory_manifest', icon: 'fa-calendar-plus-o'},
                        { label: 'Send Outbound', id: 'inventory_transfer_outbound', icon: 'fa-envelope'},
                        // { label: 'Void Existing Manifest', id: 'manifest_void', category: 'Manifests'},
                        // { label: 'View Inbound', id: 'transfers_view_inbound', category: 'Transfers'},
                        // { label: 'Receive Inbound', id: 'inventory_transfer_inbound', category: 'Transfers'},
                        // { label: 'View Outbound Transfers', id: 'transfers_view_outbound', category: 'Transfers'},
                        // { label: 'Void Outbound Transfer', id: 'transfers_view_outbound', category: 'Transfers'},
                    ],

                    "/traceability/inventory/manifests":
                    [
                        { label: 'Outbound', id: 'outbound', icon: 'fa-arrow-circle-up'},
                        { label: 'Inbound', id: 'inbound/inventory_transfer_inbound', icon: 'fa-arrow-circle-down'},

                    ],

                    "/traceability/plants":
                    // machine-learning opportunity here. have a stored order
                    // variable that changes the rank of nav boxes per click
                    // so that over time, the most clicked box is on top for a user
                    [
                        // { label: 'Browse Plants', id: 'browse_plants', icon: 'fa-folder-open' },
                        { label: 'Create a New Plant', id: 'plant_new', icon: 'fa-plus-square-o'},
                        { label: 'Change Rooms', id: 'plant_move', icon: 'fa-object-group' },
                        { label: 'Schedule Destruction', id: 'plant_destroy_schedule', icon: 'fa-calendar-times-o' },
                        { label: 'Destroy', id: 'plant_destroy', icon: 'fa-trash' },
                        { label: 'Schedule Harvest', id: 'plant_harvest_schedule', icon: 'fa-calendar-plus-o' },
                        { label: 'Harvest', id: 'plant_harvest',  icon: 'fa-pagelines' },
                        // { label: 'Log Waste', id: 'plant_waste_weigh' },
                        { label: 'Cure', id: 'plant_cure', icon: 'fa-check' },
                        { label: 'Sell Clone', id: 'plant_convert_to_inventory', icon: 'fa-clone' },
                        // { label: 'Modify Plant Yield', id: 'plant_yield_modify' },
                        // { label: 'Modify Plant', id: 'plant_modify' },
                    ],
                }
            }
        }
    }
})();
