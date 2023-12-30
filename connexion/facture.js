import { ADMINS_FACTURE, API_BASE_URL } from "../Constantes.js";
// Récupération des éléments HTML

const dateCreationhtml = document.getElementById("dateCreation");
const namehtml = document.getElementById("name");
const adressehtml = document.getElementById("adresse");
const telephonehtml = document.getElementById("telephone");
const mailhtml = document.getElementById("mail");
const factureHTThtml = document.getElementById("factureHTT");
const factureTTChtml = document.getElementById("factureTTC");
const statuthtml = document.getElementById("statut");
const factureFormulaire = document.getElementById("facture");

factureFormulaire.addEventListener("submit", (event) => {
  event.preventDefault();

  // Récupération des valeurs des champs

  const dateCreation = dateCreationhtml.value;
  const name = namehtml.value;
  const adresse = adressehtml.value;
  const telephone = telephonehtml.value;
  const mail = mailhtml.value;
  const factureHTT = parseFloat(factureHTThtml.value); // Afficher la valeur de factureHTT avec deux décimales
  const tva = 0.2; // 20% de TVA
  const factureTTC = factureHTT * (1 + tva);

  // Affichage de factureHTT et factureTTC dans les éléments HTML correspondants
  factureHTThtml.value = factureHTT.toFixed(2);
  factureTTChtml.value = factureTTC.toFixed(2);
  statuthtml.value = "ATTENTE"; // Vous pouvez définir le statut par défaut ici

  // Stockage des données dans un objet
  const data = {
    dateCreation,
    name,
    adresse,
    telephone,
    mail,
    factureHTT,
    factureTTC,
    statut: "ATTENTE",
  };
  if (
    !dateCreation ||
    !name ||
    !adresse ||
    !telephone ||
    !mail ||
    isNaN(factureHTT)
  ) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  fetch(API_BASE_URL + ADMINS_FACTURE, {
    method: "POST",
    headers: {
      // authorization: "Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((Response) => {
      if (Response.ok) {
        alert("Super ca marche")
        return Response.text();
        
      } else {
        alert("Oups ça ne marche pas");
      }
    })

    //  .then((reponse) => reponse.text())
    // .then((data) => {
    //   localStorage.setItem("tokenutilise", data.token);
    //   window.location.href = "../gestionClient/clients.html";
    // })
    .catch((error) => {
      console.error("error:", error);
    });
});
//  // Recupération des valeurs des champs
// const numerohtml = document.getElementById("numero");
// const dateCreationhtml = document.getElementById("date");
// const namehtml = document.getElementById("name");
// const adressehtml = document.getElementById("adresse");
// const telephonehtml = document.getElementById("telephone");
// const mailhtml = document.getElementById("mail");
// const factureHTThtml = document.getElementById("factureHTT");
// const factureTTChtml = document.getElementById("factureTTC");
// const  factureformalire = document.getElementById("form");
// // const buttontest = document.querySelector("#test");

// factureformalire.addEventListener("submit",(event)=>{
//             event.preventDefault(); // permis la soumission du formulaire
//             const numero=numerohtml.value;
//             const dateCreation = dateCreationhtml.value;
//             const name= namehtml.value;
//             const adresse =adressehtml.value;
//             const telephone = telephonehtml.value;
//             const mail = mailhtml.value;
//             const factureHTT =factureHTThtml.value;
//             const factureTTC= factureTTChtml.value;
// //stockage des donner dans un objet

//   const data = {numero , dateCreation,name, adresse,telephone, mail,factureHTT,factureTTC};
//   console.log(data)
//   //validation des champs (vous pouvez ajouter vos propres règles de validation)
//   if( numero===""  ||dateCreation === "" ||name === ""  || adresse === "" || telephone ==="" ||mail === "" ||factureHTT === "" ||factureTTC === "" ) {
//     alert("Veuillez remplir tous les champs ")
//     return;
//   }
//   const dataTest={
//    "dateCreation": "2023-07-07",
//     "factureHTT": "34555",
//     "factureTTC": "23455",
//     "mail": "ron@gmail.com",
//     "name": "Monsieur Client",
//     "numero": "1234556",
//     "telephone":"09999767"
//     }
// fetch(API_BASE_URL + ADMINS_FACTURE,{
//     method:"POST",
//     headers:{

//       Authorization:"Bearer " + localStorage.getItem("tokenutilise"),

//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify(data)
//   })
//   .then((Response)=>{
//     if(Response.ok){
//       alert("Super ca marche")
//     }else{alert("Oups ça marche pas")}
//   })
//   .catch((error)=>{
//   console.log("error :",error)
//   })
//   });
/** 
buttontest.addEventListener("click",(event)=>{
  fetch("http://localhost:8080/cda/projet/test/coucou", {
    method: "GET",
    headers: {
      authorisation:"Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type":"application/json"
    }
  })
  .then((Response)=>{
    if(Response.ok){
    console.log("Super ca marche");
    }else{console.log("Oups ça marche pas");}
  })
  .catch((error)=>{
    console.log(error);
  })
})
*/
