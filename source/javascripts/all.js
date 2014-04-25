function GmailGridView($scope) {

    $scope.featuredImageCss = "background-image: url('images/featured-image.png');";
    $scope.selected = 'form';

    var onGooglePlusSuccess = function(data) {
        if ( data.error ) {

        } else {
            $scope.googlePlusImageUrl = data.image.url;                    
        }
    };
    $scope.setFeaturedImage = function() {
        if ($scope.gridForm.featuredImage.$valid && $scope.featuredImage) {
            $scope.featuredImageCss =  "background-image: url('"+ $scope.featuredImage +"');";
        } else {
            $scope.featuredImageCss = "background-image: url('images/featured-image.png');";
        }
    };
    $scope.fetchGooglePlusData = function() {
        var url = $scope.googlePlus.split('+');
        var username = url[1];
        var apiUrl = 'https://www.googleapis.com/plus/v1/people/+' + username + '?key=AIzaSyBXM_nPfCNIDkirN6SAXnDQ78sn7dlrN9Y';

        $.ajax({
            url: apiUrl,
            dataType: 'jsonp',
            success: onGooglePlusSuccess
        })
    }
}

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
        this.form.find(".field input, .receiveEmails").hide();
        $('<p>Thanks!</p>').hide().insertBefore(this.form.find(".field")).fadeIn('slow');
    }

};
$(document).ready(function () {
    DEG.subscribe.init();
    $('#grid-view-select').click(function(e) {
        e.preventDefault();
        $('#grid-view').toggleClass('selected');
    });  
    $('#grid-view-favorite').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });  
});