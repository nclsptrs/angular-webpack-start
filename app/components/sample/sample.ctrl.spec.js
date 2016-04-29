var ctrl = require('./sample.ctrl.js');

describe('Controller: SampleController', function () {
    var vm;
    var sampleService;
    var $rootScope;

    beforeEach(function () {
        angular.mock.module('app');

        sampleService = {};

        inject(function ($q, $controller, _$rootScope_) {
            $rootScope = _$rootScope_;

            sampleService.getData = function () {
                var data = {
                    names: [
                        {
                            firstName: 'firstName1',
                            lastName: 'lastName1',
                        },
                        {
                            firstName: 'firstName2',
                            lastName: 'lastName2',
                        },
                    ],
                };

                var defer = $q.defer();
                defer.resolve(data);
                return defer.promise;
            };

            spyOn(sampleService, 'getData').and.callThrough();

            vm = $controller(ctrl, {
                sampleService: sampleService,
            });
        });
    });

    it('vm.name should be defined', function () {
        expect(vm).toBeDefined();
        expect(vm.name).toBe('SampleController');
    });


    it('vm.getData should return data', function () {
        expect(vm.names.length).toBe(0);
        vm.getData();
        expect(sampleService.getData).toHaveBeenCalled();
        $rootScope.$digest();
        expect(vm.names.length).toBe(2);
    });
});
