// On définit nos fonctions pour récupérer et renvoyer le panier dans le localStorage
function getPanier() {
    return JSON.parse(localStorage.getItem("Panier"))
};
function sauverPanier(panier) {
    localStorage.setItem("Panier", JSON.stringify(panier))
}


// On définit notre variable panier
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
    console.log("Une erreure est survenue..");  
    document.querySelector('h1').innerText = "Votre panier est vide"
  });


// definition de la fonction qui récupère les valeurs manquante
function récupValeurs (Canapés) {
    for (let produits of panier){
        // on joue la boucle "l" fois ( l = nombres de canapés différents sur le site), à chaque boucle l'indice "x" incrémente de 1
        for (let x = 0, l = Canapés.length; x < l; x++){
            // si les id matchent, on récupère l'indice et on applique les valeurs manquantent
            if (produits._id === Canapés[x]._id){
                produits.name = Canapés[x].name;
                produits.price = Canapés[x].price;
                produits.imageUrl = Canapés[x].imageUrl;
                produits.description = Canapés[x].description;
                produits.altTxt = Canapés[x].altTxt;
            }
        }
    }
    // on appelle la fonction pour afficher le panier
    affichagePanier(panier)
    // et celle pour modifier les quantités
    modifQuantité()
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


// on définit la fonction qui va modifier les quantités
function modifQuantité() {
    // on indique les zones d'ou on va écouter le changement de quantité
    const zonePanier = document.querySelectorAll('.cart__item');
    // on créé une première boucle pour chaque article présent dans la zone panier
    for (let élémentDuPanier of zonePanier) {
        // on définit notre fonction d'écoute pour le changement de quantité
        élémentDuPanier.addEventListener("change",function(q){
            // on récupère le panier sous format JS qui devient le "panier temporaire"
            let panier = JSON.parse(localStorage.getItem("Panier"));
            // on créé un deuxième boucle dans la boucle pour retrouver le canapé correspondant à la modification
            for ( let kanap of panier ) {
                // si les id et couleurs sont identiques alors..
                if ((kanap._id === élémentDuPanier.dataset.id) && (kanap.couleur === élémentDuPanier.dataset.color)){
                    // .. on modifie la quantité du canapé du "panier temporaire"
                    kanap.quantité = q.target.value;
                    // indication console pour voir l'objet se modifier
                    console.log(kanap)
                    // on renvoit le panier modifié dans le LocalStorage au format JSON
                    sauverPanier(panier)
                };
            };
        });
    };
};
console.log("tout va bien");
