// get basket from localStorage
function getPanier() {
    return JSON.parse(localStorage.getItem("Panier"))
};
// save basket to localStorage
function sauverPanier(panier) {
    localStorage.setItem("Panier", JSON.stringify(panier))
};
// Variables
let panier = getPanier()
let panierId = [];
// get values from API with fetch
function getValuesFetch() {
  fetch("http://localhost:3000/api/products/")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(Canapés) {
      console.table(Canapés);
      récupValeurs(Canapés);
    })
    .catch(function(err) {
      console.log("Une erreure est survenue.." + err);  
      document.querySelector('h1').innerText = "Votre panier est vide"
    });
  }
// get missing values
function récupValeurs (Canapés) {
    for (let produits of panier){
        for (let x = 0, l = Canapés.length; x < l; x++){
            if (produits._id === Canapés[x]._id){
                produits.name = Canapés[x].name;
                produits.price = Canapés[x].price;
                produits.imageUrl = Canapés[x].imageUrl;
                produits.description = Canapés[x].description;
                produits.altTxt = Canapés[x].altTxt;
            }
        }
    }
    affichagePanier(panier);
    modifQuantité()
    supprimerArticle()
    calculPrix()
};
// show basket on the "cart" page
function affichagePanier(panier){
    let zoneHTML = document.getElementById("cart__items");
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
// change the quantity of a product from basket
function modifQuantité() {
    let zonePanier = document.querySelectorAll('.cart__item');
    console.log(zonePanier)
    for (let élémentDuPanier of zonePanier) {
        élémentDuPanier.addEventListener("change",function(q){
            let panier = JSON.parse(localStorage.getItem("Panier"));
            console.log(panier)
            for ( let kanap of panier ) {
                // validate conditions
                if (
                  (kanap._id === élémentDuPanier.dataset.id) && 
                  (kanap.couleur === élémentDuPanier.dataset.color) && 
                  (q.target.value > 0) && 
                  (q.target.value < 100)
                  ){
                    kanap.quantité = q.target.value;
                    alert('Quantité modifiée !')
                    sauverPanier(panier);
                } else if (
                  (kanap._id === élémentDuPanier.dataset.id) && 
                  (kanap.couleur === élémentDuPanier.dataset.color)
                  ){
                    alert("Veuillez renseigner une quantité allant de 1 à 100")
                }
            }
        })
      }
  };
        
// delete a product from basket
function supprimerArticle () {
  let zonePanier = document.querySelectorAll('.cart__item .deleteItem');
  for (let élémentDuPanier of zonePanier) {
    élémentDuPanier.addEventListener('click', function(){
      let panier = getPanier();
      for (let x = 0, l = panier.length; x < l; x++) {
        if ((panier[x]._id === élémentDuPanier.dataset.id) && (panier[x].couleur === élémentDuPanier.dataset.color)){
          panier.splice(x, 1);
          alert('Article supprimé !')
          sauverPanier(panier);
          location.reload()
        }
      }
    })
  }
  // special case with empty basket
  if (panier.length == 0){
    document.querySelector('h1').innerText = "Votre panier est vide";
  } 
}
// total price calculation 
function calculPrix(){
  let totalPrix = 0;
  let totalArticle = 0;
  let zonePanier = document.querySelectorAll('.cart__item');
  for (let élémentDuPanier of zonePanier){
    totalPrix += (élémentDuPanier.dataset.price * élémentDuPanier.dataset.quantité);
    totalArticle += parseInt(élémentDuPanier.dataset.quantité);
    document.getElementById('totalPrice').innerText = totalPrix;
    document.getElementById('totalQuantity').innerText = totalArticle;

  }
}
// call
getValuesFetch()
désactiverBouton(true)
// RegEx for "Prénom"
document.getElementById('firstName').addEventListener('input', function(event) {
  if (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(event.target.value)){
    document.getElementById('firstNameErrorMsg')
    .innerText = '';
    désactiverBouton(false)
  } else {
    document.getElementById('firstNameErrorMsg')
    .innerText = 'Vous avez utilisé des caractères spéciaux.';
    désactiverBouton(true)
  }
})
// RegEx for "Nom"
document.getElementById('lastName').addEventListener('input', function(event) {
  if (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(event.target.value)){
    document.getElementById('lastNameErrorMsg')
    .innerText = '';
    désactiverBouton(false)
  } else {
    document.getElementById('lastNameErrorMsg')
    .innerText = 'Vous avez utilisé des caractères spéciaux.';
    désactiverBouton(true)
  }
})
// RegEx for "Adresse"
document.getElementById('address').addEventListener('input', function(event) {
  if (/^[A-Za-z0-9/'\.\-\s\,]+$/.test(event.target.value)){
    document.getElementById('addressErrorMsg')
    .innerText = '';
    désactiverBouton(false)
  } else {
    document.getElementById('addressErrorMsg')
    .innerText = 'Vous avez utilisé des caractères spéciaux.';
    désactiverBouton(true)
  }
})
// RegEx for "Ville"
document.getElementById('city').addEventListener('input', function(event) {
  if (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(event.target.value)){
    document.getElementById('cityErrorMsg')
    .innerText = ''
    désactiverBouton(false)
  } else {
    document.getElementById('cityErrorMsg')
    .innerText = 'Vous avez utilisé des caractères spéciaux.';
    désactiverBouton(true)
  }
})
// RegEx for "Email"
document.getElementById('email').addEventListener('change', function(event) {
  if (/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(event.target.value)){
    document.getElementById('emailErrorMsg')
    .innerText = '';
    désactiverBouton(false)
  } else {
    document.getElementById('emailErrorMsg')
    .innerText = "Veuillez renseigner une adresse E-mail correcte s'il vous plait.";
    désactiverBouton(true)
  }
})
// desactivate submit button 
function désactiverBouton (désactiver) {
  if (désactiver) {
    document.getElementById('order')
    .setAttribute('disabled', true);
    document.getElementById('order')
    .style.opacity = ".5"
  } else {
    document.getElementById('order')
    .removeAttribute('disabled');
    document.getElementById('order')
    .style.opacity = "1"
  }
}
// get the id's of basket products for the post request
function récupIdPanier() {
  let panier = JSON.parse(localStorage.getItem("Panier"));
  if (panier && panier.length > 0) {
    for (let article of panier) {
      panierId.push(article._id);
    }
  } 
}
// post request to the API for the order
function PostFetch (commande) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commande)
  })
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    // change current url to "confirmation" one
    .then(function(data) {
      window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`
    })
    .catch(function(err) {
    console.log(err)
    })
}
// submit the order when click the button
document.getElementById('order').addEventListener('click', function(event) {
  event.preventDefault();
  récupIdPanier();
  // client variables
  let prénom = document.getElementById('firstName');
  let nom = document.getElementById('lastName');
  let adresse = document.getElementById('address');
  let ville = document.getElementById('city');
  let email = document.getElementById('email');
  // order
  let commande = {
    contact:{
      firstName: prénom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: email.value,
    },
    products: panierId,
  } ;
  PostFetch(commande)
});