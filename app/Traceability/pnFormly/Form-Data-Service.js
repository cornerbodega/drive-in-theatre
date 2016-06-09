(function() {
    angular
    .module('countryApp')
    .factory('FormDataService', ['FieldDataService', '$location',
    FormDataService
]);

function FormDataService(FieldDataService, $location) {
    console.log('Input Service!!!!');
    var i = {}; // forms needed for action

    i.inventory_room_add = function() {
        var form = []
        addfield(form, 'inventory_room_name')
        return form
    }
    i.inventory_room_remove = function() {
        var form = []
        addfield(form, 'select_inventory_room')
        return form
    }
    // i.browse_inventory_rooms = function() {
    //     var form = []
    //     addfield(form, 'select_inventory_room')
    //     // addfield(form, 'inventory_room_details')
    //     return form
    // }

    i.plant_room_add = function() {
        var form = []
        addfield(form, 'plant_room_name')
        return form
    }
    i.plant_room_remove = function() {
        var form = []
        addfield(form, 'select_plant_room')
        return form
    }
    // i.browse_plant_rooms = function() {
    //     var form = []
    //     addfield(form, 'select_plant_room')
    //     addfield(form, 'plant_room_details')
    //     return form
    // }


    i.plant_new = function() {
        var form = []
        addfield(form, 'select_plant_source')
        addfield(form, 'plant_strain')
        addfield(form, 'select_plant_room')
        addfield(form, 'quantity')
        addfield(form, 'plant_is_mother')
        return form
    }
    i.inventory_transfer_inbound = function(){
        var form = []
        // addfield(form, 'select_inbound_manifest_to_receive')
        addfield(form, 'select_items_to_accept')
        // addfield(form, 'receive_items')

        return form
    }
    i.transfers_view_inbound = function() {
        var form = [];
        addfield(form, 'select_inbound_transfer');
        addfield(form, 'inbound_transfer_details')
        return form;
    }
    i.transfers_view_outbound = function() {
        var form = []
        addfield(form, 'select_outbound_transfer');
        addfield(form, 'manifest_details')
        return form
    }
    i.browse_plants = function() {
        return [ FieldDataService.f.select_plants, FieldDataService.f.plants_details ];

    }

    i.plant_move = function() {
        return [
            FieldDataService.f.select_plants,
            FieldDataService.f.select_plant_room
        ];
    }

    i.plant_destroy = function () {
        return [
            FieldDataService.f.select_sd_plants
        ]
    }
    i.plant_destroy_schedule = function() {
        var form = []
        addfield(form, 'select_plants') //
        addfield(form, 'reason_type_for_schedule_for_destruction') //
        addfield(form, 'reason_desc_for_schedule_for_destruction') //
        return form

    }

    i.plant_harvest = function() {
        var new_room =  FieldDataService.f.select_plant_room
        new_room.templateOptions.label = "Destination Room"
        new_room.templateOptions.placeholder = "Destination Room"
        return [
            FieldDataService.f.select_sh_plant,
            new_room,
            FieldDataService.f.plant_harvest_flower_amount,
            FieldDataService.f.plant_harvest_waste_amount,
            FieldDataService.f.plant_harvest_other_plant_material_amount,
            FieldDataService.f.collectadditional,

        ]
    }
    i.plant_harvest_schedule = function() {
        return [
            FieldDataService.f.select_plants
        ]
    }
    i.plant_waste_weigh = function() {

    }

    i.plant_cure = function() {
        var new_room =  FieldDataService.f.select_plant_room
        new_room.templateOptions.label = "Destination Room"
        new_room.templateOptions.placeholder = "Destination Room"
        return [
            FieldDataService.f.select_plant_derivatives,
            new_room,
            FieldDataService.f.plant_harvest_flower_amount,
            FieldDataService.f.plant_harvest_waste_amount,
            FieldDataService.f.plant_harvest_other_plant_material_amount,
            FieldDataService.f.collectadditional,
        ]
    }

    i.plant_convert_to_inventory = function() {

    }

    i.plant_yield_modify = function() {

    }

    i.plant_modify = function() {

    }

    i.employee_modify = function() {
        var form = [];
        addfield(form, 'select_employee')
        addfield(form, 'modify_employee_name')
        addfield(form, 'modify_birth_date')
        addfield(form, 'modify_hire_date')
        return form
    }
    i.employee_add = function() {
        var form = []
        addfield(form, 'employee_name')
        addfield(form, 'birth_date')
        addfield(form, 'hire_date')
        return form
    }
    i.employee_remove = function() {
        var form = []
        addfield(form, 'select_employee')
        return form
    }
    i.browse_employees = function() {
        var form = []
        addfield(form, 'select_employee')
        addfield(form, 'employee_details')
        return form
    }
    i.vehicle_remove = function() {
        var form = []
        addfield(form, 'select_vehicle')
        return form
    }
    i.vehicle_modify = function() {
        var form = []
        addfield(form, 'select_vehicle')
        // addfield(form, 'modify_nickname')
        addfield(form, 'modify_color')
        addfield(form, 'modify_make')
        addfield(form, 'modify_model')
        addfield(form, 'modify_plate')
        addfield(form, 'modify_vin')
        addfield(form, 'modify_year')
        return form
    }
    i.vehicle_add = function() {
        var form = []
        addfield(form, 'color')
        addfield(form, 'make')
        addfield(form, 'model')
        addfield(form, 'plate')
        addfield(form, 'vin')
        addfield(form, 'year')
        addfield(form, 'nickname')
        return form
    }
    i.browse_vehicles = function() {
        var form = []
        addfield(form, 'select_vehicle')
        addfield(form, 'vehicle_details')
        return form
    }

    // { label: 'Schedule Harvest', id: 'plant_harvest_schedule' },
    // { label: 'Harvest', id: 'plant_harvest' },
    // { label: 'Log Waste', id: 'plant_waste_weigh' },
    // { label: 'Cure', id: 'plant_cure' },
    // { label: 'Convert to Inventory', id: 'plant_convert_to_inventory' },
    // { label: 'Modify Plant Yield', id: 'plant_yield_modify' },
    // { label: 'Modify Plant', id: 'plant_modify' },
    ///////// INVENTORY //////////////////////////
    // i.batch_inventory_adjust = function() {
    //     var form = [];
    //     addfield(form, 'batch_inventory_adjust')
    //     return form;
    // }

    i.inventory_convert = function() {
        var form = [];
        // addfield(form, 'inventorybarcodeiddata');
        addfield(form, 'view_inventory');
        // addfield(form, 'inventory_barcodeid_select_data')
        addfield(form, 'inventory_convert_remove_quantity');
        addfield(form, 'derivative_product');
        addfield(form, 'derivative_type');
        addfield(form, 'derivative_strain');
        addfield(form, 'derivative_quantity');
        addfield(form, 'derivative_usable');
        addfield(form, 'inventory_convert_waste');
        return form;
    }
    i.schedule_zeros_for_destruction = function() {
        var form = [];
        addfield(form, 'schedule_zeros_for_destruction');
        return form;
    }
    // i.waste_destroy = function() {
    //     var form = [];
    //     addfield(form, 'waste_destroy');
    //     return form;
    // }
    i.inventory_destroy = function() {
        var form = [];
        addfield(form, 'select_inventory_destroy')
        return form
    }
    i.waste_destroy_schedule = function() {
        var form = [];
        // addfield(form, 'select_all_waste');
        addfield(form, 'waste_destroy_schedule');
        // addfield(form, 'reason_type_for_schedule_for_destruction');
        // addfield(form, 'reason_desc_for_schedule_for_destruction');
        return form;
    }
    i.inventory_destroy_schedule = function() {
        var form = [];
        // addfield(form, 'select_all_waste');
        addfield(form, 'select_inventory_multiple');
        addfield(form, 'reason_type_for_schedule_for_destruction');
        // addfield(form, 'reason_desc_for_schedule_for_destruction');
        return form;
    }
    i.view_inventory = function() {
        var form=[];
        //addfield(form, view_inventory);
        // addfield(form, 'view_inventory_table');
        addfield(form, 'select_inventory_multiple')
        addfield(form, 'inventory_details')
        return form;
    }
    // i.qa_view_sample_results = function() {
    //     var form = [];
    //     addfield(form, 'qa_view_sample_results');
    //     return form;
    // }

    // i.inventory_transfer_outbound = function() {
    //     var form = [];
    //     addfield(form, 'inventory_transfer_outbound');
    //     return form;
    // }
    // i.transfers_outbound_view = function() {
    //     var form = [];
    //     addfield(form, 'manifest_view');
    //     return form;
    // }

    i.browse_manifests = function() {
        var form = [];
        // addfield(form, 'manifest_view');
        addfield(form, 'select_manifests')
        addfield(form, 'manifest_details')
        // addfield(form, 'dataquantity')
        return form;
    }
    i.inventory_transfer_outbound = function() {
        var form = [];
        // addfield(form, 'select_inventory_multiple');
        addfield(form, 'select_manifest_to_transfer');
        addfield(form, 'price_manifest')
        return form;
    }
    i.inventory_manifest = function() {
        var form = [];
        // addfield(form, 'manifest_barcodeid')
        addfield(form, 'select_employee')
        addfield(form, 'select_vehicle')
        addfield(form, 'select_inventory_multiple')
        addfield(form, 'manifest_vendor_license');
        addfield(form, 'manifest_approximate_departure');
        addfield(form, 'manifest_approximate_arrival');
        addfield(form, 'manifest_approximate_route');

        // addfield(form, 'manifest_approximate_departure_time');
        // addfield(form, 'employee_id');
        // addfield(form, 'vehicle_id');
        // addfield(form, 'location'); // needs to have a default value
        // need to be able to add an array of stops!


        // addfield(form, 'dataquantity')
        return form;
    }
    // INVENTORY ADJUST
    i.inventory_adjust = function() {
        var form = [];
        // addfield(form, 'view_inventory');
        addfield(form, 'select_inventory_multiple');
        addfield(form, 'adjust_quantity_multiple');
        // addfield(form, 'dataquantity');
        // addfield(i.inventory_adjust, 'dataquantity');
        // addfield(i.inventory_adjust, 'dataquantity_uom');
        // addfield(i.inventory_adjust, 'dataremove_quantity');
        // addfield(i.inventory_adjust, 'dataremove_quantity_uom');
        addfield(form, 'enter_adjust_reason');
        addfield(form, 'select_adjust_type');
        // console.log('inventory-adjust form ');
        // console.log(form);
        return form;
    }

    // INVENTORY SCHEDULE DESTRUCTION
    // TODO: IMPLEMENT FUNCTIONS
    // INVENTORY CONVERT
    // i.inventory_convert = [];

    // INVENTORY ADJUST USABLE
    // i.inventory_adjust_usable = [];
    // addfield(i.inventory_adjust_usable, 'quantity');
    // addfield(i.inventory_adjust_usable, 'inventorybarcodeid');


    function addfield(form, field) {
        var field = FieldDataService.f[field];
        // console.log(field);
        if(typeof field != 'undefined') {
            form.push(field);
            return form
        } else {
            console.log('Error! Field not found for: ' + field)
            console.log('field');
            console.log(field);
            console.log('task');
            console.log(task);
        }
    }
    // console.log(i);

    function getform(task) {
        // console.log('returning form for ' + task);
        // console.log(i[task]());
        // console.log(i);

        // define each form using an object creator function
        // return an array of forms based on action
        return i[task]();
    }

    return {
        getForm: getform,
        i: i
    };
};
})();
