(function () {
    'use strict';

    angular.module('app.core')
        .controller('ClassIndexController', function (StorageService, ClassService, PageValues, NotificationService) {
            this.listClass = [];
            var mv = this;

            PageValues.title = 'Tất cả các lớp môn học';

            PageValues.breadcrumbs = [];

            ClassService.getClasses().then(function (data) {
                mv.listClass = data.data.classes;
            }, function (error) {
                NotificationService.error(error.data.message);
            });
        });
})();