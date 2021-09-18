function showTeddies(){
    fetch("http://localhost:3000/api/teddies")
      .then(function(res) {
        return res.json();
    })
      .then (function(teddies){
        console.log(teddies);
        for (let teddy in teddies){
          let list = document.createElement("a"); /* On créee l'élement parent qui englobe l'image et la description */
          list.setAttribute('href', "produit.html?" + teddies[teddy]._id );   /* On ajoute l'id correspondant au produit dans le lien avec le point d'interrogation */
          list.classList.add('productPageCenter');


          let image = document.createElement("img");
          image.setAttribute('src',teddies[teddy].imageUrl); /* On donne les propriétés à l'image */
          image.style.borderRadius = '50px';
          image.style.paddingBottom = '20px';
          image.setAttribute("width", "304");
          image.setAttribute("height", "228");
          list.appendChild(image); /* On ajoute l'élément image dans l'élément parent lien */


          let name = document.createElement("p");
          name.innerHTML = teddies[teddy].name + ' :';
          name.style.marginRight = '';
          name.style.paddingLeft = '5px';
          name.style.fontSize = '20px';
          name.style.fontWeight = 'bold';
          list.appendChild(name);


          let price = document.createElement("span");
          price.innerHTML = (teddies[teddy].price)/100 + '€';
          price.classList.add('marginDesc');
          price.style.fontSize = '18px';
          price.style.fontWeight = "bold";
          price.style.fontStyle = "italic";
          name.appendChild(price);  /* On ajoute le prix dans le paragraphe, sur la même ligne */
          document.getElementById("teddies").appendChild(list); /* On inscrit l'élement parent dans la div voulue */
          /* ajouter catch */
      }
    })
    }
    showTeddies();
