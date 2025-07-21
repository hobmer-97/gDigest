let database;

function initializeFirebase() {
 const firebaseConfig = {
    apiKey: "AIzaSyDuMSILLzGhAjDB8_DmvZg-qoCU_TcIkUo",
    authDomain: "gdigest-348ec.firebaseapp.com",
    databaseURL: "https://gdigest-348ec-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  firebase.initializeApp(firebaseConfig);
  database = firebase.database();

  database.ref("answers").limitToLast(20).on("child_added", (snapshot) => {
    const data = snapshot.val();
    createBubble(data.text);
  });
}

function submitAnswer() {
  const text = document.getElementById("answer").value.trim();
  if (!text) return;
  document.getElementById("answer").value = "";

  database.ref("answers").push({
    text: text,
    timestamp: Date.now()
  });
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
  initializeFirebase();
};
