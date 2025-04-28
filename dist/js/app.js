"use strict"

// window.addEventListener('load', (event) => {});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
// const MIN768 = window.matchMedia('(min-width: 768px)');

// variables
const HEADER = document.getElementById('header');



function throttle(callee, timeout) {
   let timer = null;
   return function perform(...args) {
      if (timer) return;
      timer = setTimeout(() => {
         callee(...args);
         clearTimeout(timer);
         timer = null;
      }, timeout)
   }
}



/* запись переменных высоты элементов */
// function addHeightVariable() {
//    if (typeof HEADER !== "undefined") {
//       document.body.style.setProperty('--height-header', `${HEADER.offsetHeight}px`)
//    }
// }
// addHeightVariable();


// ** ======================= RESIZE ======================  ** //
window.addEventListener('resize', () => {
   //  addHeightVariable();
   closeHeaderMenu();
   if (MIN1024.matches) {
      initCloseModal("mobile-menu")
   }
})


// ** ======================= CLICK ======================  ** //
document.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.open-menu')) {
      openHeaderMenu()
   }
})

function openHeaderMenu() {
   document.body.classList.toggle('menu-is-open')
}
function closeHeaderMenu() {
   document.body.classList.remove('menu-is-open')
}
// перемещение блоков при адаптиве
// data-da=".class,3,768" 
// класс родителя куда перемещать
// порядковый номер в родительском блоке куда перемещается начиная с 0 как индексы массива
// ширина экрана min-width
// два перемещения: data-da=".class,3,768,.class2,1,1024"
const ARRAY_DATA_DA = document.querySelectorAll('[data-da]');
ARRAY_DATA_DA.forEach(function (e) {
   const dataArray = e.dataset.da.split(',');
   const addressMove = searchDestination(e, dataArray[0]);
   const addressMoveSecond = dataArray[3] && searchDestination(e, dataArray[3]);
   const addressParent = e.parentElement;
   const listChildren = addressParent.children;
   const mediaQuery = window.matchMedia(`(min-width: ${dataArray[2]}px)`);
   const mediaQuerySecond = dataArray[5] && window.matchMedia(`(min-width: ${dataArray[5]}px)`);
   for (let i = 0; i < listChildren.length; i++) { !listChildren[i].dataset.n && listChildren[i].setAttribute('data-n', `${i}`) };
   mediaQuery.matches && startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   if (mediaQuerySecond && mediaQuerySecond.matches) moving(e, dataArray[4], addressMoveSecond);
   mediaQuery.addEventListener('change', () => { startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) });
   if (mediaQuerySecond) mediaQuerySecond.addEventListener('change', () => {
      if (mediaQuerySecond.matches) { moving(e, dataArray[4], addressMoveSecond); return; };
      startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   });
});

function startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) {
   if (mediaQuery.matches) { moving(e, dataArray[1], addressMove); return; }
   if (listChildren.length > 0) {
      for (let z = 0; z < listChildren.length; z++) {
         if (listChildren[z].dataset.n > e.dataset.n) {
            listChildren[z].before(e);
            break;
         } else if (z == listChildren.length - 1) {
            addressParent.append(e);
         }
      }
      return;
   }
   addressParent.prepend(e);
};

function searchDestination(e, n) {
   if (e.classList.contains(n.slice(1))) { return e }
   if (e.parentElement.querySelector(n)) { return e.parentElement.querySelector(n) };
   return searchDestination(e.parentElement, n);
}

function moving(e, order, addressMove) {
   if (order == "first") { addressMove.prepend(e); return; };
   if (order == "last") { addressMove.append(e); return; };
   if (addressMove.children[order]) { addressMove.children[order].before(e); return; }
   addressMove.append(e);
}



