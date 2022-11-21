import Swiper from "swiper";
var mySwiper = new Swiper(".swiper", {
  direction: "horizontal", // 垂直切换选项
  loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    dynamicMainBullets: 2,
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // 如果需要滚动条
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

// 显示搜索框
var search: HTMLDivElement | null = document.querySelector(".search");
var pull_search_flag: boolean = true;
var pull_search = document.querySelector(".pull-search") as HTMLDivElement;
search!.addEventListener("click", () => {
  if (pull_search_flag) {
    pull_search.style.animationName = "pull_search_start";
    pull_search.style.display = "block";
    pull_search_flag = !pull_search_flag;
  } else {
    pull_search.style.animationName = "pull_search_end";
    pull_search_flag = !pull_search_flag;
  }
});

