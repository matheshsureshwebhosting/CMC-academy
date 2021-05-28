$(document).ready(function() {
	// Gets the video src from the data-src on each button
	var $videoSrc;
	$(".video-btn").click(function() {
	  $videoSrc = $(this).attr("data-src");
	  console.log("button clicked" + $videoSrc);
	});
  
	// when the modal is opened autoplay it
	$("#videoModal").on("shown.bs.modal", function(e) {
	  console.log("modal opened" + $videoSrc);
	  // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
	  $("#video").attr(
		"src",
		$videoSrc + "?autoplay=1&showinfo=0&modestbranding=1&rel=0&mute=1"
	  );
	});
  
	// stop playing the youtube video when I close the modal
	$("#videoModal").on("hide.bs.modal", function(e) {
	  // a poor man's stop video
	  $("#video").attr("src", $videoSrc);
	});
  
	// document ready
  });
  

(function($) {

	"use strict";


	var carousel = function() {
		$('.featured-carousel').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:30,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: true,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      300:{
	        items:1
	      },
	      900:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
		});

	};
	carousel();

})(jQuery);