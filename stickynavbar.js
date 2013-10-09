var SCROLL_TOLERANCE = 1;
var section0;
var navigationBar;
var fixedNavigationBarClass;
var navLink;
var highlightNavLinkClass;
var highlightTolerance;

function initialize() {
  SCROLL_TOLERANCE = 1;
  section0 = $(".hero-section");
  navigationBar = $(".navigation-bar");
  navLink = $(".nav-link");
  fixedNavigationBarClass = "navigation-bar-fixed";
  highlightNavLinkClass = "nav-link-highlighted";
  hightlightTolerance = 20;
}

$(function(){
  initialize();
  
	$(window).scroll(windowScroll);
	navLink.click(function(){ 
		navigateTo($(this).attr("destination"));
		return false;
	});
});

function windowScroll() {
	var pixelsDown = $(window).scrollTop();
	checkForFixNavBar();
	checkForHighlightNavLink(pixelsDown);
}

function navigateTo(destination) {
	$('html,body').animate({scrollTop: $(destination).offset().top - navBarHeight()},'slow');
}

function checkForFixNavBar() {

	var totalSection0Height = section0.height() + 
	                          parseInt(section0.css("padding-top").replace("px", "")) +
	                          parseInt(section0.css("padding-bottom").replace("px", ""));
	if($(window).scrollTop() > totalSection0Height - SCROLL_TOLERANCE) {
		navigationBar.addClass(fixedNavigationBarClass);
		$("body").css("padding-top", navBarHeight() + "px");
	}
	else {
		navigationBar.removeClass(fixedNavigationBarClass);
		$("body").css("padding-top", "0px");
	}	
}

function checkForHighlightNavLink(pixelsDown) {
  var highlightElement;
  if(pixelsDown + $(window).height() == $(document).height()) {
    highlightElement = $(navLink[navLink.length-1]);
  }
  else {
    jQuery.each(navLink, function(){
      var distanceFromTop = $($(this).attr("destination")).offset().top - pixelsDown - hightlightTolerance;
      if(distanceFromTop < navBarHeight()) {
        highlightElement = $(this);
      }
    });    
  }
  navLink.removeClass(highlightNavLinkClass);
  highlightElement.addClass(highlightNavLinkClass);
}

function highlightNavLink(id) {
	$(".nav-links a").removeClass("nav-selected");
	$(id).addClass("nav-selected");
}

function navBarHeight() {
	var navBarHeight = 0;
	if(navigationBar) {
		navBarHeight = navigationBar.height();
	}
	return navBarHeight;
}