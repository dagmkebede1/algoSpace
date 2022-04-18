const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

//type is success or error

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert-${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};

const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "logged on Successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
      // alert("logged in succesfully!");
    }
    console.log(res.data);
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
    // alert("incorect email or password");
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
