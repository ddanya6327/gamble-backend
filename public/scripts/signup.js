document.addEventListener("DOMContentLoaded", async () => {
  const signupForm = document.querySelector("form");
  const errorMessage = document.querySelector("#error-message");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMessage.classList.add("hide");

    const name = document.getElementById("name").value;
    const nickname = document.getElementById("nickname").value;
    const password = document.getElementById("password").value;

    const result = await fetchAPI("auth/signup", "POST", {
      name,
      nickname,
      password,
    });
    if (result.ok) {
      window.location.href = "/mypage";
    } else if (result.status === 409) {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = result.data.message;
    } else {
      errorMessage.classList.remove("hide");
      errorMessage.innerHTML = "Error!";
    }
  });
});
