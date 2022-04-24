// import { createSpace } from "./studyboard.js";
import { showAlert } from "./alert.js";
// import { createSpaceFunction } from "./studyboard.js";
import { updateSetting } from "./updatesetting.js";
// togle dark button function
let darkMode = localStorage.getItem("darkMode");
const darkTogle = document.querySelector(".dark");

const enableDark = () => {
  document.body.classList.add("dark");
  console.log("its now dark");
  localStorage.setItem("darkMode", "ok");
};
const disDark = () => {
  document.body.classList.remove("dark");
  console.log("its now light");
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

//active link function
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll("nav a").forEach((link) => {
  console.log(link.href);
  if (link.href.includes(`${activePage}`)) {
    link.classList.add("active");
  }
});
//toggling for creating new space
const createSpaceBtn = document.getElementById("createSpaceBtn");
const createSpaceForm = document.querySelector(".createspace");
if (createSpaceBtn) {
  createSpaceBtn.addEventListener("click", () => {
    createSpaceForm.style.display = "flex";
    console.log("flexxxxxxxxxx");
  });
}
//creating new space function
const createSpace = async (
  course,
  firstp,
  list1,
  list2,
  list3,
  secondp,
  link
) => {
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

// UPDATING USER ACCOUNTS
const userDataForm = document.querySelector(".profile_form");

if (userDataForm) {
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("firstname", document.getElementById("fname").value);
    form.append("lastname", document.getElementById("lname").value);
    form.append("email", document.getElementById("email").value);
    form.append("phone", document.getElementById("phone").value);
    form.append("gender", document.getElementById("gender").value);
    form.append("photo", document.getElementById("photo").files[0]);

    console.log(form);
    updateSetting(form, "data");
  });
}
