let fechaAuto = parseInt(prompt("Cual es el año de su coche"));
const actual = 2022;
let pagapatente=actual - fechaAuto;
if (pagapatente<=10) {
alert("Su auto paga patente 200 dolares");
} else {
alert ("Su auto paga patente 100 dolares");
}