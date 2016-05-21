(function(){
    angular
    .module('countryApp')

    .factory('TraceabilityFormService', ['FormDataService', 'FormRequestFormatter', 'FormConfirmAndSubmit', TraceabilityFormService ])

    function TraceabilityFormService(FormDataService, FormRequestFormatter, FormConfirmAndSubmit) {
        return {
            task: function (path) {
                var p = path.split('/')
                var task = p[p.length-1];
                if (!task) return console.log('No task');
                return task
            },
            fields: function (path) {
                return FormDataService.getForm(this.task(path))
            },
            onSubmit: function ($event, path, model) {
                // console.log($event);
                // console.log(model);
                model.action = this.task(path)
                var request = FormRequestFormatter.format(model)

                FormConfirmAndSubmit.showDialog($event, request)
                console.log(JSON.stringify(request));
            }
        }
    }



})();
