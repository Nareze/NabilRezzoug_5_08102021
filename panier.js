///////////////////////////////* AFFICHAGE DES ELEMENTS DEPUIS LE LOCALSTORAGE, CALCUL DU PRIX... *///////////////////////////////

let data = JSON.parse(localStorage.getItem("data"));

console.log(data);

if (data === null || data.length === 0) {
  document.getElementById("emptyBasket").innerHTML = "Votre panier est vide !";
}

function getPrice() {
  priceOfElements = []; /* contient le prix de tous les produits */

  for (let teddies in data) {
    let elem0 = document.createElement("div");
    elem0.style.backgroundColor = "pink";
    elem0.style.margin = "10px";
    elem0.style.borderRadius = "25px";
    elem0.style.paddingBottom = "10px";
    let elem1 = document.createElement("img");
    elem1.setAttribute("src", data[teddies].photo);
    elem1.style.borderRadius = "25px";
    elem1.style.paddingBottom = "20px";
    elem1.setAttribute("width", "304");
    elem1.setAttribute("height", "228");
    elem1.style.padding = "10px";
    elem0.appendChild(
      elem1
    ); /* création d'une div et d'une image pour y ajouter la description et l'image des produits du panier */

    let price = data[teddies].price;
    console.log(price);
    let quantities = data[teddies].quantity;
    console.log(quantities);
    let totalPrice =
      parseInt(price) *
      parseInt(
        quantities
      ); /* on récupère dans le localstorage le prix et la quantité de chaque élements puis on les multiplie */

    console.log(totalPrice);
    priceOfElements.push(
      totalPrice
    ); /* on ajoute dans un array les differents prix multipliés pour faire un total */

    let name = data[teddies].name;
    let elem2 = document.createElement("p");
    elem2.innerHTML = name;
    elem2.style.color = "brown";
    elem0.appendChild(elem2);
    elem2bis = document.createElement("p");
    elem2bis.innerHTML = "Quantité : " + quantities;
    elem2bis.style.color = "brown";
    elem0.appendChild(elem2bis);
    let elem3 = document.createElement("p");
    elem3.innerHTML = "Prix total : " + totalPrice + " €";
    elem3.style.marginBottom = "25px";
    elem3.style.color = "brown";
    elem0.appendChild(elem3); /* on affiche le prix total d'un produit */

    let elem4 = document.createElement("a");
    elem4.setAttribute("href", "#");
    elem4.innerHTML = "Supprimer le produit";
    elem0.appendChild(elem4); /* ajout d'un bouton supprimer */

    elem4.addEventListener("click", function (event) {
      let nameBasket = elem2.innerHTML; /* On récupère le nom de l'article */
      let array1 = JSON.parse(localStorage.getItem("data"));
      mapArray1 = array1.map(
        (x) => x.name == nameBasket
      ); /* On compare le nom de l'article aux noms des articles du localstorage */
      let position = mapArray1.indexOf(true);
      console.log(
        position
      ); /* Renvoie la position d'un même article trouvé dans le localstorage */

      if (position != -1) {
        data.splice(position, 1); /* Suppression de l'article trouvé */
        localStorage.setItem("data", JSON.stringify(data));
        location.reload();
        alert("Cet article a bien été supprimé !");
      }
    });

    document.getElementById("products").appendChild(elem0);
    const reducer = (previousValue, currentValue) =>
      previousValue +
      currentValue; /* additionne (accumule) les valeurs du tableau pour ajouter le prix final */

    let finalPrice = document.getElementById("finalPrice");
    finalPrice.innerHTML =
      "Le prix total des articles est de " +
      priceOfElements.reduce(reducer) +
      "€"; /* on applique la méthode reduce */
    finalPrice.style.fontSize = "20px";
    finalPrice.style.color = "brown";
    finalPrice.style.fontWeight = "bold";
    console.log(priceOfElements.reduce(reducer));
  }
}
getPrice();

function deleteItems() {
  localStorage.clear();
}

/////////////////////////////////////////* ENVOIE DU FORMULAIRE ET REPONSE DU SERVER (ID DE COMMANDE) *//////////////////////////////

const url = "http://localhost:3000/api/teddies/order";

function send(e) {
  e.preventDefault();
  const firstName = document.getElementById("inputName");
  const lastName = document.getElementById("inputPrenom");
  const address = document.getElementById("inputAddress");
  const city = document.getElementById("inputCity");
  const email = document.getElementById("inputEmail");
  class objetForm {
    constructor(firstName, lastName, address, city, email) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.address = address;
      this.city = city;
      this.email = email;
    }
  }
  let contact = new objetForm(
    firstName.value,
    lastName.value,
    address.value,
    city.value,
    email.value
  ); /* on crée un objet avec tout les éléments du formulaire (à envoyer) */

  let products = [];
  let dataStorage = localStorage.getItem("data");
  console.log(JSON.parse(dataStorage));
  for (let ids in data) {
    let id = data[ids].id;
    console.log("id: " + id);
    products.push(id);
  } /* on ajoute tout les id des produits dans un array (à envoyer) */

  console.log("products[]: " + products);

  let bodyData = { contact, products };
  var request = new Request(url, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  }); /* dans le body on ajoute les elements a envoyer (contact,product) avec la méthode POST */

  fetch(request)
    .then(async function (res) {
      if (res.ok) {
        const pkgOrder = await res.json();
        console.log(`Resultat de res.ok : ${res.ok}`);
        console.log(pkgOrder.orderId);
        localStorage.setItem(
          "responseId",
          pkgOrder.orderId
        ); /* on ajoute la réponse du server (num de commande) dans le localstorage */
        window.location = "confirmation.html";
      } else {
        console.log(`réponse server : ${res.status}`);
      }
    })
    .catch(function (error) {
      console.log("PROBLEM WITH FETCH");
    });
}

//////////////////////////* VALIDATION DU FORMULAIRE *////////////////////////////////////

const buttonForm = document.getElementById("buttonForm");
buttonForm.addEventListener(
  "click",
  send
); /* appelle la fonction send au click */

document.getElementById(
  "buttonForm"
).disabled = true; /* par défaut le bouton doit être grisé jusqu'au remplissage du formulaire */

function checkValidity() {
  let emptyRegex = /^$/;
  let emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; /* creation de deux regex l'une pour verifier que le champ n'est pas vide et l'autre pour verifier l'adresse mail */
  if (
    !emptyRegex.test(document.getElementById("inputName").value) &&
    !emptyRegex.test(document.getElementById("inputPrenom").value) &&
    !emptyRegex.test(document.getElementById("inputAddress").value) &&
    !emptyRegex.test(
      document.getElementById("inputCity").value
    ) /* si le champ est different d'un champ vide alors... */ &&
    emailRegex.test(
      document.getElementById("inputEmail").value
    ) /* et si le champ réussit au test du regex alors...*/
  ) {
    document.getElementById(
      "buttonForm"
    ).disabled = false; /* après test des differentes valeurs, si la condition est respectée le bouton est activé */
    document.getElementById("formMessage").innerHTML = "";
  } else {
    document.getElementById("buttonForm").disabled = true;
    document.getElementById("formMessage").innerHTML =
      "Merci de remplir tous les champs";
  }
}

document.querySelectorAll("input").forEach((item) => {
  addEventListener("input", function (e) {
    checkValidity();
  });
}); /* on fait une boucle sur les inputs de la page et on appelle la fonction au click */
