// Toggle class active hamburger
const NavbarNav = document.querySelector(".Navbar-nav");

document.querySelector("#hamburger-menu").onclick = () => {
  NavbarNav.classList.toggle("active");
};

// Toggle class active search
// const searchForm = document.querySelector(".search-form");
// const searchBox = document.querySelector("#search-box");
//
// document.querySelector("#search-button").onclick = (e) => {
//   searchForm.classList.toggle("active");
//   searchBox.focus();
//   e.preventDefault();
// };

// Toggle class active shopping bag
const shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#shopping-bag-button").onclick = (e) => {
  shoppingCart.classList.toggle("active");
  e.preventDefault();
};

// klik di luar element
const hamburger = document.querySelector("#hamburger-menu");
// const searchbutton = document.querySelector("#search-button");
const shoppingbag = document.querySelector("#shopping-bag-button");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !NavbarNav.contains(e.target)) {
    NavbarNav.classList.remove("active");
  }
  // if (!searchbutton.contains(e.target) && !searchForm.contains(e.target)) {
  //   searchForm.classList.remove("active");
  // }
  if (!shoppingbag.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove("active");
  }
});

// // Modal Box
// const itemDetailModal = document.querySelector("#item-detail-modal");
// const itemDetailButtons = document.querySelectorAll(".item-detail-button");

// itemDetailButtons.forEach((btn) => {
//   btn.onclick = (e) => {
//     itemDetailModal.style.display = "flex";
//     e.preventDefault();
//   };
// });

// // klik tombol close modal
// document.querySelector(".modal .close-icon").onclick = (e) => {
//   itemDetailModal.style.display = "none";
//   e.preventDefault();
// };

// // klik tombol diluar modal
// window.onclick = (e) => {
//   if (e.target === itemDetailModal) {
//     itemDetailModal.style.display = "none";
//   }
// };
