// variables 
const url = new URL(document.location.href);
const commandNumber = url.searchParams.get("commande");
// show commandNumber in the HTML of "confirmation" page
document.getElementById('orderId').innerHTML = `</br> ${commandNumber}`