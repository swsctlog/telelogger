function promptForHash() {
  const hashInput = prompt("Paste initData string here:");
  if (!hashInput) return;

  try {
    const params = new URLSearchParams(hashInput);
    const userJSON = params.get("user");

    if (!userJSON) {
      document.getElementById("status").textContent = "User data not found.";
      return;
    }

    const user = JSON.parse(userJSON);
    const username = user.username;

    if (username) {
      document.getElementById("status").textContent = "Redirecting to @" + username + "…";
      window.location.href = `https://t.me/${username}`;
    } else if (user.id) {
      document.getElementById("status").textContent = "Username not found. Using ID.";
      window.location.href = `https://t.me/user?id=${user.id}`;
    } else {
      document.getElementById("status").textContent = "Cannot determine Telegram user.";
    }
  } catch (e) {
    document.getElementById("status").textContent = "Error parsing input.";
  }
}
