var SCROLL_TOLERANCE = 1;
var section0;
var navigationBar;
var fixedNavigationBarClass;
var navLink;
var highlightNavLinkClass;
var highlightTolerance;
var signedInBarHeight = 0;
var mainContainer = 0;

function initializeStickyNavBar() {
  SCROLL_TOLERANCE = 1;
  section0 = $(".hero-section");
  navigationBar = $(".navigation-bar");
  navLink = $(".nav-link");
  mainContainer = $(".main");
  fixedNavigationBarClass = "navigation-bar-fixed";
  highlightNavLinkClass = "nav-link-highlighted";
  hightlightTolerance = 20;
}

$(function(){
  initializeStickyNavBar();
  
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


	if($(".signed-in-body").length) {
		signedInBarHeight = $(".signed-in-bar").height() + parseInt($(".signed-in-bar").css("padding-top")) + parseInt($(".signed-in-bar").css("padding-top"));
	}

	if($(window).scrollTop() > totalSection0Height - SCROLL_TOLERANCE) {
		navigationBar.addClass(fixedNavigationBarClass);
		navigationBar.css("top", signedInBarHeight + "px");
		mainContainer.css("padding-top", navBarHeight() + "px");
	}
	else {
		navigationBar.removeClass(fixedNavigationBarClass);
		mainContainer.css("padding-top", "0px");
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
  if(typeof highlightElement != "undefined") {
  	highlightElement.addClass(highlightNavLinkClass);	
  }
}

function highlightNavLink(id) {
	$(".nav-links a").removeClass("nav-selected");
	$(id).addClass("nav-selected");
}

function navBarHeight() {
	var navBarHeight = 0;
	if(navigationBar) {
		navBarHeight = navigationBar.height()+ 
	                      parseInt(navigationBar.css("padding-top").replace("px", "")) +
	                      parseInt(navigationBar.css("padding-bottom").replace("px", ""));
	}
	return navBarHeight;
}