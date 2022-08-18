// récupération de l'url de la page //
const url = new URL(document.location.href);
// récupération de la partie "id" de l'url //
const idProduct = url.searchParams.get("id");
// requete de type "get" pour demander à l'API un produit en particulier ( correspondant à l'id présent dans l'url de la page) //
fetch("http://localhost:3000/api/products/" + idProduct)
// récuperation de la promise au format JSON //
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
// affichage du JSON dans la console //
    .then(function(caractéristiques){
        console.log(caractéristiques);
// appelle de la fonction pour afficher les caractéristiques du produit //
        affichageCaractéristiques(caractéristiques)
    })
// déclaration de la fonction pour afficher les caractéristiques du produit//
function affichageCaractéristiques(value) {
    document.querySelector('article div.item__img').innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
    document.getElementById('description').innerText = value.description;
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;
// création d'une boucle pour afficher les couleurs du tableau de couleurs//
    for (let couleur of value.colors) {
        document.getElementById('colors').innerHTML += 
        `<option value="${couleur}">${couleur}</option>`;
}};
// création de l'objet choixProduit //
let choixProduit = {};
// ajout de la clef "_id" à l'objet "choixProduit" //
choixProduit._id = idProduct;
//définitions des variables
let choixCouleur = document.getElementById('colors');
let couleurProduit ;
let choixQuantité = document.getElementById('quantity');
let quantitéProduit ;
// création d'une fonction d'écoute pour récupérer la valeur de la couleur choisie
choixCouleur.addEventListener("change", function(choix) {
    couleurProduit = choix.target.value;
    choixProduit.couleur = couleurProduit;
    console.log(choixProduit)
});
// création d'une fonction d'écoute pour récupérer la valueur de la quantité choisie
choixQuantité.addEventListener('change', function(choix) {
    quantitéProduit = choix.target.value;
    choixProduit.quantité = quantitéProduit;
    console.log(choixProduit)
});

let panier = [];

let validationPanier = document.getElementById('addToCart')

validationPanier.addEventListener("click",function(ajout){
    panier.push(choixProduit);
    console.log(panier);
})

console.log("tout va bien");
ok
    