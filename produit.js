let url_id = window.location.search.substr(1);  /* On enlève le '?' pour créer l'id correspondant au produit */
console.log(url_id); 


function showTeddies(){
    fetch(`http://localhost:3000/api/teddies/${url_id}`)        /* Affichage du produit correspondant grâce à l'id ajouté dans l'adresse */
      .then(function(res) {
        return res.json();
    })
      .then (function(teddies){
          console.log(teddies);
          list = document.getElementById('teddies');
          let image = document.createElement("img");
          image.setAttribute('src',teddies.imageUrl);
          image.setAttribute("width", "304");
          image.setAttribute("height", "228");
          image.style.borderRadius = '50px';
          list.appendChild(image);
          let name = document.createElement("p");
          name.style.marginTop = '25px';
          name.style.fontSize = '20px';
          name.style.fontWeight = 'bold';
          name.innerHTML = teddies.name + ` :`;
          list.appendChild(name)
          let price = document.createElement("span");
          price.style.marginLeft = '10px';
          price.innerHTML = (teddies.price)/100 + `€`;
          name.appendChild(price);
          let desc = document.createElement("p");
          desc.style.fontSize = '15px';
          desc.style.fontWeight = 'bold';
          desc.innerHTML = teddies.description;
          list.appendChild(desc);

    })
    }
    showTeddies();
