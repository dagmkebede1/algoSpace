import { showAlert } from "./alert.js";

export const deleteMe = async (url) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: url,
      data: null,
    });
    if (res.data.status === "success") {
      showAlert("success", "You are No Longer Availabe!");
      window.setTimeout(() => {
        location.assign("/logout");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
