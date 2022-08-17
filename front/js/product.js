const url = new URL(document.location.href);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
const urlID = "http://localhost:3000/api/products/" + idProduct;
fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(caractéristiques){
        console.log(caractéristiques);
        affichageCaractéristiques(caractéristiques)
    })

function affichageCaractéristiques(value) {
    document.getElementsByClassName('item__img').innerHTML = `<img src="value.imageUrl" alt="value.altTxt">`;
    document.getElementById('description').innerText = value.description;
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;
    for (let couleur of value.colors) {
        document.getElementById('colors').innerHTML += `<option value="${couleur}">${couleur}</option>`
    }
}   



    