import { gsap } from "gsap";

export default class Intro {
  constructor() {
    this.counter = document.querySelector(".percent");

    this.setInit();
  }

  setInit() {
    gsap.set(".loader-text", { y: "100%" });
    gsap.set(".page-load", {display: "flex"})
    gsap.set(".hero", {y: "100%"})
  }

  load(percentage) {
    this.counter.innerText = `${percentage}`;
  }

  loaded() {
    const tl = new gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 1,
      },
    });

    tl.to(".loading-counter", {
      x: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(".loader-text", { y: "0%", stagger: 0.2 }, ">")
      .to(".loader-text", { y: "-100%", delay: 0.5, stagger: -0.1 }, ">")
      .fromTo(
        ".hero",
        { borderRadius: "10%", y: "100%" },
        { borderRadius: "0%", y: "0%", duration: 2, ease: "power3.inOut" },
        ">"
      )
      .from(".hero-text", {
        y: "100%",
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.1,
      }, ">-=1");
  }
}
