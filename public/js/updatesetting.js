import { showAlert } from "./alert.js";

export const updateSetting = async (data) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/user/updateme",
      data,
    });
    if (res.data.status === "success") {
      showAlert("success", "Account updated Successfully!");
      window.setTimeout(() => {
        location.assign("/my/settings");
      }, 1500);
    }
    // console.log(res.data);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const updatePassword = async (
  currentPassword,
  newPassword,
  passwordConform
) => {
  console.log(password);
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:3000/updatepassword",
      data: {
        currentPassword,
        newPassword,
        passwordConform,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Your Password updated Successfully!");
      window.setTimeout(() => {
        location.assign("/my/settings");
      }, 1500);
    }
    // console.log(res.data);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
