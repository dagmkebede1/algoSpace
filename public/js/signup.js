import { showAlert } from "./alert.js";

const signUp = async (
  firstname,
  lastname,
  email,
  gender,
  password,
  passwordConform
) => {
  console.log(firstname, lastname);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/signup",
      data: {
        firstname,
        lastname,
        email,
        gender,
        password,
        passwordConform,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Signed up Successfully!");
      window.setTimeout(() => {
        location.assign("/home");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
const signUpBtn = document.getElementById("signup");
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const gender = document.getElementById("gender").value;
  const password = document.getElementById("password").value;
  const passwordConform = document.getElementById("passwordConform").value;
  signUp(firstname, lastname, email, gender, password, passwordConform);
});
