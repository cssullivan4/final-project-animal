angular.module('volunteerApp.controllers', [])
.controller('WelcomeController', ['$scope', 'SEOService', '$location', 'UserService', function($scope, SEOService, $location, UserService) {
    UserService.me().then(function() {
        // redirect();
    });

    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            // redirect();
            $location.path('/animals');
        }, function(err) {
            console.log(err);
        });
    }

    // function redirect() {
    //     var dest = $location.search().dest;
    //     if (!dest) {
    //         dest = '/';
    //     }
    //     $location.replace().path().search('dest', null);
    // }

    SEOService.setSEO({
        title: 'Welcome',
        url: $location.url(),
        description: 'McKamey Animal Shelter Volunteer Portal'
    })

    $scope.animals = function() {
        $location.path('/animal_list');
    }
}])
// .controller('NavToggle', ['$scope', '$routeParams', '$location', function($scope, $routeParams, $location) {
//     if $location.url() === 
// }])
// WORK W WILL TO CREATE CONTROLLERS TOGGLING PUBLIC NAV & PRIVATE (USER) NAV
.controller('IndexController', ['$scope', function($scope) {
    // $('.').click(function() {
    $(this).toggleClass('myclass');
    $(this).toggleClass('showhidenew');
;
}])
.controller('AnimalsController', ['$scope', 'Animal', 'UserService', 'SEOService', '$location', function($scope, Animal, UserService, SEOService, $location) {
    $scope.animals = Animal.query();
    UserService.me()
    .then(function(success){
        $scope.user = success;
    }); 

    SEOService.setSEO({
            title: 'Adoptable',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer Portal'
        })
}])
.controller('SingleAnimalController', ['$scope', 'Animal', 'UserService', 'SEOService', '$location', '$routeParams', function($scope, Animal, UserService, SEOService, $location, $routeParams) {
    $scope.animal = Animal.get({id : $routeParams.id});
    UserService.me()
    .then(function(success) {
        $scope.user = success;
    });

    $scope.deleteAnimal = function() {
        if(confirm('Are you sure you want to delete ' + $scope.animal.name + '?')) {
            $scope.animal.$delete(function(success) {
                $location.replace().path('/animals');
            }, function(err) {
                console.log(err);
            });
        }
    };

    SEOService.setSEO({
            title: 'Adoptable',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer Portal'
        })
}])
.controller('AnimalUpdateController', ['$scope', 'Animal', 'UserService', 'SEOService', '$location', '$routeParams', function($scope, Animal, UserService, SEOService, $location, $routeParams) {
    UserService.isAdmin();
    $scope.animal = Animal.get({ id: $routeParams.id });

    $scope.updateAnimal = function() {
        $scope.animal.$update(function(success) {
            $location.path('/animals/' + $routeParams.id);
        }, function(err) {
            console.log(err);
        });
    };

    $scope.deleteAnimal = function() {
        if(confirm('Are you sure you want to delete ' + $scope.animal.name + '?')) {
            $scope.animal.$delete(function(success) {
                $location.replace().path('/animals');
            }, function(err) {
                console.log(err);
            });
        }
    };

    SEOService.setSEO({
            title: 'Edit Animal',
            url: $location.url(),
            description: 'McKamey Animal Shelter Animal List'
        })
}])
.controller('AddAnimalController', ['$scope', 'Animal', 'SEOService', '$location', function($scope, Animal, SEOService, $location) {
    $scope.animals = Animal.query();

    $scope.saveAnimal = function() {
        var payload = {
            name: $scope.name,
            age: $scope.age,
            gender: $scope.gender,
            species: $scope.species,
            breed: $scope.breed,
            size: $scope.size,
            shelterid: $scope.shelterid,
            imageurl: $scope.imageurl,
            bio: $scope.bio
        };

        var a = new Animal(payload);

        a.$save(function(success) {
            $location.path('/animals');
        }, function(err) {
            console.log(err);
        });
    }

    SEOService.setSEO({
            title: 'Add A New Animal',
            url: $location.url(),
            description: 'McKamey Animal Shelter Animal List'
        })
}])
.controller('UserListController', ['$scope', 'User', 'UserService', 'SEOService', '$location', function($scope, User, UserService, SEOService, $location) {
    UserService.isAdmin();
    $scope.users = User.query();

    $scope.saveUser = function() {
        var payload = {
            email: $scope.email,
            password: $scope.password,
            firstname: $scope.firstname,
            lastname: $scope.lastname
        };

        var u = new User(payload);

        u.$save(function(success) {
            $scope.email = '';
            $scope.password = '';
            $scope.firstname = '';
            $scope.lastname = '';
            $scope.users = User.query();
        }, function(err) {
            console.log(err);
        });
    }

    SEOService.setSEO({
            title: 'Current Volunteers',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer List'
        })
}])
.controller('SingleUserController', ['$scope', 'User', 'UserService', 'SEOService', '$location', '$routeParams', function($scope, User, UserService, SEOService, $location, $routeParams) {
    UserService.isAdmin();
    $scope.user = User.get({ id: $routeParams.id });

    $scope.deleteUser = function() {
        if(confirm('Are you sure you want to delete ' + $scope.user.firstname + ' ' + $scope.user.lastname + '?')) {
            $scope.user.$delete(function(success) {
                $location.replace().path('/users');
            }, function(err) {
                console.log(err);
            });
        }
    };

    SEOService.setSEO({
            title: 'Current Volunteers',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer List'
        })
}])
.controller('UserUpdateController', ['$scope', 'User', 'UserService', 'SEOService', '$location', '$routeParams', function($scope, User, UserService, SEOService, $location, $routeParams) {
    UserService.isAdmin();
    $scope.user = User.get({ id: $routeParams.id });

    $scope.updateUser = function() {
        $scope.user.$update(function(success) {
            $location.path('/users/' + $routeParams.id);
        }, function(err) {
            console.log(err);
        });
    };

    SEOService.setSEO({
            title: 'Current Volunteers',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer List'
        })
}])
.controller('DonationController', ['$scope', 'SEOService', 'Donation', '$location', function($scope, SEOService, Donation, $location) {
    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-field');

    $scope.errorMessage = '';

    $scope.processDonation = function() {
        stripe.createToken(card, {
            name: $scope.fullname,
            address_line1: $scope.line1,
            address_line2: $scope.line2,
            address_city: $scope.city,
            address_state: $scope.state
        }).then(function(result) {
            if (result.error) {
                $scope.errorMessage = result.error.message;
            } else {
                var d = new Donation({
                    token: result.token.id,
                    amount: $scope.amount
                });
                d.$save(function() {
                    alert('Thank you for your donation!');
                    $location.path('/');
                }, function(err) {
                    console.log(err);
                });
            }
        });
    }

    SEOService.setSEO({
            title: 'Donate',
            url: $location.url(),
            description: 'Help Out The McKamey Animal Shelter'
        })
}])
.controller('LogoutController', ['$scope', 'UserService', 'SEOService', '$location', function($scope, UserService, SEOService, $location) {
    UserService.logout()
    .then(function(success){
        $location.path('/');
    }); 

    SEOService.setSEO({
            title: 'Logging Out',
            url: $location.url(),
            description: 'McKamey Animal Shelter Volunteer Portal'
        })
}]);

// .controller('NavController', ['$scope', '$location', function($scope, $location) {
//     if(localStorage.items === undefined) 
//         localStorage.items = angular.toJson([]);
//     $scope.cartTotal = angular.fromJson(localStorage.items).length;
//     $scope.$on("cartChanged", function() {
//         $scope.cartTotal = angular.fromJson(localStorage.items).length;
//     })
//     $scope.$on("purchase", function() {
//         $scope.cartTotal = 0;
//     })
