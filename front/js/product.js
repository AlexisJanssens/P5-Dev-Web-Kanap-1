// variables
const url = new URL(document.location.href);
const idProduct = url.searchParams.get("id");
const choixProduit = {};
let choixCouleur = document.getElementById('colors');
let couleurProduit ;
let choixQuantité = document.getElementById('quantity');
let quantitéProduit ;
let validationPanier = document.getElementById('addToCart');


// get product details from API
function getProductDetails (){
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
    }
// show details on the "product" page
function affichageCaractéristiques(value) {
    document.querySelector('article div.item__img').innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
    document.getElementById('description').innerText = value.description;
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;
    for (let couleur of value.colors) {
        document.getElementById('colors').innerHTML += 
        `<option value="${couleur}">${couleur}</option>`;
}};
// call
getProductDetails();
// add "_id" key to "choixProduit" object 
choixProduit._id = idProduct;
// event listener for color chosen
choixCouleur.addEventListener("change", function(choix) {
    couleurProduit = choix.target.value;
    choixProduit.couleur = couleurProduit;
    console.log(choixProduit)
});
// event listener for quantity chosen
choixQuantité.addEventListener('change', function(choix) {
    quantitéProduit = parseInt(choix.target.value);
    choixProduit.quantité = quantitéProduit;
    console.log(choixProduit)
});
// validation conditions for push the product on the basket
validationPanier.addEventListener("click",function() {
    if (
        choixProduit.quantité < 1 ||
        choixProduit.quantité > 100 ||
        choixProduit.quantité == undefined ||
        choixProduit.couleur == undefined ||
        choixProduit.couleur == "" 
    ){
        alert("Veuillez renseigner une couleur et un nombre de 1 à 100")
    } else {
    ajoutPanier(choixProduit)
}})
// save basket on localStorage
function sauverPanier(panier) {
    localStorage.setItem("Panier", JSON.stringify(panier))
}
// get basket from localStorage
function recupPanier() {
    let panier = localStorage.getItem("Panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier)
    }
}

// push product on the basket
function ajoutPanier(produit) {
    let panier = recupPanier();
    // compare id's
    function verifId(produitPanier){
        return produitPanier._id == produit._id
     };
    let produitTrouvéParId = panier.find(verifId);
    // compare colors
    function verifCouleur(produitPanier){
        return produitPanier.couleur == produit.couleur
    };
    let produitTrouvéParCouleur = panier.find(verifCouleur);
    // add product to an existing one, create a new one or refuse
    if ((produitTrouvéParId != undefined) && (produitTrouvéParCouleur != undefined) && ((parseInt(produitTrouvéParCouleur.quantité) + produit.quantité)) > 100) {
        alert("Attention ! Le total ne peut pas être supérieur à 100")

    } else if ((produitTrouvéParId != undefined) && (produitTrouvéParCouleur != undefined)) {
        alert("Attention ! Vous avez déja au moins un exemplaire de ce produit dans le panier")
        produitTrouvéParCouleur.quantité = (parseInt(produitTrouvéParCouleur.quantité) + produit.quantité);
        alert("Article ajouté !")

    } else {
        panier.push(produit);
        alert("Article ajouté !")
    }
    // sort basket before save on localStorage
    panier.sort(function compare(a, b) {
        if (a._id  > b._id)
            return -1;
        if (a._id > b._id)
            return 1;
        return 0;
    });
    sauverPanier(panier);
}
console.log("tout va bien");

    