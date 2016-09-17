(function () {
    'use strict';

    angular.module('app.core')
        .controller('LoginController', function ($http, $rootScope, $location, $state, localStorageService, PageValues, AccountService, NotificationService) {
            var mv = this;

            PageValues.title = 'Đăng nhập';

            mv.signIn = signIn;
            mv.email = '';
            mv.password = '';

            var token = localStorageService.get('user_token');

            if (token) {
                return $state.go('welcome');
            }

            function signIn() {
                AccountService.login(mv.email, mv.password).then(
                    function (response) {
                        $rootScope.$emit('loginSuccess', response);
                        $state.go('class');
                        NotificationService.success('Xin chào ' + response.data.user.name + '!');
                    },
                    function (error) {
                        mv.password = '';
                        NotificationService.error(error.data.message);
                    }
                );
            }
        });
})();