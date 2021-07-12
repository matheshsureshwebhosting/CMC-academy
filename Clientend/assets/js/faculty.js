window.onload = async () => {
  var db = firebase.firestore();
  await db.collection("faculty").get().then((snap) => {
    snap.forEach((doc) => {
      document.getElementsByClassName("card-carousel")[0].innerHTML +=

        `
            <div class="my-card our-webcoderskull">
            <div class="cnt-block equal-hight">
              <figure><img src="${doc.data().fimage}" class="img-responsive" alt="${doc.data().fname}"></figure>
              <h5 class="mt-4">${doc.data().fname}</h5>
              <span class="pb-2">${doc.data().fposition}</span>
              <p class="m-0">${doc.data().fdescription}</p>
            </div>
            <div class="card-wave">
              <div class="wave wave1"></div>
              <div class="wave wave2"></div>
              <div class="wave wave3"></div>
              <div class="wave wave4"></div>
            </div>
          </div>
        `
    })
  })

 


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

  $('.my-card').click(function () {
    $slide = $('.active1').width();

    if ($(this).hasClass('next1')) {
      $('.card-carousel').stop(false, true).animate({ left: '-=' + $slide });
    } else if ($(this).hasClass('prev1')) {
      $('.card-carousel').stop(false, true).animate({ left: '+=' + $slide });
    }

    $(this).removeClass('prev1 next1');
    $(this).siblings().removeClass('prev1 active1 next1');

    $(this).addClass('active1');
    $(this).prev().addClass('prev1');
    $(this).next().addClass('next1');
  });


  // Keyboard nav
  $('html body').keydown(function (e) {
    if (e.keyCode == 37) { // left
      $('.active1').prev().trigger('click');
    }
    else if (e.keyCode == 39) { // right
      $('.active1').next().trigger('click');
    }
  });
}
