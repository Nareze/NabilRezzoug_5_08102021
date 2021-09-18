function showTeddies() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      return res.json();
    })
    .then(function (teddies) {
      console.log(teddies);
      for (let teddy in teddies) {
        let list =
          document.createElement(
            "a"
          ); /* On créee l'élement parent qui englobe l'image et la description */
        list.setAttribute(
          "href",
          "produit.html?" + teddies[teddy]._id
        ); /* On ajoute l'id correspondant au produit dans le lien avec le point d'interrogation */

        /*Inscription des liens dans le footer */
        let footerLink_1 = document.getElementById("test2");
        footerLink_1.innerHTML = teddies[2].name;
        footerLink_1.setAttribute("href", "produit.html?" + teddies[2]._id);
        let footerLink_2 = document.getElementById("test3");
        footerLink_2.innerHTML = teddies[4].name;
        footerLink_2.setAttribute("href", "produit.html?" + teddies[4]._id);
        let footerLink_3 = document.getElementById("test4");
        footerLink_3.innerHTML = teddies[3].name;
        footerLink_3.setAttribute("href", "produit.html?" + teddies[3]._id);

        let image = document.createElement("img");
        image.setAttribute(
          "src",
          teddies[teddy].imageUrl
        ); /* On donne les propriétés à l'image */
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
        list.appendChild(name);

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
        /* ajouter catch */
      }
    })
    .catch(function (teddies) {
      console.log("Il y a eu un problème avec l'opération fetch");
    });
}
showTeddies();
