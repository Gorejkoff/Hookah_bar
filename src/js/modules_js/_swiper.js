
if (document.querySelector('.about__swiper')) {
   const swiper = new Swiper('.about__swiper', {
      keyboard: {
         enabled: true,
         onlyInViewport: true,
      },
      spaceBetween: 10,
      // allowTouchMove: true,
      speed: 300,
      slidesPerView: 1.2,
      grabCursor: true,
      navigation: {
         nextEl: ".about__swiper-button-next",
         prevEl: ".about__swiper-button-prev",
      },
      breakpoints: {
         768: {
            slidesPerView: 1
         },
      },




   });
}