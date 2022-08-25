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
    supprimerArticle()
    calculPrix()
};


// fonction d'affichage du panier
function affichagePanier(panier){
    // on définit la zone pour l'affichage
    let zoneHTML = document.getElementById("cart__items");
    // on créé la boucle qui va modifier l'HTML ( on rajoute également des data-id et data-color pour la balise .deleteItem)
    for (let produits of panier) {
        zoneHTML.innerHTML += `
        <article class="cart__item" data-id="${produits._id}" data-color="${produits.couleur}" data-price="${produits.price}" data-quantité="${produits.quantité}">
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
              <p class="deleteItem" data-id="${produits._id}" data-color="${produits.couleur}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
    }
};

// on définit la fonction qui va modifier les quantités
function modifQuantité() {
    // on indique les zones d'ou on va écouter le changement de quantité
    let zonePanier = document.querySelectorAll('.cart__item');
    console.log(zonePanier)

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
                    console.log(kanap);
                    alert('Quantité modifiée !')
                    // on renvoit le panier modifié dans le LocalStorage au format JSON
                    sauverPanier(panier);
                    location.reload();
                };
            };
        });
    };
};


// définition de la fonction pour supprimer un élément du panier
function supprimerArticle () {
  // on définit la zone sur lequel on va lancer la fonction d'écoute par après
  let zonePanier = document.querySelectorAll('.cart__item .deleteItem');
  // on lance une boucle qui jouée pour chaque article de la 'zonePanier'
  zonePanier.forEach(function(élémentDuPanier) {
    // on définit une fonction d'écoute qui va se déclencher dès qu'on clique sur 'supprimer'
    élémentDuPanier.addEventListener('click', function(){
      // on définit notre variable qui récupère le panier du localStorage
      let panier = getPanier();
      // on définit une deuxième boucle qui va jouer 'l' fois (taille du panier) 
      for (let x = 0, l = panier.length; x < l; x++) {
        // si les id et couleurs des canapés du panier matchent avec les 'data-set' alors..
        if ((panier[x]._id === élémentDuPanier.dataset.id) && (panier[x].couleur === élémentDuPanier.dataset.color)){
          // ...on supprime l'"élémentDuPanier" du "panier"
          panier.splice(x, 1);
          alert('Article supprimé !')
          // et renvoie le tout dans le localStorage
          console.log(panier.length)
          sauverPanier(panier);
          // on recharge la page pour actualiser l'HTML
          location.reload()
        }
      }
    })
  }) 
  // si le panier est vide on modifie le 'h1'
  if (panier.length == 0){
    document.querySelector('h1').innerText = "Votre panier est vide";
  } 
}

// définition de la fonction pour calculer le prix total et de la quantité d'articles du panier 
function calculPrix(){
  // définition des 2 variables
  let totalPrix = 0;
  let totalArticle = 0;
  // on définit la zone sur lequel faire la boucle
  let zonePanier = document.querySelectorAll('.cart__item');
  // on définit la boucle
  for (let élémentDuPanier of zonePanier){
    // on modifie notre variable de prix en fonction du nbre d'articles et des prix respectifs
    totalPrix += (élémentDuPanier.dataset.price * élémentDuPanier.dataset.quantité);
    // on modifie notre variable de quantité en fonction des nbrs d'articles
    totalArticle += parseInt(élémentDuPanier.dataset.quantité);
    // on ajoute notre variable dans l'affichage des prix
    document.getElementById('totalPrice').innerText = totalPrix;
    // on ajoute notre variable dans l'affichage de la quantité
    document.getElementById('totalQuantity').innerText = totalArticle;

  }
}

// console.log("tout va bien");
// QUESTIONS ? 
//
