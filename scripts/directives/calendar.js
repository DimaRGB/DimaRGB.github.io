'use strict';

angular.module('calendarApp').directive('calendar', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'C',
        link: function (scope, element, params) {

            const weekN = 6;
            var calendarViewport = element[0].getElementsByClassName('calendar__viewport')[0];
            var calendarTable = element[0].getElementsByClassName('calendar__table')[0];

            var lastScrollTop = calendarViewport.scrollTop;
            calendarViewport.onscroll = function (event) {
                if( lastScrollTop > calendarViewport.scrollTop ) {
                    // up
                    console.log('up');
                } else {
                    // down
                    console.log('down');
                }
                lastScrollTop = calendarViewport.scrollTop;
            };


            // on window resize
            $window.onresize = function () {
                var tableTrs = calendarTable.getElementsByTagName('tr');
                console.log(calendarViewport.clientHeight);
                var trHeight = (calendarViewport.clientHeight + weekN / 2) / weekN;
                for( var i = 0; i < tableTrs.length; i++ ) {
                    tableTrs[i].style.height = trHeight + 'px';
                }
            };
            $timeout($window.onresize);

        }
    };
}]);
