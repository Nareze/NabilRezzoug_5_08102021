let url_id =
  window.location.search.substr(
    1
  );

/* On enlève le '?' pour créer l'id correspondant au produit */
//console.log(url_id);


function showTeddies() {

  /* Affichage du produit correspondant grâce à l'id ajouté dans l'adresse */
  fetch(
    `http://localhost:3000/api/teddies/${url_id}`
  ) 
    .then(function (res) {
      return res.json();
    })
    .then(function (teddies) {
      console.log(teddies);

      /* creer les differents liens */
      let link = document.createElement("a");
      link.setAttribute("href","panier.html");
      let link2 = document.createElement("a");
      link2.setAttribute("href","panier.html");
      let icone = document.createElement("i");
      icone.className = "fas fa-shopping-cart";
      link.appendChild(icone);
      document.getElementById("icone").appendChild(link);
      let button = document.createElement("button");
      button.className = "btn btn-primary buttonCard";
      button.innerText = "Voir le panier";
      link2.appendChild(button);
      document.getElementById("buttons").appendChild(link2);

      /* ajouter image prix et description */
     let productPic = document.getElementById("productPic");
     productPic.setAttribute("src", teddies.imageUrl);
     productPic.setAttribute("width", "304");
     productPic.setAttribute("height", "228");
     productPic.style.borderRadius = "50px";
     let productName = document.getElementById("productName");
     productName.innerText = teddies.name + " ";
     let productPrice = document.getElementById("productPrice");
     productPrice.innerHTML = (teddies.price)/100 + "€";
     let productDesc = document.getElementById("productDesc");
     productDesc.innerText = teddies.description;
     let productId = document.getElementById("productId");
     productId.innerText = teddies._id;

     /* ajouter les couleurs dans la balise select */
    for (let color of teddies.colors) {
        let customColor = document.createElement("option");
        let list = document.getElementById("customColors");
        customColor.innerText = color;
        list.appendChild(customColor);
      }
    })
    .catch(function (teddies) {
      console.log("Il y a eu un problème avec l'opération fetch");
    });
}
showTeddies();





/* declarer les données à ajouter au localstorage */
const addToCard = document.getElementById("addToCard");
const quantity = document.getElementById("quantity");
const productName = document.getElementById("productName");
const productPic = document.getElementById("productPic");
const productPrice = document.getElementById("productPrice");
const productId = document.getElementById("productId");

/* creer un objet avec toutes les données à ajouter */
class objetCard {
  constructor(name, price, photo, id, quantity){
    this.name = name;
    this.price = price;
    this.photo = photo;
    this.id = id;
    this.quantity = quantity;
  }
}

/* ajouter les données au localstorage */
function addDataToCart(){
  addToCard.addEventListener("click", event => {
    /* creation du nouvel objet */
    let objet = new objetCard(productName.innerHTML, productPrice.innerHTML, productPic.src, productId.innerHTML, quantity.value);

    /* initialise item pour verifier si le localstorage contient des éléments */
    let items = JSON.parse(localStorage.getItem("data"));

    /* quand le panier n'est pas vide alors... */
    if (quantity.value !== "0" ) {

      /* si le localstorage est vide alors ajouter le nouvel objet */
      if (items === null) {
        items = [];
        items.push(objet);
        localStorage.setItem("data", JSON.stringify(items));
        // window.location.href = "panier.html";

      /* si le localstorage n'est pas vide rajouter un nouvel objet */

      } else {
      //  let flagId = false;
      //  for (let item of items){
      //  console.log(item.id)
      //  if ((item.id) == (objet.id)) {    /* objet est le nouveau ajout panier */
      //  item.quantity = parseInt(item.quantity) + parseInt(objet.quantity);
      //  console.log(objet.quantity);
      //  console.log(item.quantity);
      //  flagId = true; 
      //  break;      /* permet de sortir de la boucle */
      //    }
      //  }
      //    if (flagId == false)  {
      //      items.push(objet);
      //    }

      let array1 = JSON.parse(localStorage.getItem("data"));
      console.log(array1);
      mapArray1 = array1.map(x => x.id == objet.id);    /* checking des ids dans le localstorage de chaque indice dans le tableau et renvoie un tableau true ou false  */

      let position = mapArray1.indexOf(true);
      console.log("position : " + position);
      if (position != -1){
        console.log("if: " + mapArray1);
        array1[position].quantity = parseInt(array1[position].quantity) + parseInt(objet.quantity);
        console.log(objet.quantity);
        console.log(array1[0].quantity);
      }
      else {
        array1.push(objet);
      }
      
      localStorage.setItem("data", JSON.stringify(array1));
      //window.location.href = "panier.html";
      }
    }
  })
}
addDataToCart();








/*
// map 1
map1 = array1.map(function(e) {return e.id;});
console.log(map1);
var pos = array1.map(function(e) {return e.id;}).indexOf(objet.id);
console.log("pos: "+pos);

//map 2
mapArray1 = array1.map(x => x.id == objet.id);
console.log(mapArray1);
console.log("id nouvel ajout panier: "+objet.id);
indexArray = mapArray1.indexOf(true);
console.log("indexArray: "+indexArray);

if (pos != -1) {
  console.log("quantity before = "+array1[pos].quantity);
  array1[pos].quantity = parseInt(array1[pos].quantity) + parseInt(objet.quantity);
  console.log("quantity after = "+array1[pos].quantity);
} else {
  console.log("else: OK");
  array1.push(objet);
}
console.log("Local storage: "+array1);
*/
/*
let indexArray = array1.findIndex(x => x.id == objet.id);
console.log(objet.id);
console.log(indexArray);

if (indexArray != -1) {
  array1[indexArray].quantity = parseInt(array1[indexArray].quantity) + parseInt(objet.quantity);
} else {
  array1.push(objet);
}
console.log(array1);
*/

//console.log(map1);
