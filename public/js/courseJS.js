import "./sweetalert2.all.js";
import { showAlert } from "./alert.js";

export const deleteCourse = (deleteUrl) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // SENDING DELETE REQUEST

      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      //   axios({
      //     method: "DELETE",
      //     url: deleteUrl,
      //   });
    }
  });
};
