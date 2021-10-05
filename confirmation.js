////////////////////////////* AFFICHAGE DE L'IDENTIFIANT DE COMMANDE RECUPERE DANS LE LOCALSTORAGE ET DU PRIX FINAL *///////////////////////

let data = JSON.parse(localStorage.getItem("data"));

function getCommandSummary() {
  array = [];

  for (let teddies in data) {
    let price = data[teddies].price;
    console.log(price);
    let quantities = data[teddies].quantity;
    console.log(quantities);
    let totalPrice = parseInt(price) * parseInt(quantities);
    array.push(totalPrice);
  }
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  let finalPrice = array.reduce(reducer);
  console.log(
    finalPrice
  ); /* on applique la même méthode que la page panier pour calculer le prix final, multiplication > push dans un array > utilisation de reduce */

  let command =
    localStorage.getItem("responseId"); /* on récupère le numero de commande */
  console.log(command);

  let commandEmpl = document.getElementById("commandRecap");
  commandEmpl.innerHTML =
    "Nous avons enregistré votre commande n°" +
    command +
    " d'une valeur de " +
    finalPrice +
    "€" +
    " sur Orinoco.com !";
  commandEmpl.style.color = "green";
}
getCommandSummary();
