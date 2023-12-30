// Tableau pour stocker les factures (simulons une base de données)
const invoices = [];

// Fonction pour ajouter une facture
function addInvoice(number, amount) {
  invoices.push({ number, amount });
}

// Fonction pour afficher la liste des factures
function displayInvoices() {
  const invoiceList = document.getElementById("invoice-list");
  invoiceList.innerHTML = ""; // Effacer la liste actuelle

  for (const invoice of invoices) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Facture n°${invoice.number}, Montant : ${invoice.amount}`;
    invoiceList.appendChild(listItem);
  }
}

// Soumettre le formulaire pour ajouter une facture
const invoiceForm = document.getElementById("invoice-form");
invoiceForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const invoiceNumber = document.getElementById("invoice-number").value;
  const invoiceAmount = document.getElementById("invoice-amount").value;

  addInvoice(invoiceNumber, invoiceAmount);
  displayInvoices();

  // Réinitialiser le formulaire
  invoiceForm.reset();
});

// Initialisation de l'affichage
displayInvoices();
