import { showAlert } from "./alert.js";

export const createCourse = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/course",
      data,
    });
    if (res.data.status === "success") {
      Swal.fire("Course Created", "You have created new course!", "success");
      window.setTimeout(() => {
        location.assign("/course");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const editCourse = async (form, url) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: url,
      data: form,
    });
    if (res.data.status === "success") {
      Swal.fire(
        "Course Edited",
        "You have Edited the course Successfully!",
        "success"
      );
      window.setTimeout(() => {
        location.assign("/course");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const enrolCourse = async (url) => {
  try {
    const res = await axios({
      method: "POST",
      url,
    });
    if (res.data.status === "success") {
      await Swal.fire(
        "Congratulations !",
        "You have Enrol a course Successfully!, you are Now on Pending when Someone Allows you, you can Start your Course",
        "success"
      );
      window.setTimeout(() => {
        location.assign("/course");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

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
            Swal.fire("Deleted", "Your file has been deleted.", "success");
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
