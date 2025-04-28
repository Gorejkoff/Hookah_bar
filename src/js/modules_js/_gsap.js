"use strict"
window.addEventListener("load", (event) => {
   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother)

   ScrollTrigger.config({ ignoreMobileResize: true });
   ScrollTrigger.isTouch && ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

   if (MIN1024.matches) {
      const smoother = ScrollSmoother.create({
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



