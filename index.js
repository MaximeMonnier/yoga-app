const main = document.querySelector("main");
const basicArray = [
    { pic: 0, min: 1 },
    { pic: 1, min: 1 },
    { pic: 2, min: 1 },
    { pic: 3, min: 1 },
    { pic: 4, min: 1 },
    { pic: 5, min: 1 },
    { pic: 6, min: 1 },
    { pic: 7, min: 1 },
    { pic: 8, min: 1 },
    { pic: 9, min: 1 },
    ];
let exerciceArray = [];

// Get stored exercice array
(() => {
    if(localStorage.exercices) {
        exerciceArray = localStorage.exercices
    } else {
        exerciceArray = basicArray;
    }
})();

class Exercice {}

const utils = {
pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
},

handleEventMinutes: function() {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
        input.addEventListener('input', (e) => {
            exerciceArray.map((exo) => {
                if(exo.pic == e.target.id) {
                    exo.min = parseInt(e.target.value);
                    this.store(); 
                }
            })
        })
    })
},

handleEventArrow: function () {
    document.querySelectorAll('.arrow').forEach((arrow) => {
        arrow.addEventListener("click", (e) => {
            let position = 0;
            exerciceArray.map((exo) => {
                if (exo.pic == e.target.dataset.pic && position !== 0){
                    [exerciceArray[position], exerciceArray[position - 1]] = [exerciceArray[position - 1], exerciceArray[position],];
                    page.lobby();
                    this.store();
                } else {
                    position ++;
                }
            })
        })
    })
},

deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const newArr = exerciceArray.filter((exo) => exo.pic != e.target.dataset.pic);
            exerciceArray = newArr;
            page.lobby(); 
            this.store();
        })
    })
},

reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.store();
},

store: function() {
    localStorage.exercices = JSON.stringify(exerciceArray);
}

};

const page = {
    lobby: function () {
        let marArray = exerciceArray.map((exo) => {
        return    `
            <li>
                <div class="card-header">
                    <input type="number" id=${exo.pic} min="1" value=${exo.min}
                    <span>min</span>
                </div>
                <img src="./img/${exo.pic}.png"/>
                <i class="fi fi-rr-arrow-small-left arrow" data-pic=${exo.pic}></i> 
                <i class='fi fi-br-cross deleteBtn' data-pic=${exo.pic}></i>
            </li>
            `
        })
        .join("");

        utils.pageContent(
            "Paramétrage <i id='reboot' class='fi fi-rr-refresh'></i>",
            "<ul>" + marArray + "</ul>",
            "<button id='start'>Commencer<i class='fi fi-br-play'></i></button>"
        )
        utils.handleEventMinutes();
        utils.handleEventArrow();
        utils.deleteItem();
        reboot.addEventListener('click', () => utils.reboot());    
    },

    routine: function(){
        utils.pageContent(
            "Routine",
            "Exercice avec chrono",
            null
        );
    },

    finish:function () {
        utils.pageContent(
            "C'est terminer",
            "<button id='start'>Recommencer</button>",
            "<button id='reboot' class='btn-reboot'> Réinitialiser <i class='fi fi-br-cross'></i></button>"
        )
    }
};

page.lobby();
