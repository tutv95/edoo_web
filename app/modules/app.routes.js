(function () {
    'use strict';

    angular
        .module('app.routes', ['ui.router'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .when('/', '/welcome')
            .otherwise('/');

        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'templates/pages/welcome.html',
                controller: 'WelcomeController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'templates/pages/about.html',
                controller: 'AboutPageController'
            })
            .state('support', {
                url: '/support',
                templateUrl: 'templates/pages/contact.html',
                controller: 'ContactPageController',
                controllerAs: 'ContactPageCtrl'
            })
            .state('login', {
                url: '/login?email',
                templateUrl: 'templates/accounts/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/accounts/register.html',
                controller: 'RegisterController',
                controllerAs: 'registerCtrl'
            })
            .state('forgetPass', {
                url: '/forget-password',
                templateUrl: 'templates/accounts/forget-password.html',
                controller: 'ForgetPasswordController',
                controllerAs: 'forgetPassCtrl'
            })
            .state('newPass', {
                url: '/reset-pass/{token}',
                templateUrl: 'templates/accounts/new-password.html',
                controller: 'NewPasswordController',
                controllerAs: 'newPassCtrl'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'templates/accounts/logout.html',
                controller: 'LogoutController',
                controllerAs: 'logoutCtrl'
            })
            .state('class', {
                url: '/class',
                templateUrl: 'templates/classes/list-class.html',
                controller: 'ClassIndexController',
                controllerAs: 'classCtrl'
            })
            .state('posts', {
                url: '/class',
                views: {
                    '': {
                        templateUrl: 'templates/layouts/master.html'
                    },
                    'sidebar@posts': {
                        templateUrl: 'templates/posts/sidebar.html',
                        controller: 'SidebarController',
                        controllerAs: 'sidebarCtrl'
                    }
                }
            })
            .state('posts.list', {
                url: '/{classId}?page',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/list-post.html',
                        controller: 'ListPostsController',
                        controllerAs: 'postsCtrl'
                    },
                    'sidebarClass@posts': {
                        templateUrl: 'templates/posts/sidebar-class.html',
                        controller: 'SidebarClassController',
                        controllerAs: 'sidebarClassCtrl'
                    }
                }
            })
            .state('posts.list.detail', {
                url: '/post/{postId}',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/details.html',
                        controller: 'PostDetailsController',
                        controllerAs: 'postCtrl'
                    }
                }
            })
            .state('posts.list.create', {
                url: '/create',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/create.html',
                        controller: 'CreatePostController',
                        controllerAs: 'createPostCtrl'
                    }
                }
            })
            .state('posts.list.edit', {
                url: '/edit/{postId}',
                views: {
                    'content@posts': {
                        templateUrl: 'templates/posts/edit.html',
                        controller: 'EditPostController',
                        controllerAs: 'editPostCtrl'
                    }
                }
            })
            .state('accounts', {
                views: {
                    '': {
                        templateUrl: 'templates/layouts/master.html'
                    },
                    'sidebar@accounts': {
                        templateUrl: 'templates/accounts/sidebar.html',
                        controller: 'SidebarAccountController',
                        controllerAs: 'sidebarAccountCtrl'
                    }
                }
            })
            .state('accounts.profile', {
                url: '/profile',
                views: {
                    'content@accounts': {
                        templateUrl: 'templates/accounts/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'profileCtrl'
                    }
                }
            })
            .state('accounts.changePassword', {
                url: '/change-password',
                views: {
                    'content@accounts': {
                        templateUrl: 'templates/accounts/change-password.html',
                        controller: 'ChangePasswordController',
                        controllerAs: 'changePassCtrl'
                    }
                }
            })
    }
})();