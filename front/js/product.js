// récupération de l'url de la page 
const url = new URL(document.location.href);
// récupération de la partie "id" de l'url 
const idProduct = url.searchParams.get("id");
// requete de type "get" pour demander à l'API un produit en particulier ( correspondant à l'id présent dans l'url de la page) 
fetch("http://localhost:3000/api/products/" + idProduct)
// récuperation de la promise au format JSON 
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
// affichage du JSON dans la console 
    .then(function(caractéristiques){
        console.log(caractéristiques);
// appelle de la fonction pour afficher les caractéristiques du produit dans l'HTML 
        affichageCaractéristiques(caractéristiques)
    })
// déclaration de la fonction pour afficher les caractéristiques du produit dans l'HTML
function affichageCaractéristiques(value) {
    document.querySelector('article div.item__img').innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}">`;
    document.getElementById('description').innerText = value.description;
    document.getElementById('title').innerText = value.name;
    document.getElementById('price').innerText = value.price;
// création d'une boucle pour afficher les couleurs du tableau de couleurs
    for (let couleur of value.colors) {
        document.getElementById('colors').innerHTML += 
        `<option value="${couleur}">${couleur}</option>`;
}};
// création de l'objet choixProduit 
const choixProduit = {};
// ajout de la clef "_id" à l'objet "choixProduit" 
choixProduit._id = idProduct;
// définitions des variables
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
// création d'une fonction d'écoute pour récupérer la valeur de la quantité choisie(on utilise ici "parseInt" pour changer la valeur string de quantité en number)
choixQuantité.addEventListener('change', function(choix) {
    quantitéProduit = parseInt(choix.target.value);
    choixProduit.quantité = quantitéProduit;
    console.log(choixProduit)
});
// definition des variables
let validationPanier = document.getElementById('addToCart')
// création d'une fonction d'écoute qui envoie l'objet "choixProduit" dans l'array panier si les conditions sont remplies
validationPanier.addEventListener("click",function(){
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
// fonction qui envoie le contenu du panier dans le LocalStorage 
function sauverPanier(panier) {
    localStorage.setItem("Panier", JSON.stringify(panier))
}
// fonction qui récupère le contenu du LocalStorage et qui crée un array en cas de panier null
function recupPanier() {
    let panier = localStorage.getItem("Panier");
    if (panier == null) {
        return [];
    } else {
        return JSON.parse(panier)
    }
}

// définition de la fonction qui ajoute un produit dans le panier
function ajoutPanier(produit) {
    // on récupère le panier du storage pour savoir si il est vide
    let panier = recupPanier();
    // on compare l'id du produit ajouté avec le panier
    function verifId(produitPanier){
        return produitPanier._id == produit._id
     };
    let produitTrouvéParId = panier.find(verifId);
    // on compare la couleur du produit ajouté avec le panier
    function verifCouleur(produitPanier){
        return produitPanier.couleur == produit.couleur
    };
    let produitTrouvéParCouleur = panier.find(verifCouleur);
    // si le même produit est déja présent, on auguemente juste la quantité 
    if ((produitTrouvéParId != undefined) && (produitTrouvéParCouleur != undefined)) {
        alert("Attention ! Vous avez déja au moins un exemplaire de ce produit dans le panier")
        produitTrouvéParId.quantité = (produitTrouvéParId.quantité + produit.quantité);
    // sinon on l'ajoute au panier
    } else {
        panier.push(produit);
    }
    // on renvoi le tout dans le localStorage
    sauverPanier(panier);
}
console.log("tout va bien");

    