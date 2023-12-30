import { ADMINS_FACTURE, API_BASE_URL } from "../Constantes.js";

function readFacturesTable() {
  const clientsTableBody = document.getElementById("factures-table-body");
  fetch(API_BASE_URL + ADMINS_FACTURE)
    .then((response) => response.json())
    .then((data) => {
      const rows = data.map((facture) => {
        return `
                  <tr id=D${facture.id} >
                      
                      <td>${facture.id}</td>
                      <td>${facture.dateCreation}</td>
                      <td>${facture.name}</td>
                      <td class="editable adresseinput">${facture.adresse}</td>
                      <td class="editable telephoneinput">${facture.telephone}</td>
                      <td class="editable mailinput" >${facture.mail}</td>
                      <td>${facture.factureHTT}</td>
                      <td>${facture.factureTTC}</td>
                      <td>
                          <select class="action-statut">
                              <option value="ATTENTE" ${
                                facture.statut === "ATTENTE" ? "selected" : ""
                              }>ATTENTE</option>
                              <option value="ENVOYE" ${
                                facture.statut === "ENVOYE" ? "selected" : ""
                              }>ENVOYE</option>
                              <option value="PAYE" ${
                                facture.statut === "PAYE" ? "selected" : ""
                              }>PAYE</option>
                          </select>
                      </td>
                      <td>
                          <button class="button-modifier" data-id="${
                            facture.id
                          }">Éditer</button>
                         <button class="button-supprimer" data-id="${
                           facture.id
                         }">Supprimer</button>
                      </td>
                  </tr>
             `;
      });

      clientsTableBody.innerHTML = rows.join("");
    
      clientsTableBody.innerHTML = rows.join("");
      const totalHTT = data.reduce(
        (total, facture) => total + parseFloat(facture.factureHTT),
        0
      );
      const totalTTC = data.reduce(
        (total, facture) => total + parseFloat(facture.factureTTC),
        0
      );
      totalTableBody.innerHTML = `
            <tr>
                <td colspan="6"></td>
                <td><strong>Total HTT:</strong> ${totalHTT.toFixed(2)}</td>
                <td><strong>Total TTC:</strong> ${totalTTC.toFixed(2)}</td>
                <td></td>
            </tr>
        `;
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des factures :", error)
    );
}
window.addEventListener("load", () => {
  readFacturesTable();
  document.querySelector("tbody").addEventListener("click", (event) => {
    //if(event.target instanceof HTMLTableRowElement){console.log(event.target.id)}
    //if(event.target instanceof HTMLTableCellElement){console.log(event.target.parentElement.id)}

    if (event.target instanceof HTMLButtonElement) {
      console.log(
        event.target.className,
        event.target.parentElement.parentElement.id
      );
      if (event.target.classList.contains("button-supprimer")) {
        deleteFacture(event.target.parentElement.parentElement.id);
      }
      if (event.target.classList.contains("button-modifier")) {
        modifierFacture(event.target.parentElement.parentElement);
      }
    }
  });

  document.querySelector("tbody").addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      console.log(
        event.target.className,
        event.target.parentElement.parentElement.id,
        event.target.value
      );
      changerStatut(
        event.target.parentElement.parentElement.id,
        event.target.value
      );
    }
  });
});

function modifierFacture(tr) {
  const button = tr.querySelector(".button-modifier");
  const buttonActive = button.classList.contains("active");

  if (buttonActive) {
    if (confirm("voulez vous vraiment modifier?")) {
      const updateLigne = {
        adresse: tr.querySelector(".adresseinput").textContent,
        telephone:tr.querySelector(".telephoneinput").textContent,
        mail: tr.querySelector(".mailinput").textContent
      }
      console.log(updateLigne)
       updateFacture(tr.id, updateLigne)
      
    };
  }

  tr.classList.toggle("facture-selectionnee");
  button.classList.toggle("active");
  button.innerHTML = buttonActive ?  "Editer" : "valider" ;
  const listetd = [...tr.children].filter((td) =>
    td.classList.contains("editable")
  );

  listetd.forEach(function (td) {
    td.classList.toggle("active");
    const isEditable = td.getAttribute("contentEditable");
    td.setAttribute("contentEditable", isEditable ? false : true);
  });
}

function updateFacture(idFacture, updateFacture) {
  fetch(API_BASE_URL + ADMINS_FACTURE + `/${idFacture.substring(1)}`, {
    method: "PUT",
    headers: {
      authorisation: "Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateFacture),
  })
    .then((response) => response.text())
    .then((message) => {
      console.log("Facture mis à jour avec succès " + message);
    })
    .catch((error) =>
      console.error("Erreur lors de la mise à jour du facture :", error)
    );
}
function changerStatut(idFacture, nouveauStatut) {
  console.log(`Changer le statut du client ${idFacture} vers ${nouveauStatut}`);

  console.log("URL: " + API_BASE_URL + ADMINS_FACTURE + `/${idFacture}`);

  fetch(API_BASE_URL + ADMINS_FACTURE + `/${idFacture.substring(1)}`, {
    method: "PUT",
    headers: {
      authorisation: "Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ statut: nouveauStatut }),
    
  })
    .then((res) => { if (res.ok) return res; else throw new Error })
    .then((response) => response.text())
    .then((data) => {
      console.log("Statut mis à jour avec succès :", data);
    })
    .catch((error) =>
      console.error("Erreur lors de la mise à jour du statut :", error)
    );
}

function deleteFacture(idFacture) {
  fetch(API_BASE_URL + ADMINS_FACTURE + `/${idFacture.substring(1)}`, {
    method: "DELETE",
    headers: {
      authorisation: "Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
  
      readFacturesTable();
    })
    .catch((error) =>
      console.error("Erreur lors de la suppression de la facture :", error)
    );
}


  // console.log(`Supprimer la facture ${idFacture}`);

  // console.log("URL: " + API_BASE_URL + ADMINS_FACTURE + `/${idFacture}`);
  // Appel à l'API pour mettre à jour le statut de la facture avec le numéro correspondant
  // Utilisez fetch ou toute autre méthode que vous utilisez pour mettre à jour les données côté serveur
