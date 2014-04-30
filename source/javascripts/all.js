(function() {

    function FormController($scope, $location, $http) {
        var params = $location.search();

        angular.extend($scope, {
            selected: 'form',
            featuredImageCss: "background-image: url('images/featured-image.png');",
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
                $scope.featuredImageCss = "background-image: url('images/featured-image.png');";
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
                when("/", { 
                    controller: "FormController", 
                    templateUrl: "form.html"
                });
        }])
        .controller('FormController', ['$scope', '$location', '$http', FormController]);
    
    // Newsletter Signup
    var DEG = {};

    DEG.subscribe = {
        form: null,

        init: function () {

            this.form = $(".stayintouch form");

            if(this.form.length == 0)
                return;

            var self = this;
            this.form.submit(function() { self.submit(); return false; })
        },

        submit: function() {
            var url = this.form.attr("action");
            var data = this.form.serialize();

            var self = this;

            $.ajax({
              type: 'POST',
              url: url,
              data: data,
              success: function() { self.onSuccess(); },
              error: function() { self.onSuccess(); }
            });
        },

        onSuccess: function() {
            $('.success').hide();
            $('<p class=\'success\' style=\'margin: 10px 0 0;\'>Thanks! Your code is on the way!</p>').hide().insertAfter(this.form.find("#the-code")).fadeIn('slow');

            this.form.find("#sign-up-form input, .receiveEmails").hide();
            $('<p class=\'success\'>Thanks!</p>').hide().insertBefore(this.form.find("#sign-up-form")).fadeIn('slow');
        }

    };

    DEG.subscribe.init();

})();
