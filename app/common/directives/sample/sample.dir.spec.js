describe('Directive: Sample', function () {

    var $compile;
    var $scope;
    var element;

    beforeEach(function () {
        angular.mock.module('app');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });

        element = $compile('<sample-dir></sample-dir>')($scope);
        $scope.$digest();
    });

    describe('render directive', function () {
        it('should create the element', function () {
            expect(element).toBeDefined();
        });

        it('should have sample text in element', function () {
            expect(element.html()).toContain('This is a sample directive');
        });
    });
});
