import { API_BASE_URL, AUTH_REGISTER } from "../Constantes.js";

document
  .getElementById("registrationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // permis la soumission du formulaire

    // Recupération des valeurs des champs
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phone = document.getElementById("phone").value;
    const dateEntry = document.getElementById("dateEntry").value;
    const address = document.getElementById("address").value;
    const job = document.getElementById("job").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    // const role = document.getElementById("role").value;
    // const role="USER";
    // const  roles =[{roleName: role}]
    //stockage des donner dans un objet

    const data = {
      firstname,
      lastname,
      phone,
      dateEntry,
      address,
      job,
      email,
      password,
    };
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log(data);
    //validation des champs (vous pouvez ajouter vos propres règles de validation)
    if (
      firstname === "" ||
      lastname === "" ||
      phone === "" ||
      address === "" ||
      dateEntry === "" ||
      job === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Veuillez remplir tous les champs ");
      return;
    }
    fetch(API_BASE_URL + AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new error("Oups ça marche pas");
        }
      })
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("tokenutilise", data.token);
        window.location.href = "../gestion/pagegestion.html";
      })

      .catch((error) => {
        console.log("error:", error);
      });

    if (firstname.length > 8 || /\d/.test(firstname)) {
      alert(
        "Le prénom ne doit pas dépasser 8 caractères et ne doit pas contenir de chiffres."
      );
      return;
    }

    if (lastname.length > 8 || /\d/.test(lastname)) {
      alert(
        "Le nom ne doit pas dépasser 8 caractères et ne doit pas contenir de chiffres."
      );
      return;
    }
  });
