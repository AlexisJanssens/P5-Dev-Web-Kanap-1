// récupération de l'url de la page 
const url = new URL(document.location.href);
// récupération de la partie "id" de l'url 
const commandNumber = url.searchParams.get("commande");

console.log(commandNumber)
// on modifie l'HTML pour afficher le numéro de commande
document.getElementById('orderId').innerHTML = `</br> ${commandNumber}`