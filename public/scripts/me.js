document.addEventListener("DOMContentLoaded", async () => {
  const result = await fetchAPI("auth/me", "GET");

  if (result.ok) {
    const text = document.querySelector("#username");
    console.log(result.data);
    text.innerHTML = `my name is ... ${result.data.username}`;
  } else {
    console.error("Login failed:", result);
  }
});
