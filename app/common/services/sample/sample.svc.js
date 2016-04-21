module.exports =
/*@ngInject*/
function ($http) {
    this.getName = getName;
    this.getData = getData;

    function getName() {
        return 'sampleService';
    }

    function getData() {
        return $http.get('assets/data/sample.json')
        .then(function (response) {
            return response.data;
        });
    }
};
