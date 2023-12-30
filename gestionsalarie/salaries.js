import { API_BASE_URL, AUTH_SALARIES } from "../Constantes.js";

function updateSalariesTable() {
  const salariesTableBody = document.getElementById("salariesTableBody");

  fetch(API_BASE_URL + AUTH_SALARIES, {
    method: "GET",
    headers: {
      Authorisation: "Bearer " + localStorage.getItem("tokenutilise"),
      //   "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Création des lignes de la table à partir des données reçues
      const rows = data.map((salaries) => {
        return `
                    <tr>
                        <td>${salaries.firstname}</td>
                        <td>${salaries.lastname}</td>
                        <td>${salaries.phone}</td>
                        <td>${salaries.dateEntry}</td>
                        <td>${salaries.address}</td>
                        <td>${salaries.email}</td>
                        <td>${salaries.job}</td>
                        <td>
                        <button class="delete-button" data-id="${salaries.firstname}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button class="edit-button" data-id="${salaries.firstname}">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                    </tr>
                   
               `;
      });

      salariesTableBody.innerHTML = rows.join("");
    })
    .catch((error) =>
      console.error("Erreur lors de la récupération des salariés :", error)
    );
}

// Fonctions supprimersalaries et modifiersalaries doivent être définies ailleurs dans votre code.

// Exemple d'utilisation de la fonction
window.addEventListener("load",updateSalariesTable);

// Fonction pour changer le statut d'un salarié
function changerStatut(numeroSalaries, nouveauStatut) {
  // Appel à l'API pour mettre à jour le statut de la salaries avec le numéro correspondant
  // Utilisez fetch ou toute autre méthode que vous utilisez pour mettre à jour les données côté serveur
  fetch(API_BASE_URL + AUTH_SALARIES + `/${numeroSalaries}`, {
    method: "PUT",
    headers: {
      authorisation: "Bearer " + localStorage.getItem("tokenutilise"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ statut: nouveauStatut }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Mettez à jour l'interface utilisateur si nécessaire
      console.log("Statut mis à jour avec succès :", data);
      // Actualiser la table des salariés après la suppression
      updateSalariesTable();
    })
    .catch((error) =>
      console.error("Erreur lors de la mise à jour du statut :", error)
    );
}

// Fonction pour supprimer un salarié
function supprimerSalaries(id) {
  if (confirm("Voulez-vous vraiment supprimer ce salarié?")) {
    // Ajoutez une condition pour mettre à jour le statut uniquement si l'utilisateur confirme
    if (
      confirm(
        "Voulez-vous vraiment marquer ce salarié comme supprimé de manière permanente?"
      )
    ) {
      changerStatut(id, "delete");
    }
  }
}
//rechargement de la page


//Ajoutez ces écouteurs d'événements au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  // Supprimer le salarié
  document
    .getElementById("salariesTableBody")
    .addEventListener("click", (event) => {
      if (event.target.matches(".delete-button")) {
        const id = event.target.getAttribute("data-id");
        supprimerSalaries(id);
      }
    });

  // Modifier le salarié
  // document.getElementById('salariesTableBody').addEventListener('click', (event) => {
  //     if (event.target.matches('.edit-button')) {
  //         // Modifier le salarié - Assurez-vous que cette fonction est définie ou commentée
  //         const id = event.target.getAttribute('data-id');
  //         modifierSalaries(id);
  //     }

  // });
});
