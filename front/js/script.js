fetch("http://localhost:3000/api/products/")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(Canapés) {
    console.table(Canapés);
    
    affichageCanapés(Canapés);
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

function affichageCanapés(Canapés) {
    let créationCartes = document.getElementById('items');
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

    

