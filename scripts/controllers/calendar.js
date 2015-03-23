'use strict';

angular.module('calendarApp').controller('Calendar', ['$scope', function ($scope) {

    var startWeekDay = 1;
    var msInDay = 24 * 60 * 60 * 1000;

    function getStartWeekDate (date) {
        var weekDay = date.getDay();
        var delayWeekDays = (weekDay - startWeekDay + 7) % 7;
        return new Date(date.getTime() - delayWeekDays * msInDay);
    }

    function generateWeek (dateTimestamp) {
        var week = [];
        var date = new Date(dateTimestamp);
        var startWeekDate = getStartWeekDate(date);
        var startWeekTimestamp = startWeekDate.getTime();
        for( var i = 0; i < 7; i++ ) {
            week.push(new Date(startWeekTimestamp + i * msInDay));
        }
        return week;
    }

    $scope.now = Date.now();
    $scope.weeks = [generateWeek($scope.now)];

    $scope.unshiftWeek = function () {
        var firstWeekDate = $scope.weeks[0][0];
        var prevWeek = generateWeek(firstWeekDate.getTime() - msInDay);
        $scope.weeks.unshift(prevWeek);
        //$scope.weeks.pop();
    };

    $scope.pushWeek = function () {
        var lastWeekDate = $scope.weeks[$scope.weeks.length - 1][6];
        var nextWeek = generateWeek(lastWeekDate.getTime() + msInDay);
        $scope.weeks.push(nextWeek);
        //$scope.weeks.shift();
    };

    $scope.unshiftWeek();
    $scope.unshiftWeek();
    $scope.unshiftWeek();
    $scope.pushWeek();
    $scope.pushWeek();
    $scope.pushWeek();
    $scope.pushWeek();


}]);
