/* 
PRIMA CONSEGNA

https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.7/axios.min.js

Milestone 1
.. DONE Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS 
.. DONE e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
.. DONE add shadow to posts (col)

Milestone 2
.. DONE Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.

Milestone 3
.. DONE Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!

PHOTOS NOT LOADING ****

Bonus
.. DONE rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata 
Note: Non siete obbligati a usare Bootstrap: siete liberi di decidere come gestire lo stile 
*/

/* 
SECONDA CONSEGNA 
Milestone 1
.. DONE Facciamo in modo di creare un overlay che copra l’intera pagina e all’interno, centrata, disponiamo un’immagine qualunque ed un button di chiusura.

Milestone 2
.. DONE Facciamo sparire l’overlay con l’aiuto di una classe CSS che imposti il display: none .
.. DONE Dopodiché facciamo sì che cliccando una qualunque foto (post). L’overlay ricompaia.
.. DONE Cliccando invece il button di chiusura, l’overlay scompare nuovamente.

Milestone 3
.. DONE Inseriamo il pezzo di logica finale: quando una foto viene cliccata, dobbiamo fare in modo che sia proprio quella foto a essere mostrata all’interno dell’overlay.
Ci sono diversi modi di farlo, prova a sperimentare 

Bonus
.. Spostandosi col mouse sopra le foto, queste si zoommano, ruotano di 10 gradi e la loro ombra aumenta, il tutto in manierà fluida. 
.. DONE Inoltre il mouse diventa un puntatore, per far capire all’utente che può cliccare
*/


const rowElm = document.querySelector(".row");
const overlayElm = document.getElementById("image-overlay");
const overlayImgElm = document.getElementById("overlay-img");
const closeBtnElm = document.getElementById("close-btn");

axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6").then((res) => {
    const photos = res.data; // creates photos as the data from website above 
    photos.forEach((photo) => { // customizes a post for the data in each photo accessed from the website (total of 6)
        console.log(photo); // lets me check each object (photo)
        rowElm.innerHTML += // customizes each post 
        `
            <div class="col">
                <div id="post" class="bg-white">
                    <div id="post-container">
                        <img src="img/pin.svg" alt="pin" class="pushpin">
                        <div id="post-photo" class="d-flex justify-content-center align-items-center">
                            <img id="post-img" class="post-img" src="${photo.url}" alt="${photo.title}">
                            <div class="dimensions d-none">600 x 600</div>
                        </div>
                        <p id="post-caption">${photo.title}</p>
                    </div>
                </div>
            </div>   
        `;
    });

    const posts = document.querySelectorAll(".col") // gets posts - as we want the overlay to display when anywhere on each post is clicked, I have opted to select all .col 
    console.log(posts); // allows me to check NodeList in console (all 6 are present)

    posts.forEach((post) => { // arrow function that makes each post clickable, displaying overlay with the clicked post's image and alt 
        console.log(post); // allows me to check that the information is correctly accessed 

        post.addEventListener("click", () => {
            const postImgElm = post.querySelector(".post-img"); // gets postImg in order to access src and alt
            overlayElm.style.display = "flex"; // displays overlay when post is clicked
            overlayImgElm.src = postImgElm.src; // syncs overlay photo to post photo which is clicked
            overlayImgElm.alt = postImgElm.alt; // syncs overlay alt to clicked post photo alt 
        })        
    })
});

closeBtnElm.addEventListener("click", () => {
    overlayElm.style.display = "none"; // closes overlay
}); 
