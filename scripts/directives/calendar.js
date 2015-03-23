'use strict';

angular.module('calendarApp').directive('calendar', ['$window', '$timeout', function ($window, $timeout) {
    return {
        restrict: 'C',
        link: function (scope, element, params) {

            const weekN = 6;
            var calendarViewport = element[0].getElementsByClassName('calendar__viewport')[0];
            var trHeight = 0;

            var lastScrollTop = calendarViewport.scrollTop;
            calendarViewport.onscroll = function (event) {
                var scrollTop = calendarViewport.scrollTop;
                if( lastScrollTop > scrollTop ) {
                    // up
                    if( scrollTop < trHeight / 2 ) {
                        $timeout(function () {
                            scope.unshiftWeek();
                            scope.weeks.pop();
                            calendarViewport.scrollTop += trHeight;
                        });
                    }
                    console.log('up', scrollTop, trHeight);
                } else {
                    // down
                    if( scrollTop > 1.5 * trHeight ) {
                        $timeout(function () {
                            scope.pushWeek();
                            scope.weeks.shift();
                            calendarViewport.scrollTop -= trHeight;
                        });
                    }
                    console.log('down', scrollTop, trHeight);
                }
                lastScrollTop = scrollTop;
            };

            // on window resize
            $window.onresize = function () {
                $timeout(function () {
                    trHeight = (calendarViewport.clientHeight + weekN / 2) / weekN;
                    scope.trHeight = trHeight;
                });
            };
            $window.onresize();

            $timeout(function(){calendarViewport.scrollTop = trHeight;});


        }
    };
}]);
