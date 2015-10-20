/**
 * Created by liekkas on 15/10/17.
 */
(function (app) {
    'use strict';

    var defaultSettings = {
        leftIcon: 'ion-ios-gear-outline',
        rightIcon: 'ion-chevron-right'
    };

    app.directive('zIonItem', function () {
        return {
            restrict: 'E',
            scope: {
                state:'@',
                leftText:'@',  //左侧文字
                rightText:'@', //右侧文字
                leftIcon:'@', //左侧ion图标名称
                rightIcon:'@', //右侧ion图标名称
                showRightIcon:'@' //是否呈现右侧图标
            },
            template: [
                '<a class="temp-main" ui-sref="{{state}}">',
                '   <i class="temp-left-icon" style="font-size: 16px;"></i>',
                '   {{leftText}}',
                '   <span class="item-note">{{rightText}}</span>',
                '   <i class="temp-right-icon" style="font-size: 14px;"></i>',
                '</a>'
            ].join('\n'),

            compile: function(element, attr) {

                var leftIcon = attr.leftIcon || defaultSettings.leftIcon;
                var rightIcon = attr.rightIcon || defaultSettings.rightIcon;
                var showRightIcon = attr.showRightIcon || 'true';

                var iLeft = element[0].querySelector('.temp-left-icon');
                iLeft.className = 'icon ' + leftIcon;

                var iMain = element[0].querySelector('.temp-main');
                var iRight = element[0].querySelector('.temp-right-icon');
                if(showRightIcon === 'true'){
                    iMain.className = 'item item-icon-left item-icon-right';
                    iRight.className = 'icon ' + rightIcon + ' half-opacity';
                }else{
                    iMain.className = 'item item-icon-left';
                    iRight.remove();
                }

                var cleanUp = function() {
                    ionic.off('$destroy', cleanUp, element[0]);
                };

                ionic.on('$destroy', cleanUp, element[0]);
            }
        }
    });

})(angular.module(APP_NAME));