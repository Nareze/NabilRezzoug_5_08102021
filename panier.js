let data = JSON.parse(localStorage.getItem("data"));
console.log(data);

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

function deleteItems() {
  localStorage.clear();
}



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


