const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

//type is success or error

const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div> class="alert ${type}">${msg}</div>`;
  document.querySelector("body").insertAdjacentElement("afterbegin", markup);
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
    if (res.data.status === "success!") {
      showAlert("success", "logged on Successfully!");
      window.setTimeout(() => {
        location.assign("/my/studyspace");
      }, 1500);
    }
    console.log(res.data);
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
