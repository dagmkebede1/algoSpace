// import { createSpace } from "./studyboard.js";
import { showAlert } from "./alert.js";
import { createSpaceFunction } from "./studyboard.js";
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
createSpaceFunction();
const createSpace = async (
  course,
  firstp,
  list1,
  list2,
  list3,
  secondp,
  link
) => {
  // console.log(course, firstp);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/studyboard",
      data: {
        course,
        firstp,
        list1,
        list2,
        list3,
        secondp,
        link,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "studyspace created Successfully!");
      window.setTimeout(() => {
        location.assign("/student/studyboard");
      }, 1500);
    }
    console.log(res.data);
  } catch (err) {
    // showAlert("error", err.response.data.message);
    showAlert("error", "error while creating space");
    // console.log(err.response.data.message);
  }
};
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const course = document.getElementById("course").value;
  const firstp = document.getElementById("firstp").value;
  const list1 = document.getElementById("list1").value;
  const list2 = document.getElementById("list2").value;
  const list3 = document.getElementById("list3").value;
  const secondp = document.getElementById("secondp").value;
  const link = document.getElementById("link").value;
  createSpace(course, firstp, list1, list2, list3, secondp, link);
});
