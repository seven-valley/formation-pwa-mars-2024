//------------------------------------------------
// fonction creation ligne
//------------------------------------------------
const creationLigneTr = (personne) => {
  const tbody = document.querySelector("tbody");
  const template = document.getElementById("ligne");
  const clone = template.content.cloneNode(true);
  if (personne.status) {
    clone.querySelector("tr").className = "table-success";
  } else {
    clone.querySelector("tr").className = "table-danger";
  }
  console.log(clone.querySelectorAll("td"));
  clone.querySelectorAll("td")[0].innerHTML = personne.prenom;
  clone.querySelectorAll("td")[1].innerHTML = personne.nom;
  console.log(personne);
  clone.querySelector('tr').setAttribute('data-id',personne.id);
  clone.querySelector("tr").setAttribute("data-status", true);
  clone.querySelector(".btn-danger").onclick = async (evt) => {
  let id=  evt.target.closest('tr').dataset.id;
    // requete a fireabse : DELETE
    let url = database + 'personne/' + id + '.json'
   const response = await fetch(url, {
  	method: "DELETE",
  });
  const data = await response.json();
    evt.target.closest("tr").remove();
  };
  clone.querySelector(".btn-warning").onclick = async (evt) => {
    //let id = evt.target.closest("tr").dataset.id;
    //personne.status = !personne.satus;
    let status = evt.target.closest("tr").dataset.status;
    if (status == "true") {
      evt.target.closest("tr").className = "table-success";
      evt.target.closest("tr").setAttribute("data-status", false);
    } else {
      evt.target.closest("tr").className = "table-danger";
      evt.target.closest("tr").setAttribute("data-status", true);
    }
  };
  tbody.append(clone);
};
//------------------------------------------------
// fonction creation ligne
//------------------------------------------------
const database ='https://vip-montpellier-default-rtdb.europe-west1.firebasedatabase.app/';
const noeud = database+ 'personne.json';

document.getElementById("ajouter").onclick = async () => {
  const nom = document.getElementById("nom").value;
  document.getElementById("nom").value = ""; // vider input
  const prenom = document.getElementById("prenom").value;
  document.getElementById("prenom").value = ""; // vider input
  const personne = {prenom: prenom, nom: nom, status: true };
  const response = await fetch(noeud, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(personne),
});
const data = await response.json();
  const id =  data.name;
 personne.id= id;
  creationLigneTr(personne);
};

const chargement= async ()=>{
    const response = await fetch(noeud);
    const data = await response.json();
   
     // parcourir mon objet et recupérer les atttributs   cad
     let tab =[];
     for ( let id in data){
         const p = data[id]; //{prenom:...nom:...}
         p.id = id;
         creationLigneTr(p);
     }
}
chargement ();
