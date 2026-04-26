const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 3);

// ---------------- COUNTDOWN ----------------
function updateCountdown() {
  const now = new Date().getTime();
  const diff = launchDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("countdown").innerText =
    days + " days left";
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---------------- JOIN WAITLIST ----------------
async function join() {
  const email = document.getElementById("email").value;
  const ref = new URLSearchParams(window.location.search).get("ref");

  const res = await fetch("https://myeditor-v6.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, ref })
  });

  const data = await res.json();

  document.getElementById("status").innerText =
    "Joined! Your code: " + data.referralCode;

  loadLeaderboard();
}

// ---------------- LEADERBOARD ----------------
async function loadLeaderboard() {
  const res = await fetch("http://localhost:3000/api/leaderboard");
  const data = await res.json();

  document.getElementById("leaderboard").innerHTML =
    data.map(u => `<p>${u.email} - ${u.clicks}</p>`).join("");
}

loadLeaderboard();

// ---------------- COOKIES ----------------
function acceptCookies() {
  localStorage.setItem("cookies", "true");
  document.getElementById("cookie").style.display = "none";
}