"use strict"
var smoother;
window.addEventListener("load", (event) => {
   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother)

   // ScrollTrigger.config({ ignoreMobileResize: true });
   // ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   if (MIN1024.matches) {
      smoother = ScrollSmoother.create({
         wrapper: "#scroll",
         content: "#content",
         smooth: 2,
         normalizeScroll: true,
         // smoothTouch: true,
         // effects: true,
      })
      smoother.paused(true);
      setTimeout(() => { smoother.paused(false) }, 5000);
   }

   const tl_1 = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-trigger-1",
         start: "0% 100%",
         end: "100% 20%",
         scrub: true,
      }
   });
   if (MIN1024.matches) {
      tl_1.to(".block__images-1", { y: "-20%" });
      tl_1.to(".block__images-2", { x: "20%" }, "<");
   } else {
      tl_1.fromTo(".block__images-1", { x: "-20%" }, { x: "0%" });
      tl_1.fromTo(".block__images-2", { x: "20%" }, { x: "0%" }, "<");
      tl_1.fromTo(".block__images-1", { x: "0%" }, { x: "-20%" });
      tl_1.fromTo(".block__images-2", { x: "0%" }, { x: "20%" }, "<");
   }

   const tl_2 = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-trigger-2",
         start: "0% 100%",
         end: "100% 20%",
         scrub: true,
         // markers: {
         //    startColor: "red",
         //    endColor: "blue",
         //    fontSize: "18px",
         //    fontWeight: "bold",
         //    indent: 20
         // }
      }
   });
   if (MIN1024.matches) {
      tl_2.to(".block__images-4", { y: "-20%" });
      tl_2.to(".block__images-5", { x: "20%" }, "<");
   } else {
      tl_2.fromTo(".block__images-4", { x: "-20%" }, { x: "0%" });
      tl_2.fromTo(".block__images-5", { x: "20%" }, { x: "0%" }, "<");
      tl_2.fromTo(".block__images-4", { x: "0%" }, { x: "-20%" });
      tl_2.fromTo(".block__images-5", { x: "0%" }, { x: "20%" }, "<");
   }

   const tl_3 = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-trigger-3",
         start: "0% 100%",
         end: MIN1024.matches ? "100% 20%" : "50% 20%",
         scrub: true,
      }
   });
   if (MIN1024.matches) {
      tl_3.to(".block__images-7", { y: "-30%" });
      tl_3.to(".block__images-8", { y: "-20%", rotation: 10 }, "<");
      tl_3.fromTo(".block__images-6", { x: "20%" }, { x: 0 }, "<");
   } else {
      tl_3.fromTo(".block__images-7", { y: "120%" }, { y: 0 });
      tl_3.fromTo(".block__images-8", { y: "90%", rotation: 20 }, { y: 0, rotation: 0 }, "<");
      tl_3.fromTo(".block__images-6", { x: "20%" }, { x: 0 }, "<");
   }

   const tl_4 = gsap.timeline({
      scrollTrigger: {
         trigger: ".js-trigger-4",
         start: "0% 100%",
         end: "0% 40%",
         scrub: true,
      }
   });

   tl_4.fromTo(".about__swiper", { x: "-20%" }, { x: 0 });

});




/* открывает, закрывает модальные окна. */
/*
добавить классы
js-modal-hidden - родительский контейнер модального окна который скрывается и показывается, задать стили скрытия
js-modal-visible - задать стили открытия
js-modal-close - кнопка закрытия модального окна находится внутри js-modal-hidde
кнопка открытия, любая:
js-modal-open - кнопка открытия модального окна
data-modal_open="id" - id модального окна
если надо что бы окно закрывалось при клике на пустое место (фон), добавляется атрибут js-modal-stop-close.
js-modal-stop-close - атрибут указывает на поле, при клике на которое не должно происходить закрытие окна, 
т.е. контейнер контента, при этом внешний родительский контейнет помечается атрибутом js-modal-close.
допускается дополнительно кнопка закрытия внутри js-modal-stop-close.
*/
document.addEventListener('click', (event) => {
   if (event.target.closest('.js-modal-open')) { openModal(event) }
   if (event.target.closest('.js-modal-close')) { testModalStopClose(event) }
})
function openModal(event) {
   let id = event.target.closest('.js-modal-open').dataset.modal_open;
   if (typeof id !== "undefined") { initOpenModal(id) };
}
function testModalStopClose(event) {
   if (event.target.closest('.js-modal-stop-close') &&
      event.target.closest('.js-modal-stop-close') !==
      event.target.closest('.js-modal-close').closest('.js-modal-stop-close')) {
      return
   }
   closeModal(event);
}
function closeModal(event) {
   event.target.closest('.js-modal-hidden').classList.remove('js-modal-visible');
   activeScrollCloseModal();
}
// функция закрытия модального окна (передать id модального окна)
function initCloseModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.remove('js-modal-visible');
   }
   activeScrollCloseModal();
}
// функция открытия модального окна (передать id модального окна)
function initOpenModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.add('js-modal-visible');
      document.body.classList.add('body-overflow');
      if (MIN1024.matches) smoother.paused(true);
   }
}
function activeScrollCloseModal() {
   if (!document.querySelector('.js-modal-visible')) {
      document.body.classList.remove('body-overflow');
      if (MIN1024.matches) smoother.paused(false);
   }
}


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