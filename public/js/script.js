let darkMode = localStorage.getItem("darkMode");
const darkTogle = document.querySelector(".dark");

const enableDark = () => {
  document.body.classList.add("dark");
  localStorage.setItem("darkMode", "ok");
};
const disDark = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "ok") {
  enableDark();
}

darkTogle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "ok") {
    enableDark();
    console.log(darkMode);
  } else {
    disDark();
    console.log(darkMode);
  }
});

const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  // console.log(activePage);
  console.log(link.href);
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("active");
  }
});
