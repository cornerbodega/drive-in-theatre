
(function(){
    angular
    .module('countryApp')

.run(function(formlyConfig) {
    formlyConfig.setType({
        name: 'pn-select-vendor',
        templateUrl: 'Traceability-Form/field_templates/pn-select-vendor.html',
    });
    formlyConfig.setType({
        name: 'pn_accept_inbound_inventory_transfer',
        templateUrl: 'Traceability-Form/field_templates/pn_accept_inbound_inventory_transfer.html',
    });
    formlyConfig.setType({
        name: 'new_post_description',
        templateUrl: 'Traceability-Form/field_templates/new_post_description.html',
    });
    formlyConfig.setType({
        name: 'plant_derivatives',
        templateUrl: 'Traceability-Form/plants/plant_derivatives.html',
    });
    formlyConfig.setType({
        name: 'show_qa_labs',
        templateUrl: 'Traceability-Form/qa_lab/show_qa_labs.html',
    });
    formlyConfig.setType({
        name: 'mycheckbox',
        templateUrl: 'Traceability-Form/field_templates/my_checkbox.html',
    });
    formlyConfig.setType({
        name: 'inventory_transfer_inbound_request',
        templateUrl: 'Traceability-Form/field_templates/inventory_transfer_inbound_request.html',
    });
    formlyConfig.setType({
        name: 'inbound_transfer_details',
        templateUrl: 'Traceability-Form/field_templates/inbound_transfer_details.html',
    });
    formlyConfig.setType({
        name: 'manifest_details',
        templateUrl: 'Traceability-Form/field_templates/manifest_details.html',
    });
    formlyConfig.setType({
        name: 'inventory_details',
        templateUrl: 'Traceability-Form/field_templates/inventory_details.html',
    });
    formlyConfig.setType({
        name: 'plants_details',
        templateUrl: 'Traceability-Form/field_templates/plant_details.html',
    });
    formlyConfig.setType({
        name: 'pn-select-inventory-item',
        templateUrl: 'Traceability-Form/field_templates/pn-select-inventory-item.html',
    });
    // formlyConfig.setType({
    //     name: 'browse_plants',
    //     templateUrl: 'Traceability-Form/field_templates/browse_plants.html',
    // });
    formlyConfig.setType({
        name: 'employee_details',
        templateUrl: 'Traceability-Form/field_templates/my_employee_details.html',
    });
    formlyConfig.setType({
        name: 'myvehicledetails',
        templateUrl: 'Traceability-Form/field_templates/my_vehicle_details.html',
    });
    formlyConfig.setType({
        name: 'mymultipleselect',
        templateUrl: 'Traceability-Form/field_templates/pn-multiple-select-inventory.html',
    });

    formlyConfig.setType({
        name: 'pn-select',
        templateUrl: 'Traceability-Form/field_templates/pn-select.html',
    });
    formlyConfig.setType({
        name: 'my_multiple_quantity',
        templateUrl: 'Traceability-Form/field_templates/my_multiple_quantity.html',
    });
    formlyConfig.setType({
        name: 'my_text_area',
        templateUrl: 'Traceability-Form/field_templates/my_text_area.html',
    });
    formlyConfig.setType({
        name: 'price_manifest',
        templateUrl: 'Traceability-Form/manifests/transfer_prices.html',
    });
    formlyConfig.setType({
        name: 'viewplantstable',
        templateUrl: 'Traceability-Form/tables/view-plants-table.html',
    });

    formlyConfig.setType({
        name: 'mybatchadjust',
        templateUrl: 'Traceability-Form/tables/batch-inventory-adjust.html',
    });

    formlyConfig.setType({
        name: 'mytable',
        templateUrl: 'Traceability-Form/tables/view-inventory.html',
    });

    formlyConfig.setType({
        name: 'mydashboard',
        templateUrl: 'Traceability-Form/nav/my.dashboard.grid.html',
    });

    formlyConfig.setType({
        name: 'pnInput',
        templateUrl: 'Traceability-Form/field_templates/pn-input.html',
    });

    formlyConfig.setType({
        name: 'mytaskcrud',
        templateUrl: 'Traceability-Form/nav/my.task.crud.html',
    });
    //
    // var pnSelect = "" +
    // '<ui-select ng-model="model[options.key]" class="form-control" id="myinput" theme="select2">' +
    // '<ui-select-match placeholder="{{to.placeholder}}">{{$select.selected[to.labelProp]}}</ui-select-match>' +
    // '<ui-select-choices group-by="\'category\' "data-repeat="{{to.ngOptions}}" position="down">'  +
    // '<span ng-bind-html="option[to.labelProp] | highlight: $select.search"></span>' +
    // '</ui-select-choices>' +
    // '</ui-select>';
    //
    var myremoveslider = ""
    // '<div ng-if="!model[options.key]"><a my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]">Select all</a></div>'
    // '<my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]" />cat'
    +'<rzslider rz-slider-always-show-bar="true" rz-slider-model="model[options.key]" rz-slider-floor="0" rz-slider-ceil="max"></rzslider>'

    // '<div ng-if="!!model[options.key]">{{model[options.key].length}}items selected</a></div></div>'
    formlyConfig.setType({
        name: 'myremoveslider',
        template: myremoveslider,
    });

    var selectallwaste = ""
    // '<div ng-if="!model[options.key]"><a my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]">Select all</a></div>'
    // '<my-select-all-button mydata="{{to.options}}" ng-model="model[option.key]" />cat'
    +'<div ng-if="to.options.length != 1">Are you sure you want to {{to.label}} the following {{to.options.length}} items for destruction?</div>'
    +'<ul class="list-group"><li class="list-group-item" ng-repeat="option in to.options">{{option[to.labelProp]}}</li></ul>'
    // '<div ng-if="!!model[options.key]">{{model[options.key].length}}items selected</a></div></div>'
    formlyConfig.setType({
        name: 'selectallwaste',
        template: selectallwaste,
    });


    var mydatetime = ""
    +'<input placeholder="{{to.placeholder}}" ng-model="model[options.key]" my-date-time-selector class="form-control" />'
    formlyConfig.setType({
        name: 'mydatetime',
        template: mydatetime,
    });


    formlyConfig.setType({
        name: 'pn-input',
        // extends: 'input',
        templateUrl: '/Traceability-Form/field_templates/pn-input.html'
    });
    //
    // formlyConfig.setType({
    //     name: 'pnInput',
    //     // extends: 'input',
    //     templateUrl: '/Traceability-Form/field_templates/pn-input.html'
    // });
    //
    formlyConfig.setType({
        name: 'myquantity',
        templateUrl: '/Traceability-Form/field_templates/pn-input.html'
    });

    var myquantitywithpercent = '';
    // myquantitywithpercent += '<div class="input-group"><input placeholder="{{to.placeholder}}" ng-change="updatepercent()" type="text" ng-model="model[options.key]" class="form-control">';
    // myquantitywithpercent += '<span class="input-group-addon">g</span><span ng-show="!!percent" class="input-group-addon">({{percent}})</span></div>';
    formlyConfig.setType({
        name: 'myquantitywithpercent',
        templateUrl: '/Traceability-Form/field_templates/pn-input.html'
    });

    var w = ''
        +'<div class="container pn-field-card" layout-padding><center><input-container>'
        +'<formly-transclude></formly-transclude>'
        +'<label>{{to.label}}</label></input-container></center></div>'
    formlyConfig.setWrapper({
        types:
        [
            'myquantity',
            // 'pnInput',
            // 'pn-select',
            'pn-input',
            // 'pn-select-inventory-item',
            'mydatetime',
            // 'mymultipleselectwithselectall',
            'myquantitywithpercent',
        ],
        template: w
    });
    var g = ''
        +'<div class="container pn-field-card" layout-padding><center><input-container>'
        +'<formly-transclude></formly-transclude>'
        +'</input-container></center></div>'
    formlyConfig.setWrapper({
        types:
        [
            'pn-select',
            'pn-select-inventory-item',
            'mymultipleselect',
            'pn-select-vendor'
        ],
        template: g
    });
});

})();
