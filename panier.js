let data = JSON.parse(localStorage.getItem("data"));
console.log(data);



function getPrice(){

    array = [];

    for (let teddies in data) {
        let price = data[teddies].price;
        let quantities = data[teddies].quantity;
        let totalPrice = parseInt(price) * parseInt(quantities);
        array.push(totalPrice);

        let product = document.createElement("div");
        product.style.backgroundColor = "pink";
        product.style.margin = "10px";
        product.style.borderRadius = "25px";

        let elem0 = document.createElement("img");
        elem0.setAttribute("src", data[teddies].photo);
        elem0.style.borderRadius = "25px";
        elem0.style.paddingBottom = "20px";
        elem0.setAttribute("width", "304");
        elem0.setAttribute("height", "228");
        elem0.style.padding = "10px";
        product.appendChild(elem0);

        let name = data[teddies].name;

        let elem2 = document.createElement("p");
        elem2.innerHTML = 
        quantities + " " + name ;
        product.appendChild(elem2);

        let elem3 = document.createElement("p");
        elem3.innerHTML = "Prix total : " + array[teddies] + " €";
        elem3.style.marginBottom = "25px";
        elem3.style.color = "brown";
        product.appendChild(elem3);
        
        document.getElementById("products").appendChild(product);
    }
    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    let totalPrice = document.getElementById("finalPrice");
    totalPrice.innerHTML = "Le prix total des articles est de " + array.reduce(reducer) + "€";
    totalPrice.style.fontSize = "20px";
    totalPrice.style.color = "brown";
    totalPrice.style.fontWeight = "bold";
    console.log(array.reduce(reducer));
    
}
getPrice();



function deleteItems() {
    localStorage.clear();
  }





