(function() {
    function FormController($scope, $location, $http) {
        var params = $location.search();

        angular.extend($scope, {
            selected: params['selected'] || 'form',
            featuredImageCss: "background-image: url('http://e.DEGdigital.com/l/18892/2014-05-05/bvx3r/18892/77132/featured_image.png');",
            featuredImage: params['featuredImage'],
            googlePlus: params['googlePlus'],
            companyName: params['companyName'],
            companyUrl: params['companyUrl'],
            subject: params['subject']
        })

        var onGooglePlusSuccess = function(data) {
            if ( !data.error )
                $scope.googlePlusImageUrl = data.image.url;
        };

        $scope.setFeaturedImage = function() {
            if ($scope.gridForm.featuredImage.$valid && $scope.featuredImage) {
                $scope.featuredImageCss =  "background-image: url('"+ $scope.featuredImage +"');";
            } else {
                $scope.featuredImageCss = "background-image: url('http://e.DEGdigital.com/l/18892/2014-05-05/bvx3r/18892/77132/featured_image.png');";
            }
        };
        $scope.fetchGooglePlusData = function() {
            if (!$scope.googlePlus)
                return;
            var urlParts = $scope.googlePlus.split('/');
            var username = urlParts[3];
            var apiUrl = 'https://www.googleapis.com/plus/v1/people/' + username + '?fields=image&key=AIzaSyBXM_nPfCNIDkirN6SAXnDQ78sn7dlrN9Y';

            $http.get(apiUrl).success(onGooglePlusSuccess);
        };

        $scope.submit = function() {
            if ( $scope.gridForm.$valid === true)
                $scope.selected = 'code';
        };

        $scope.$on('$viewContentLoaded', function readyToTrick() {
            $scope.fetchGooglePlusData();
            $scope.setFeaturedImage(true);
        });

    }

    angular.module('GmailGridView', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                otherwise({ 
                    controller: "FormController", 
                    templateUrl: "form.html"
                });
        }])
        .controller('FormController', ['$scope', '$location', '$http', FormController]);

    $("#hidden_newsletter_iframe").on("load", function(event) {
        event.preventDefault();
        $('.success, #newsletterSignup .field').hide();
        $('<p class=\'success\' style=\'margin: 10px 0 0;\'>Thanks!</p>').insertAfter('#newsletterSignup .field').fadeIn('slow');
    });

    $("#hidden_iframe").on("load", function(event) {
        console.log("asdf");
        event.preventDefault();
        $('.success').hide();
        $('<p class=\'success\' style=\'margin: 10px 0 0;\'>Thanks! Your code is on the way!</p>').insertAfter('#the-code').fadeIn('slow');
    });

    $('#grid-view-select').click(function(e) {
        e.preventDefault();
        $('#grid-view').toggleClass('selected');
    });
    $('#grid-view-favorite').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
})();
