import { showAlert } from "./alert.js";

export const createCourse = (data) => {
    try {
            const res = await axios({
              method: "POST",
              url: "http://localhost:3000/course",
              data,
            });
            if (res.data.status === "success") {
                Swal.fire(
                    'Good job!',
                    'You have created new course!',
                    'success'
                  )
              window.setTimeout(() => {
                location.assign("/my/settings");
              }, 1500);
            }
          } catch (err) {
            showAlert("error", err.response.data.message);
          }
        
  };
  

// export const updateSetting = async (data) => {
//   try {
//     const res = await axios({
//       method: "PATCH",
//       url: "http://localhost:3000/user/updateme",
//       data,
//     });
//     if (res.data.status === "success") {
//       showAlert("success", "Account updated Successfully!");
//       window.setTimeout(() => {
//         location.assign("/my/settings");
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert("error", err.response.data.message);
//   }
// };
// export const updatePassword = async (
//   passwordCurrent,
//   password,
//   passwordConform
// ) => {
//   try {
//     const res = await axios({
//       method: "PATCH",
//       url: "http://localhost:3000/user/updatemypassword",
//       data: { passwordCurrent, password, passwordConform },
//     });
//     if (res.data.status === "success") {
//       showAlert("success", "Your Password is updated Successfully!");
//       window.setTimeout(() => {
//         location.assign("/logout");
//       }, 1500);
//     }
//   } catch (err) {
//     showAlert("error", err.response.data.message);
//   }
// };
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
  
        axios({
          method: "DELETE",
          url: deleteUrl,
        })
          .then(function (res) {
            console.log(res.data.status);
            if (res.data.status === "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              window.setTimeout(() => {
                location.assign("/course");
              }, 1500);
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    });
  };
  