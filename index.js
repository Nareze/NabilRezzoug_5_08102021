function showTeddies(){
    fetch("http://localhost:3000/api/teddies")
      .then(function(res) {
        return res.json();
    })
      .then (function(value){
        console.log(value);
        for (let i = 0; i < 5; i++){
          let list = document.createElement("LI");
          let image = document.createElement("img");
          image.setAttribute('src',value[i].imageUrl);
          image.style.width = '40%';
          image.style.padding = '20px';
          image.style.borderRadius = '55px';
          list.appendChild(image);
          document.getElementById("teddies").appendChild(list);
          let name = document.createElement("name");
          name.innerHTML = value[i].name + ' :';
          name.style.marginRight = '10px';
          name.style.paddingLeft = '10px';
          name.style.borderLeft = '5px solid #AF6BA5';
          name.style.color = 'black';
          name.style.fontWeight = 'bold';
          list.appendChild(name);
          let price = document.createElement("price");
          price.innerHTML = (value[i].price)/100 + '€';
          price.style.fontWeight = "bold";
          price.style.fontStyle = "italic";
          list.appendChild(price);
      }
    })
    }
    showTeddies();
    
    
    function showCamera(){
      fetch("http://localhost:3000/api/cameras")
        .then(function(res) {
          return res.json();
      })
        .then (function(value){
          console.log(value);
            for (let i = 0; i < 5; i++){
              let list = document.createElement("LI");
              let image = document.createElement("img");
              image.setAttribute('src',value[i].imageUrl);
              image.style.width = '40%';
              image.style.padding = '20px';
              image.style.borderRadius = '55px';
              list.appendChild(image);
              document.getElementById("camera").appendChild(list);
              let name = document.createElement("name");
              name.innerHTML = value[i].name + ' :';
              name.style.marginRight = '10px';
              name.style.paddingLeft = '10px';
              name.style.borderLeft = '5px solid #AF6BA5';
              name.style.color = 'black';
              name.style.fontWeight = 'bold';
              list.appendChild(name);
              let price = document.createElement("price");
              price.innerHTML = (value[i].price)/100 + '€';
              price.style.fontWeight = "bold";
              price.style.fontStyle = "italic";
              list.appendChild(price);
          }
      })
      }
      showCamera();
    
    
      function showFurniture(){
        fetch("http://localhost:3000/api/furniture")
          .then(function(res) {
            return res.json();
        })
          .then (function(value){
            console.log(value);
              for (let i = 0; i < 5; i++){
                let list = document.createElement("LI");
                let image = document.createElement("img");
                image.setAttribute('src',value[i].imageUrl);
                image.style.width = '40%';
                image.style.padding = '20px';
                image.style.borderRadius = '55px';
                list.appendChild(image);
                document.getElementById("furniture").appendChild(list);
                let name = document.createElement("name");
                name.innerHTML = value[i].name + ' :';
                name.style.marginRight = '10px';
                name.style.paddingLeft = '10px';
                name.style.borderLeft = '5px solid #AF6BA5';
                name.style.color = 'black';
                name.style.fontWeight = 'bold';
                list.appendChild(name);
                let price = document.createElement("price");
                price.innerHTML = (value[i].price)/100 + '€';
                price.style.fontWeight = "bold";
                price.style.fontStyle = "italic";
                list.appendChild(price);
            }
        })
        }
        showFurniture();