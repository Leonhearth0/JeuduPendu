// A faire : fonction pour changement de difficultés + menu pour choisir
// fonction pour redémarrer partie de même difficulté
// Correction HTML  + CSS suite à modif ci-dessus

/* Variables */
let mistakes;
let wordToGuess;
let HiddenWord;
let easyWordsList = ["RESEAU", "CABLES", "SOURIS", "CLASSE", "SCRIPT"];
let mediumWordsList = ["CLAVIER", "BINAIRE", "CURSEUR", "LANGAGE", "TABLEUR"];
let hardWordsList = ["CRYPTAGE", "LOGICIEL", "DOCUMENT", "INTERNET", "MONITEUR"];
let wordLocation = document.querySelector('#wordLocation');
let HangManwebp = document.querySelector("#HangMan");
let resultLocation = document.querySelector('#resultLocation');
HangManwebp.setAttribute("src", "../assets/img/hangman_0.webp");

/*Fonctions Click*/
document.getElementById("startButtonEasy").addEventListener("click", function () {
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("gameArea").style.display = 'flex';
    document.getElementById("keyBoardTop").style.display = 'flex';
    document.getElementById("keyBoardBottom").style.display = 'flex';
    startGame(easyWordsList);
})

document.getElementById("startButtonMedium").addEventListener("click", function () {
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("gameArea").style.display = 'flex';
    document.getElementById("keyBoardTop").style.display = 'flex';
    document.getElementById("keyBoardBottom").style.display = 'flex';
    startGame(mediumWordsList);
})

document.getElementById("startButtonHard").addEventListener("click", function () {
    document.getElementById("startMenu").style.display = 'none';
    document.getElementById("gameArea").style.display = 'flex';
    document.getElementById("keyBoardTop").style.display = 'flex';
    document.getElementById("keyBoardBottom").style.display = 'flex';
    startGame(hardWordsList);
})

document.getElementById("restart").addEventListener("click", function () {
    restartGame();
    
})

/*Fonctions Jeu*/

function startGame(wordList) {
    mistakes = 0;
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    HiddenWord = "_".repeat(wordToGuess.length);
    wordLocation.textContent = HiddenWord;
}

function mistakesCalc(letterChoice) {
    let wordLocation = document.querySelector("#wordLocation");
    if (wordToGuess.includes(letterChoice)) {
        for (let j = 0; j < wordToGuess.length; j++)
            if (wordToGuess[j] === letterChoice) {
                HiddenWord = HiddenWord.substring(0, j) + letterChoice + HiddenWord.substring(j + 1)
            }
        wordLocation.textContent = HiddenWord;
        if (HiddenWord === wordToGuess) {
            resultLocation.textContent = "Bravo, vous avez trouve"
            document.getElementById("restart").style.display = 'flex';
            document.getElementById("keyBoardTop").style.display = 'none';
            document.getElementById("keyBoardBottom").style.display = 'none';
        }
    } else {
        mistakes++;
        if (mistakes > 0 && mistakes < 6) {
            HangManwebp.setAttribute("src", `./assets/img/hangman_${mistakes}.webp`)
        }
        else if (mistakes === 6) {
            HangManwebp.setAttribute("src", "../assets/img/hangman_6.webp")
            wordLocation.textContent = wordToGuess;
            resultLocation.textContent = "Le pendu est foutu";
            document.getElementById("restart").style.display = 'flex';
            document.getElementById("keyBoardTop").style.display = 'none';
            document.getElementById("keyBoardBottom").style.display = 'none';
        }
    }
}

function displayKeyboard() {
    for (let i = 65; i <= 90; i++) {
        const char = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = char;
        button.addEventListener('click', function () {
            mistakesCalc(char);
        })
        let keyBoard = i <= 77 ? document.getElementById('keyBoardTop') : document.getElementById('keyBoardBottom');
        keyBoard.appendChild(button);
    }
}

function restartGame() { /*Ramène à la sélection de la difficulté*/
    document.getElementById("restart").style.display = 'none';
    document.getElementById("gameArea").style.display = 'none';
    document.getElementById("startMenu").style.display = 'flex';
    document.getElementById("startMenu").style.justifyContent = 'center';
    resultLocation.textContent = null;
    HangManwebp.setAttribute("src", "../assets/img/hangman_0.webp");

}



displayKeyboard();

// loading = true
// fetch("https://trouve-mot.fr/api/random/10")
//     .then((response) => response.json())
//     .then((data) => {
//         loading = false
//         console.log(data)
//     })
//     .catch(error => console.error('Error:', error));

// console.log("tralala");


// async function getRandomWord() {
//     let response = await fetch("https://trouve-mot.fr/api/random/10")
//     let data = await response.json()
//     console.log(data);
//     console.log("trululu");
// }

// getRandomWord()
