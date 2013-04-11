$(function(){
	$(window).scroll(windowScroll);
	$(".nav-link").click(function(){ 
		navigateTo($(this).attr("destination"));
		return false;
	});
});

function navigateTo(destination) {
	var navBarHeight = 0;
	if($(".navigation-bar")) {
		navBarHeight = $(".navigation-bar").height();
	}
	$('html,body').animate({scrollTop: $(destination).offset().top - navBarHeight},'slow');
}

/*
 * Fix navigation bar to top
 */
function windowScroll() {
	var scrollTolerance = 1;
	var pixelsDown = $(window).scrollTop();
	
	/* Calculate Nav Bar Height */
	var navBarHeight = 0;
	if($(".navigation-bar")) {
		navBarHeight = $(".navigation-bar").height();
	}
	
	/* Navigation Bar */
	if(pixelsDown > $(".section0-section").height() - scrollTolerance) {
		$(".navigation-bar").addClass("navigation-bar-fixed");
		$(".main").css("padding-top", navBarHeight + "px");
	}
	else {
		$(".navigation-bar").removeClass("navigation-bar-fixed");
		$(".main").css("padding-top", "0px");
	}
	
	/* Highlighted Nav */
	if($(window).scrollTop() + $(window).height() == $(document).height()) { highlightNavLink("#section4-link"); }
	else if (pixelsDown > $(".section4-section").offset().top - navBarHeight - scrollTolerance) { highlightNavLink("#section4-link"); }
	else if (pixelsDown > $(".section3-section").offset().top - navBarHeight - scrollTolerance) { highlightNavLink("#section3-link"); }
	else if (pixelsDown > $(".section2-section").offset().top - navBarHeight - scrollTolerance) { highlightNavLink("#section2-link"); }
	else if(pixelsDown > $(".section1-section").offset().top - navBarHeight - scrollTolerance) { highlightNavLink("#section1-link"); }
	else { highlightNavLink("#"); }
	
	// DEBUG CODE
	// $("#scroll").html($(window).scrollTop() + " / " + $(window).height() + " / " + $(document).height());
}

function highlightNavLink(id) {
	$(".nav-links a").removeClass("nav-selected");
	$(id).addClass("nav-selected");
}

