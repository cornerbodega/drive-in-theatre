angular
.module('countryApp')
.factory('FormConfirmAndSubmit', [ 'pnData','$mdDialog','ConnectService', FormConfirmAndSubmit ])
function FormConfirmAndSubmit(pnData, $mdDialog, ConnectService){
    return {
        showDialog: showDialog

    }
    // function showconfirmationdialog ($event, data, success) {
    //     successfunction = success;
    //     showdialog($event, data);
    // }
    function showDialog ($event, data) { // TODO: put this in its own service
        var parentelement = angular.element(document.body);
        console.log('data');
        console.log(data);
        $mdDialog.show({
            parent: parentelement,
            targetEvent: $event,
            // scope: $scope,
            template:  '<md-dialog aria-label="List dialog">' +
            '  <md-dialog-content>'+
            '    <h4>Confirm:</h4><h5> '+
            //    getconfirmation(data) +
            '  The WSCLB Traceability System will receive the following update:</h5>'  +
            ' <pre>{{inputmodel | json}}</pre>' +
            '  </md-dialog-content>' +
            '  <div class="md-tasks">' +
            '    <md-button ng-click="confirm.submit()" class="md-primary">' +
            '      Confirm' +
            '    </md-button>' +
            '    <md-button ng-click="confirm.cancel()" class="md-warn">' +
            '      Cancel' +
            '    </md-button>' +
            '  </div></md-dialog-content>' +
            '</md-dialog>',
            locals: {
                inputmodel:  data
            },
            controller: DialogController
        }); // end show
    }
    function DialogController (scope, $mdDialog, inputmodel) {
        // scope.myinputmodel = data;

        // console.glog(items);
        // scope.inputmodel = inputmodel.formmodel;
        // scope.taskmodel = inputmodel.taskmodel;
        scope.inputmodel = inputmodel;
        console.log(scope);
        console.log(scope.inputmodel);
        scope.confirm = {}
        scope.confirm.cancel = function () {

            $mdDialog.hide();
        }
        scope.confirm.submit = function () {
            // if (scope.taskmodel.task = "schedule_zeros_for_destruction") {
            //    reformattedrequest = reformatrequest(scope.taskmodel.task, scope.inputmodel)
            // }
            //    if (reformattedrequest.sendrequest) {
            // execute();
            ConnectService.post(scope.inputmodel, f, s);

            $mdDialog.hide();
        }

    }

    function s (res) {
        console.log("Enormous Success! " + res);
        // Data.reload = true
        // DynamicStaticDataService.refreshPromise()
        // DynamicStaticDataService.refreshAll()
        pnData.refresh()

        var parentelement = angular.element(document.body);
        console.log(res);
        $mdDialog.show({
            parent: parentelement,
            //targetEvent: $event,
            // scope: $scope,
            template:  '<md-dialog aria-label="List dialog">' +
            '  <md-dialog-content>'+
            '    <h4>Success!</h4><h5>WSCLB Traceability Says:</h5>' +
            '<pre>{{res | json}}</pre>' +
            ' <md-button ng-click="ok()" class="md-primary">' +
            ' Ok' +
            ' </md-button></md-dialog-content></md-dialog>',
            locals: {
                result:  res
            },
            controller: SuccessController,
            clickOutsideToClose:true
        }); // end show
        function SuccessController (scope, $mdDialog, result) {
            // scope.myinputmodel = data;
            scope.res = result
            // console.glog(items);
            scope.ok = function () {
                // $location.path('/traceability');

                // successfunction();
                $mdDialog.hide();
            }
        }
    }

    function f (res) {
        console.log("Error! + " + res.error);
        alert = $mdDialog.alert({
            title: 'Error',
            content: res.error,
            ok: 'Close',
            clickOutsideToClose:true
        });
        $mdDialog
        .show( alert )
        .finally(function() {
            alert = undefined;
        });
    }
}
