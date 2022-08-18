// requête de type "get" pour récupérer l'ensemble des produits sous forme de tableau //
fetch("http://localhost:3000/api/products/")
// récupération de la promise au format JSON
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
// récupération dans la console du JSON dans la console sous forme de tableau
  .then(function(Canapés) {
    console.table(Canapés);
//appelle de la fonction pour l'affichage des produits sur la page d'accueil
    affichageCanapés(Canapés);
  })
//affichage d'une erreure en cas de problèmes
  .catch(function(err) {
    console.log("Une erreure est survenue..")
  });

//déclaration de la fonction pour afficher les produits sur la page d'accueil
function affichageCanapés(Canapés) {
    let créationCartes = document.getElementById('items');
// création d'une boucle qui créé l'HTML pour chaque "kanap" du tableau "Canapés"
    for (let kanap of Canapés) {
        créationCartes.innerHTML += `
          <a href="./product.html?id=${kanap._id}">
            <article>
              <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
              <h3 class="productName">${kanap.name}</h3>
              <p class="productDescription">${kanap.description}</p>
            </article>
          </a>`;
    }
}

    

