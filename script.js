function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyDuMSILLzGhAjDB8_DmvZg-qoCU_TcIkUo",
    authDomain: "gdigest-348ec.firebaseapp.com",
    databaseURL: "https://gdigest-348ec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gdigest-348ec",
    storageBucket: "gdigest-348ec.firebasestorage.app",
    messagingSenderId: "682670428621",
    appId: "1:682670428621:web:f54b22c1b813892fc9f484"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  database.ref("answers").limitToLast(20).on("child_added", (snapshot) => {
    const data = snapshot.val();
    createBubble(data.text);
  });

  document.getElementById("submit").onclick = () => {
    const text = document.getElementById("answer").value.trim();
    if (!text) return;
    document.getElementById("answer").value = "";
    database.ref("answers").push({
      text: text,
      timestamp: Date.now()
    });
  };
}

function createBubble(text) {
  const container = document.getElementById("bubble-container");
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;
  bubble.style.left = Math.random() * 90 + "%";
  bubble.style.animationDuration = 5 + Math.random() * 5 + "s";
  container.appendChild(bubble);
  setTimeout(() => bubble.remove(), 10000);
}

window.onload = () => {
  let firstClick = false;
  document.body.onclick = () => {
    const welcome = document.getElementById("welcome-screen");
    const clickText = document.getElementById("click-text");
    const app = document.getElementById("main-app");

    if (!firstClick) {
      clickText.style.display = "block";
      firstClick = true;
    } else {
      welcome.style.display = "none";
      app.style.display = "block";
      initializeFirebase();
    }
  };
};