///////////////////////////////* RECUPERATION DES DONNEES GRACE A UN FETCH CORRESPONDANT A L'ID DU PRODUIT CLIQUE *//////////////

console.log(
  window.location.search.substr(4)
); /* affiche les paramètres de l'url après le point d'interogation */

let params = new URLSearchParams(
  window.location.search
); /* utilisation de la méthode URLSearchParams pour récuperer l'id */
let id = params.get("id"); /* récupère l'id du produit */

function showTeddies() {
  fetch(
    `http://localhost:3000/api/teddies/${id}`
  ) /* Affichage du produit correspondant grâce à l'id ajouté dans l'url */
    .then(function (res) {
      return res.json();
    })
    .then(function (teddies) {
      console.log(teddies);

      let link = document.createElement("a");
      link.setAttribute("href", "panier.html");
      let link2 = document.createElement("a");
      link2.setAttribute("href", "panier.html");
      let icone = document.createElement("i");
      icone.className = "fas fa-shopping-cart";
      link.appendChild(icone);
      document.getElementById("icone").appendChild(link);
      let button = document.createElement("button");
      button.className = "btn btn-primary buttonCard";
      button.innerText = "Voir le panier";
      link2.appendChild(button);
      document
        .getElementById("buttons")
        .appendChild(
          link2
        ); /* creer les differents boutons pour l'achat du produit */

      let productPic = document.getElementById("productPic");
      productPic.setAttribute("src", teddies.imageUrl);
      productPic.setAttribute("width", "304");
      productPic.setAttribute("height", "228");
      productPic.style.borderRadius = "50px";
      let productName = document.getElementById("productName");
      productName.innerText = teddies.name + " ";
      let productPrice = document.getElementById("productPrice");
      productPrice.innerHTML = teddies.price / 100 + "€";
      let productDesc = document.getElementById("productDesc");
      productDesc.innerText = teddies.description;
      let productId = document.getElementById("productId");
      productId.innerText =
        teddies._id; /* on ajoute l'image le prix et description */

      for (let color of teddies.colors) {
        let customColor = document.createElement("option");
        let list = document.getElementById("customColors");
        customColor.innerText = color;
        list.appendChild(customColor);
      }
    }) /* on utilise une boucle pour recuperer les couleurs et les afficher dans la balise select */
    .catch(function (teddies) {
      console.log("Il y a eu un problème avec l'opération fetch");
    });
}
showTeddies();

////////////////////////* AJOUT DES DONNEES DANS LE LOCALSTORAGE (PANIER) POUR LES RECUPERER ET LES AFFICHER DANS LA PAGE PANIER *//////////////////

/* declarer les données à ajouter au localstorage */

const addToCard = document.getElementById("addToCard");
const quantity = document.getElementById("quantity");
const productName = document.getElementById("productName");
const productPic = document.getElementById("productPic");
const productPrice = document.getElementById("productPrice");
const productId = document.getElementById("productId");
/* creer un objet avec toutes les données à ajouter */

class objetCard {
  constructor(name, price, photo, id, quantity) {
    this.name = name;
    this.price = price;
    this.photo = photo;
    this.id = id;
    this.quantity = quantity;
  }
}
/* ajouter les données au localstorage */

function addDataToCart() {
  addToCard.addEventListener("click", (event) => {
    alert("Article ajouté au panier");
    /* creation du nouvel objet */
    let objet = new objetCard(
      productName.innerHTML,
      productPrice.innerHTML,
      productPic.src,
      productId.innerHTML,
      quantity.value
    );
    /* initialise la variable item pour verifier si le localstorage contient des éléments */
    let items = JSON.parse(localStorage.getItem("data"));

    /* si le nombre d'article du panier n'est pas vide alors... */
    if (quantity.value !== "0") {
      /* si le localstorage est vide alors ajouter le nouvel objet */
      if (items === null) {
        items = [];
        items.push(objet);
        localStorage.setItem("data", JSON.stringify(items));
        // window.location.href = "panier.html";

        /* si le localstorage n'est pas vide rajouter un nouvel objet sans le dupliquer */
      } else {
        let array1 = JSON.parse(
          localStorage.getItem("data")
        ); /* on converti et récupère les données du localstorage */

        mapArray1 = array1.map(
          (x) => x.id == objet.id
        ); /* check les ids dans le localstorage de chaque indice dans le tableau et renvoie un tableau true ou false  */

        let position =
          mapArray1.indexOf(
            true
          ); /* si l'élément recherché (true) n'est pas dans le tableau, indexOf renverra -1 */

        console.log("position : " + position);
        if (position != -1) {
          /* dans ce if, quand le mapArray est different de -1, ("true" trouvé indexOf retourne sa position) alors on additionne les produits */

          console.log(mapArray1);
          array1[position].quantity =
            parseInt(array1[position].quantity) + parseInt(objet.quantity);
          console.log(objet.quantity);
          console.log(array1[0].quantity);
        } else {
          /* si la valeur du mapArray est -1 (trouve deux id differents) on ajoute le nouvel objet dans le localstorage */

          array1.push(objet);
        }
        localStorage.setItem("data", JSON.stringify(array1));
        //window.location.href = "panier.html";
      }
    }
  });
}
addDataToCart();
