let data = JSON.parse(localStorage.getItem("data"));


/*
for (let itemsToDel in data){

    let indexToRemove = Object.values(data);
    console.log(indexToRemove);

    data.slice(indexToRemove, 1);
    console.log(data);

    localStorage.setItem('data', JSON.stringify(data));

}
*/

/*
function deleteItems(){
  
    console.log(data);
    let indexToRemove = Object.values(data[0]);
    data.slice(indexToRemove, 1);
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
  

}
*/


function getPrice() {
  array = [];

  for (let teddies in data) {
    let price = data[teddies].price;
    console.log(price);
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
    elem2.innerHTML = quantities + " " + name;
    elem2.style.color = "brown";
    product.appendChild(elem2);

    let elem3 = document.createElement("p");
    elem3.innerHTML = "Prix total : " + array[teddies] + " €";
    elem3.style.marginBottom = "25px";
    elem3.style.color = "brown";
    product.appendChild(elem3);

    /*
    let elem1 = document.createElement("a");
    elem1.style.display = "block";
    elem1.innerHTML = "Supprimer le produit";
    elem1.setAttribute("href","");
    elem1.setAttribute('onclick','deleteItems()');
    product.appendChild(elem1);
    */


    document.getElementById("products").appendChild(product);
  }
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  let totalPrice = document.getElementById("finalPrice");
  totalPrice.innerHTML =
    "Le prix total des articles est de " + array.reduce(reducer) + "€";
  totalPrice.style.fontSize = "20px";
  totalPrice.style.color = "brown";
  totalPrice.style.fontWeight = "bold";
  console.log(array.reduce(reducer));
}
getPrice();





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
  let contact = new objetForm(firstName.value,lastName.value,address.value,city.value,email.value);
  let products = [];


  let dataStorage = localStorage.getItem("data");
  console.log(JSON.parse(dataStorage));
  for (let ids in data){
    let id = data[ids].id;
    console.log("id: "+id);
    products.push(id);
  }
  console.log("products[]: "+products);


  let bodyData = { contact, products };
  //console.log("bodyData: " + bodyData.contact.lastName);
  var request = new Request(url, {
    method: "POST",
    body: JSON.stringify(bodyData),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  fetch(request)
    .then(async function (res) {
      if (res.ok) {
        const pkgOrder = await res.json();
        //console.log("reponse order : "+pkgOrder);
        console.log(`Resultat de res.ok : ${res.ok}`);
        //console.log(pkgOrder.contact);
        localStorage.setItem("responseId", pkgOrder.orderId);
        //console.log(`réponse server : ${res.status}`);
        window.location = "confirmation.html"
      } else {
        console.log(`réponse server : ${res.status}`);
      }
    })
    .catch(function (error) {
      console.log("PROBLEM WITH FETCH");
    });
}

const buttonForm = document.getElementById("buttonForm");
buttonForm.addEventListener("click", send);





document.getElementById("buttonForm").disabled = true;

function checkValidity(){
  let emptyRegex = /^$/;
  let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if ((!emptyRegex.test(document.getElementById("inputName").value)) &&
     (!emptyRegex.test(document.getElementById("inputPrenom").value)) &&
     (!emptyRegex.test(document.getElementById("inputAddress").value)) &&
     (!emptyRegex.test(document.getElementById("inputCity").value)) &&
     (emailRegex.test(document.getElementById("inputEmail").value))
     ) {
    document.getElementById("buttonForm").disabled = false;
    document.getElementById("message").innerHTML = "";
  }
  else {
    document.getElementById("buttonForm").disabled = true;
    document.getElementById("message").innerHTML = "Merci de remplir tous les champs";
  }
}


document.getElementById("inputName").addEventListener("input", function(e){checkValidity()});
document.getElementById("inputPrenom").addEventListener("input", function(e){checkValidity()}); 
document.getElementById("inputAddress").addEventListener("input", function(e){checkValidity()}); 
document.getElementById("inputCity").addEventListener("input", function(e){checkValidity()});
document.getElementById("inputEmail").addEventListener("input", function(e){checkValidity()});






/*document.querySelectorAll("input").forEach(item => {addEventListener("input", function(e){checkValidity()});})*/
/*document.querySelectorAll("input").forEach(item => {addEventListener("input", function(e){checkMail()});})*/

/*function checkMail(){
  let emptyRegex = /^$/;
  let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if 

     ((emailRegex.test(document.getElementById("inputEmail").value))
     ) {
    document.getElementById("buttonForm").disabled = false;
  }
  else {
    document.getElementById("buttonForm").disabled = true;
  }
}*/

/*
tabElement = [document.getElementById("inputName"), document.getElementById("inputPrenom"), 
              document.getElementById("inputAddress"), document.getElementById("inputCity"), 
              document.getElementById("inputEmail")];
*/


