import { API_BASE_URL, AUTH_ENPOINT } from "../Constantes.js";

document.getElementById("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { email, password };
   if (email === "" || password === "") {
    alert("Veuillez remplir tous les champs ");
    return;
  }
  fetch(API_BASE_URL + AUTH_ENPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        alert("Les informations de connexion sont incorrectes !");
      }
    })
    .then((data) => {
      localStorage.setItem("tokenutilise", data.token);
      window.location.href = "../gestionClient/clients.html";
    })

    .catch((error) => {
      console.log("error:", error);
    });
});
