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
