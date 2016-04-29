describe('Service: sampleService', function () {

    var $httpBackend;
    var sampleService;

    beforeEach(function () {
        angular.mock.module('app');

        inject(function (_sampleService_, _$httpBackend_) {
            sampleService = _sampleService_;
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('sample unit test', function () {
        var result = 1 + 1;
        expect(result).toEqual(2);
    });

    it('getName should return sampleService', function () {
        expect(sampleService.getName).toBeDefined();
        expect(sampleService.getName()).toEqual('sampleService');
    });

    it('getData should return data', function () {
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

        expect(sampleService.getData).toBeDefined();

        $httpBackend.whenGET('assets/data/sample.json').respond(200, data);

        sampleService.getData().then(function (result) {
            expect(result.names.length).toBe(2);
        });

        $httpBackend.flush();
    });
});
