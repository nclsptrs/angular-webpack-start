module.exports =
/*@ngInject*/
function ($log, sampleService) {
    var vm = this;

    vm.name = 'SampleController';
    vm.names = [];

    vm.getData = getData;

    //////////

    function getData() {
        sampleService.getData()
        .then(function (result) {
            vm.names = result.names;
        });
    }
};
