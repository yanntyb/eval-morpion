let global = document.getElementById("global");
const reset = document.getElementsByTagName("button")[0];
const ia = document.getElementsByTagName("button")[1];
const notIa = document.getElementsByTagName("button")[2];

let player1 = document.getElementById("player1").getElementsByTagName("span")[0];
let player2 = document.getElementById("player2").getElementsByTagName("span")[0];
let turn = document.getElementById("turn").getElementsByTagName("span")[0];

let player = 1;
let ordi = false;


/*Creation de la grille de jeu*/
function initGame() {
    let game = document.createElement("div");
    game.id = "game";

    for (let i = 0; i < 9; i++) {
        let slot = document.createElement("div");
        let slotSpan = document.createElement("span");
        slot.appendChild(slotSpan);
        slot.className = "slot";
        game.appendChild(slot);
    }

    return game;
}

/*Affichage selon le player*/
function affichage(player) {
    let icone = document.createElement("i");

    if (player === 1) {
        icone.className = "fas fa-dizzy " + player;
        turn.innerHTML = "C'est le tour du joueur " + player;
    } else {
        icone.className = "far fa-dizzy " + player;
        turn.innerHTML = "C'est le tour du joueur " + 2;
    }
    return icone;
}

/*Ajout des events click sur case*/
function eventSlot() {
    let slot = document.getElementsByClassName("slot");
    for (let i of slot) {
        i.addEventListener("click", function () {
            let span = i.getElementsByTagName("span")[0];
            if (span.innerHTML === "") {
                span.appendChild(affichage(player));
                player *= -1;
            }
            if (ordi) {
                window.setTimeout(function (){
                    ordiSelect()
                    player *= -1;
                },500);
            }
            checkWin(slot);
        });
    }
}


function ordiSelect() {
    let slot = document.getElementsByClassName("slot");
    let random = Math.trunc(Math.random()* 9) ;
    while (slot[random].getElementsByTagName("span")[0].getElementsByTagName("i").length > 0) {
        random = Math.trunc(Math.random()* 9) ;
    }
    slot[random].getElementsByTagName("span")[0].appendChild(affichage(player));
}

function resetGame(resetScore) {
    let grille = document.getElementById("game");
    let global = document.getElementById("global");
    global.removeChild(grille);
    global.prepend(initGame());
    if (resetScore) {
        player1.innerHTML = 0;
        player2.innerHTML = 0
    }
    eventSlot();
    return global;
}

/*Ajout de l'event reset de partie*/
function resetButton() {
    reset.addEventListener("click", function () {
        return resetGame(true);
    })
}

/*Ajout de l'event pour choisir ia ou player ( bouton)*/
function ordiOuPlayer(){
    ia.addEventListener("click",function (){
        ordi = true;
    });
    notIa.addEventListener("click", function(){
        ordi = false;
    })
}

/*Verifie si 3 cases cochées sont alignées*/
function checkWin(grille) {
    let tab = [];
    for (let i of grille) {
        let classe = i.getElementsByTagName("i")[0]
        if (classe === undefined) {
            classe = undefined;
        } else {
            classe = classe.className.split(" ")[2]
        }
        tab.push(classe);
    }
    if (tab[0] === tab[1] && tab[1] === tab[2] && tab[0] !== undefined) {
        addPoint(tab[0]);
    } else if (tab[3] === tab[4] && tab[4] === tab[5] && tab[3] !== undefined) {
        addPoint(tab[3]);
    } else if (tab[6] === tab[7] && tab[7] === tab[8] && tab[6] !== undefined) {
        addPoint(tab[6]);
    } else if (tab[0] === tab[3] && tab[3] === tab[6] && tab[0] !== undefined) {
        addPoint(tab[0]);
    } else if (tab[1] === tab[4] && tab[4] === tab[7] && tab[1] !== undefined) {
        addPoint(tab[1]);
    } else if (tab[2] === tab[5] && tab[5] === tab[8] && tab[2] !== undefined) {
        addPoint(tab[2]);
    } else if (tab[0] === tab[4] && tab[4] === tab[8] && tab[0] !== undefined) {
        addPoint(tab[0]);
    } else if (tab[2] === tab[4] && tab[4] === tab[6] && tab[2] !== undefined) {
        addPoint(tab[2]);
    }
}

function addPoint(player) {
    if (player === "1") {
        player1.innerHTML = parseInt(player1.innerHTML) + 1;
    } else {
        player2.innerHTML = parseInt(player2.innerHTML) + 1;
    }
    global = resetGame();
}

/*initialisation de la partie*/
global.prepend(initGame());
global = resetButton();
ordiOuPlayer();
eventSlot();
