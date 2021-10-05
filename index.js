//////////////////////////////* AFFICHAGE DES DONNEES DU SERVER GRACE A UN FETCH SUR L'API *///////////////////////

function showTeddies() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      return res.json();
    })
    .then(function (teddies) {
      console.log(
        teddies
      ); /* Récupere les differents elements du server grâce à la promise, on les affiches et on utilise une boucle pour afficher les produits dynamiquement */

      for (let teddy in teddies) {
        let list =
          document.createElement(
            "a"
          ); /* On créee des liens dynamiques qui engloberont l'image et la description */

        list.setAttribute(
          "href",
          `produit.html?id=${teddies[teddy]._id}`
        ); /* On ajoute l'id correspondant au produit dans le lien avec un point d'interrogation et le mot id */

        let image = document.createElement("img");
        image.setAttribute(
          "src",
          teddies[teddy].imageUrl
        ); /* On récupère grâce à la boucle le lien de l'image pour l'afficher */

        image.style.borderRadius = "50px";
        image.style.paddingBottom = "20px";
        image.setAttribute("width", "304");
        image.setAttribute("height", "228");
        list.appendChild(
          image
        ); /* On ajoute l'élément image dans l'élément parent lien */

        let name = document.createElement("p");
        name.innerHTML = teddies[teddy].name + " :";
        name.style.marginRight = "";
        name.style.paddingLeft = "5px";
        name.style.fontSize = "20px";
        name.style.fontWeight = "bold";
        list.appendChild(name); /* On récupère les noms des produits */

        let price = document.createElement("span");
        price.innerHTML = teddies[teddy].price / 100 + "€";
        price.style.fontSize = "18px";
        price.style.fontWeight = "bold";
        price.style.fontStyle = "italic";
        name.appendChild(
          price
        ); /* On ajoute le prix dans le paragraphe, sur la même ligne */

        document
          .getElementById("teddies")
          .appendChild(
            list
          ); /* On inscrit l'élement parent dans la div voulue */

        let footerLink_1 = document.getElementById("product1");
        footerLink_1.innerHTML = teddies[2].name;
        footerLink_1.setAttribute("href", "produit.html?" + teddies[2]._id);
        let footerLink_2 = document.getElementById("product2");
        footerLink_2.innerHTML = teddies[4].name;
        footerLink_2.setAttribute("href", "produit.html?" + teddies[4]._id);
        let footerLink_3 = document.getElementById("product3");
        footerLink_3.innerHTML = teddies[3].name;
        footerLink_3.setAttribute("href", "produit.html?" + teddies[3]._id);
      } /*Inscription des liens (meilleurs ventes) dans le footer */
    })
    .catch(function (teddies) {
      console.log("Il y a eu un problème avec l'opération fetch");
    }); /* Ajoute un message si erreur */
}
showTeddies();
