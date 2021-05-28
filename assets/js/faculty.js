$num = $('.my-card').length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $('.my-card:nth-child(' + $even + ')').addClass('active1');
  $('.my-card:nth-child(' + $even + ')').prev().addClass('prev1');
  $('.my-card:nth-child(' + $even + ')').next().addClass('next1');
} else {
  $('.my-card:nth-child(' + $odd + ')').addClass('active1');
  $('.my-card:nth-child(' + $odd + ')').prev().addClass('prev1');
  $('.my-card:nth-child(' + $odd + ')').next().addClass('next1');
}

$('.my-card').click(function() {
  $slide = $('.active1').width();
  console.log($('.active1').position().left);
  
  if ($(this).hasClass('next1')) {
    $('.card-carousel').stop(false, true).animate({left: '-=' + $slide});
  } else if ($(this).hasClass('prev1')) {
    $('.card-carousel').stop(false, true).animate({left: '+=' + $slide});
  }
  
  $(this).removeClass('prev1 next1');
  $(this).siblings().removeClass('prev1 active1 next1');
  
  $(this).addClass('active1');
  $(this).prev().addClass('prev1');
  $(this).next().addClass('next1');
});


// Keyboard nav
$('html body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    $('.active1').prev().trigger('click');
  }
  else if (e.keyCode == 39) { // right
    $('.active1').next().trigger('click');
  }
});