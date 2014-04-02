$('#grid-view-select').click(function(e) {
	e.preventDefault();
	$('#grid-view').toggleClass('selected');
});
$('#grid-view-favorite').click(function(e) {
	e.preventDefault();
	$(this).toggleClass('active');
});

$('#generate').click(function(e) {
	e.preventDefault();
	if( $('#company-name').val().length > 0 ) {
        $('.grid-view-desc .from').text($("#company-name").val());
        $('#company-name-markup').text($("#company-name").val());
    }

    if( $('#company-url').val().length > 0 ) {
        $('#company-url-markup').text($("#company-url").val());
        //...make api call & replace sender image...//
    }
    else if( $('#company-url-plus').val().length <= 0 && $('#company-name').val().length > 0) {
        $('.google-icon img').replaceWith($("#company-name").val().slice(0,1));
    }

    if( $('#company-url-plus').val().length > 0 ) {
        $('#company-url-plus-markup').text($("#company-url-plus").val());
    }
    if( $('#featured-image').val().length > 0 ) {
        $('.grid-view-hero').css("backgroundImage", "url('"+$("#featured-image").val()+"')");
        $('#featured-image-markup').text($("#featured-image").val());
    }
    if( $('#subject-line').val().length > 0 ) {
        $('.grid-view-desc .subject b').text($("#subject-line").val());
    }

    $('.grid-form').hide();
    $('.microdata').show();
});
$('#modify').click(function(e) {
	e.preventDefault();
    $('.grid-form').show();
    $('.microdata').hide();
});
