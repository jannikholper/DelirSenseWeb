//overall setup

//cannot be shortened
import {QuizController} from "../src/quizController.js";

$(document).ready(function () {
    let quizzes = document.getElementsByClassName("quizArea");
    let quizModels = [];

    let quizIndex = 0;
    for (const quiz of quizzes)
    {
        console.error(quizIndex);
        let newController = new QuizController(quiz);
        quizModels[quizIndex] = newController;
        quizIndex++;
    }

    let acc = document.getElementsByClassName("accordion");
    let i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                for (const child of this.children) {
                    if(child.classList.contains("material-icons"))
                    {
                        child.innerHTML = "add";
                    }
                }
                panel.style.display = "none";
            } else {
                for (const child of this.children) {
                    if(child.classList.contains("material-icons"))
                    {
                        child.innerHTML = "remove";
                    }
                }
                panel.style.display = "block";
            }
        });
    }

    //Mode Tabs sind gerade auskommentiert 
    let infoArea = document.querySelector('#infoArea');
    let quizArea = document.querySelector('#quizArea');
    let infoButton = document.querySelector('#infoButton');
    let quizButton = document.querySelector('#quizButton');

    infoArea.style.display = mode === "Learn" ? 'block' : 'none';
    quizArea.style.display = mode === "Learn" ? 'none' : 'block';
    infoButton.className =   mode === "Learn" ? infoButton.classList.add("active") :infoButton.className.replace(" active", "");
    quizButton.className =   mode === "Learn" ? quizButton.className.replace(" active", ""): quizButton.classList.add("active");

    let tablinks;

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
});

