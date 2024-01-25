// Menu
let spanOne = document.querySelector(".spanone");
let spanTwo = document.querySelector(".spantwo");
let spanThree = document.querySelector(".spanthree");
let menu = document.querySelector(".menu");
let nav = document.querySelector(".nav-menu");

menu.addEventListener("click", () => {
  spanOne.classList.toggle("one");
  spanTwo.classList.toggle("two");
  spanThree.classList.toggle("three");
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
    nav.classList.add("desactive");
  } else {
    nav.classList.remove("hidden");
    nav.classList.remove("desactive");
    nav.classList.add("active");
  } 
});

// Sub Menu
let subMenu = document.querySelector(".subMenu");
let subMenuList = document.querySelector(".sub-menu");
let icon = document.querySelector(".subMenu .fa-angle-down");

subMenu.addEventListener("click", () => {
  if (subMenuList.classList.contains("h-0")) {
    subMenuList.classList.remove("h-0");
    subMenuList.classList.add("h-full");
    icon.classList.remove("rotate-90");
    icon.classList.add("rotate-0");
  } else {
    subMenuList.classList.remove("h-full");
    subMenuList.classList.add("h-0");
    icon.classList.remove("rotate-0");
    icon.classList.add("rotate-90");
  } 
})

// Input
let input = document.querySelector(".input");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");

minus.addEventListener("click", () => {
  if (input.value > 1) {
    input.value--;
  }
})

plus.addEventListener("click", () => {
  input.value++;
})
