$(function () {
  $(document).scroll(function () {
    var $nav = $(".nav");
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height()/2);
  });
  $('.nav-toggle').click(function () {
  	$('.nav-menu').toggleClass('open');
  });
  $('.notification .exit').click(function() {
  	$('.notification').toggleClass('exited');
  });
});
var slidePos = 0;
$('#phone1').hide();
$('#phone2').hide();
$('#phone3').hide();
$('#phone1').show();
slidePos = 1;
$('#feature1 .slider-info').addClass("active");
$('#feature1').click(function () {
	if(slidePos != 1) {
		$('#phone2').hide();
		$('#phone3').hide();
		$('#phone1').show();
		slidePos = 1;
		$('#feature2 .slider-info').removeClass("active");
		$('#feature3 .slider-info').removeClass("active");
		$('#feature1 .slider-info').addClass("active");
	}
});
$('#feature2').click(function () {
	if(slidePos != 2) {
		$('#phone1').hide();
		$('#phone3').hide();
		$('#phone2').show();
		slidePos = 2;
		$('#feature3 .slider-info').removeClass("active");
		$('#feature1 .slider-info').removeClass("active");
		$('#feature2 .slider-info').addClass("active");
	}
});
$('#feature3').click(function () {
	if(slidePos != 3) {
		$('#phone1').hide();
		$('#phone2').hide();
		$('#phone3').show();
		slidePos = 3;
		$('#feature1 .slider-info').removeClass("active");
		$('#feature2 .slider-info').removeClass("active");
		$('#feature3 .slider-info').addClass("active");
	}
});
