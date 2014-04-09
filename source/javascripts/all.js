function GmailGridView($scope) {

    $scope.featuredImageCss = "background-image: url('images/featured-image.png');";
    $scope.googlePlusImageUrl = 'images/sender-image.png';
    $scope.selected = 'form';

    var onGooglePlusSuccess = function(data) {
        if ( data.error ) {

        } else {
            console.log(data)
            console.log(data.displayName);
            console.log(data.image.url);
            $scope.googlePlusImageUrl = data.image.url;                    
        }
    };
    $scope.setFeaturedImage = function() {
        $scope.featuredImageCss =  "background-image: url('"+ $scope.featuredImage +"');";
    },
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
