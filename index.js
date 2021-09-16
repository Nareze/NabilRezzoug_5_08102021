function showTeddies(){
    fetch("http://localhost:3000/api/teddies")
      .then(function(res) {
        return res.json();
    })
      .then (function(teddies){
        console.log(teddies);
        for (let teddy in teddies){
          let list = document.createElement("a"); /* On créee l'élement parent qui englobe l'image et la description */
          list.setAttribute('href','/produit.html');
          list.classList.add('productPageCenter');


          let image = document.createElement("img");
          image.setAttribute('src',teddies[teddy].imageUrl); /* On donne les propriétés à l'image */
          image.style.borderRadius = '50px';
          image.style.padding = '25px';
          image.setAttribute("width", "304");
          image.setAttribute("height", "228");
          list.appendChild(image); /* On ajoute l'élément image dans l'élément parent lien */




          
          let name = document.createElement("name");
          name.innerHTML = teddies[teddy].name + ' :';
          name.classList.add('marginDesc');
          name.style.marginRight = '';
          name.style.paddingLeft = '5px';
          name.style.fontSize = '20px';
          name.style.borderLeft = '5px solid #AF6BA5';
          name.style.color = 'black';
          name.style.fontWeight = 'bold';
          list.appendChild(name);
          let price = document.createElement("price");
          price.innerHTML = (teddies[teddy].price)/100 + '€';
          price.classList.add('marginDesc');
          price.style.fontSize = '18px';
          price.style.fontWeight = "bold";
          price.style.fontStyle = "italic";
          list.appendChild(price);




          document.getElementById("teddies").appendChild(list); /* On inscrit l'élement parent dans la div voulue */
          /* ajouter catch */
      }
    })
    }
    showTeddies();