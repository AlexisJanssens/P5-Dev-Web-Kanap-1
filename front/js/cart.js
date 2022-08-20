// On récupère le panier du localStorage au format JS sous forme d'array 
function getPanier() {
    return JSON.parse(localStorage.getItem("Panier"))
};
// On définit notre variable
let panier = getPanier()
// On envoie une requte "get" pour récupérer la liste complete des Canapés en vente
fetch("http://localhost:3000/api/products/")
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(Canapés) {
    console.table(Canapés);
    // on appelle la fonction qui va récupérer les valeurs manquante et les afficher
    récupValeurs(Canapés);
  })
  // on intercepte en cas d'erreur
  .catch(function(err) {
    console.log("Une erreure est survenue..")
  });
// definition de la fonction qui récupère les valeurs manquante
function récupValeurs (Canapés) {
    for (let produits of panier){
        // on joue la boucle "h" fois ( h = nombres de canapés différents sur le site), à chaque boucle l'indice "x" incrémente de 1
        for ( let x = 0, l = Canapés.length; x < l; x++){
            // si les id matchent, on récupère l'indice et on applique les valeurs manquantent
            if (produits._id === Canapés[x]._id){
                produits.name = Canapés[x].name;
                produits.price = Canapés[x].price;
                produits.imageUrl = Canapés[x].imageUrl;
                produits.description = Canapés[x].description;
                produits.altTxt = Canapés[x].altTxt;
                console.log("verif effectuée");
            }
        }
    }
    // on appelle la fonction pour afficher le panier
    affichagePanier(panier)
};


// fonction d'affichage du panier
function affichagePanier(panier){
    // on définit la zone pour l'affichage
    let zoneHTML = document.getElementById("cart__items");
    // on créé la boucle qui va modifier l'HTML
    for (let produits of panier) {
        zoneHTML.innerHTML += `
        <article class="cart__item" data-id="${produits._id}" data-color="${produits.couleur}">
        <div class="cart__item__img">
          <img src="${produits.imageUrl}" alt="${produits.altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${produits.name}</h2>
            <p>${produits.couleur}</p>
            <p>${produits.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produits.quantité}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    }
};

console.log(panier);