var SCROLL_TOLERANCE = 1;

$(function(){
	$(window).scroll(windowScroll);
	$(".nav-link").click(function(){ 
		navigateTo($(this).attr("destination"));
		return false;
	});
});

function windowScroll() {
	var pixelsDown = $(window).scrollTop();
		
	checkForFixNavBar();
	checkForHighlightNavLink();
	
	// DEBUG CODE
	// $("#scroll").html($(window).scrollTop() + " / " + $(window).height() + " / " + $(document).height());
}

function navigateTo(destination) {
	$('html,body').animate({scrollTop: $(destination).offset().top - navBarHeight()},'slow');
}



function checkForFixNavBar() {
	/* Navigation Bar */
	if($(window).scrollTop() > $(".section0-section").height() - SCROLL_TOLERANCE) {
		$(".navigation-bar").addClass("navigation-bar-fixed");
		$(".main").css("padding-top", navBarHeight() + "px");
	}
	else {
		$(".navigation-bar").removeClass("navigation-bar-fixed");
		$(".main").css("padding-top", "0px");
	}	
}

function checkForHighlightNavLink() {
	if($(window).scrollTop() + $(window).height() == $(document).height()) { highlightNavLink("#section4-link"); }
	else if ($(window).scrollTop() > $(".section4-section").offset().top - navBarHeight() - SCROLL_TOLERANCE) { highlightNavLink("#section4-link"); }
	else if ($(window).scrollTop() > $(".section3-section").offset().top - navBarHeight() - SCROLL_TOLERANCE) { highlightNavLink("#section3-link"); }
	else if ($(window).scrollTop() > $(".section2-section").offset().top - navBarHeight() - SCROLL_TOLERANCE) { highlightNavLink("#section2-link"); }
	else if($(window).scrollTop() > $(".section1-section").offset().top - navBarHeight() - SCROLL_TOLERANCE) { highlightNavLink("#section1-link"); }
	else { highlightNavLink("#"); }
}

function highlightNavLink(id) {
	$(".nav-links a").removeClass("nav-selected");
	$(id).addClass("nav-selected");
}

function navBarHeight() {
	var navBarHeight = 0;
	if($(".navigation-bar")) {
		navBarHeight = $(".navigation-bar").height();
	}
	return navBarHeight;
}

