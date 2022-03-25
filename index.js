const starting_min = 10;
let time = starting_min * 60;
var questindex = 0;

// interval Driven Variable
var stop = 0;
// Result Variables
var CorrAns = 0;
var inCorrAns = 0;

const countdownEl = document.querySelector("#tim");

// Access All Classes elements
const startquiz = document.querySelector(".startquiz");
const quizbox = document.querySelector(".quizbox");
const quetext = document.getElementById("quetext");
const optionsbox = quizbox.querySelector(".options");
const opt = optionsbox.querySelector(".option");
const nxtbtn = quizbox.querySelector(".nxtbtn");
const resultbox = document.querySelector(".resultbox");

/// Result Box Elements
const tot_que = resultbox.querySelector(".tot-que");
const Corr = resultbox.querySelector(".right-que");
const Wrng = resultbox.querySelector(".wrong-que");
const quenum = quizbox.querySelector(".footerl");
const exit = resultbox.querySelector(".exit");

// Countdown Function
function updatecount() {
    if (stop == 1) {
        var min = Math.floor(time / 60);
        let sec = time % 60;
        sec = sec < 10 ? '0' + sec : sec;
        if (min > 2) {
            countdownEl.innerHTML = `${min} : ${sec} Times left`
        } else {
            document.getElementById("tim").style.background = "red";
            countdownEl.innerHTML = `${min} : ${sec} Times left`
        }

        if (time == 0) {
            countdownEl.innerHTML = `Times Up!`;
            ShowRes();
        }
        if (time > 0) {
            time--;
        } else {
            stop = 0;
            time = starting_min * 60;
            clearInterval(id);
        }
    }
}

// Start Button Click event
startquiz.onclick = () => {

        stop = 1;
        CorrAns = 0;
        inCorrAns = 0;
        questindex = 0;
        time = starting_min * 60;
        document.getElementById("tim").style.background = "lime";
        var id = setInterval(updatecount, 1000);

        nxtbtn.classList.add("inactive");
        quizbox.classList.remove("inactive");
        startquiz.classList.add("inactive");
        showQue(questindex);

    }
    /// Questions from Que.js 
function showQue(questindex) {

    quetext.innerText = questindex + 1 + ". " + questions[questindex].question;
    quenum.innerText = questions[questindex].num + " of " + questions.length + " Questions.";
    var option_state = "";
    for (var i = 0; i < questions[questindex].option.length; i++) {
        option_state += "<div class='option'>" + questions[questindex].option[i] + "</div>";
    }
    optionsbox.innerHTML = option_state;

    var allOpt = optionsbox.querySelectorAll(".option");

    for (var j = 0; j < allOpt.length; j++) {
        allOpt[j].setAttribute("onclick", "UserAns(this)");
    }

}

// Next Button Onclick Click Event

nxtbtn.onclick = () => {
    questindex++;
    optionsbox.classList.remove("disabled");
    if (questions.length > questindex) {
        showQue(questindex);
    }
    if (questindex == questions.length - 1) {
        nxtbtn.innerHTML = "Finish";
    }
    if (questindex == questions.length) {
        ShowRes();
    }
    nxtbtn.classList.add("inactive");
}

// User Answer 

function UserAns(answer) {
    answer.classList.add("selected");
    nxtbtn.classList.remove("inactive");
    optionsbox.classList.add("disabled");
    let UAns = answer.innerText;
    let correct = questions[questindex].answer;
    if (UAns == correct) {
        CorrAns++;
    } else {
        inCorrAns++;
    }
}

// Show Result Classes Access

function ShowRes() {
    quizbox.classList.add("inactive");
    resultbox.classList.remove("inactive");
    tot_que.innerHTML = `Total Questions : ${questions.length}`;
    Corr.innerHTML = `Correct Answer : ${CorrAns}`;
    Wrng.innerHTML = `Incorrect Answer : ${inCorrAns}`;
}

// Exit Functions
exit.onclick = () => {
    stop = 0; //Stop The Interval
    CorrAns = 0;
    inCorrAns = 0;
    questindex = 0;
    countdownEl.innerHTML = `10:00`;

    nxtbtn.innerHTML = "Next Question";
    resultbox.classList.add("inactive");
    startquiz.classList.remove("inactive");

}