var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var highScrList= get("highScr");
var timeLeft;
var choices;
var choice;
var correct=0;
var currentQuestion = 0;
var question, chA, chB, chC ;
var timeLeft = 20;
// short cut code, more easy to get varible
function get(x){
    return document.getElementById(x);
}    

// add start button
get("button").addEventListener("click", function() {
    countdown();
    displayquizz();
})

//add hight scores button
get("highScr").addEventListener("click", function() {
    highScrList.innerHTML='<p>Highest is </p>'+ correct;
})


// timer
timerEl.innerHTML = 'time: 30 seconds';
var timeInterval;
function countdown() {
    var timeInterval = setInterval(function () {
        if (timeLeft === 0 || currentQuestion >= myQuestions.length ) {
            clearInterval(timeInterval);
            timerEl.innerHTML ='Good Job';
        } else if (timeLeft === 1) {
            timerEl.innerHTML = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            timerEl.innerHTML = "time: " + timeLeft + ' seconds remaining';
            timeLeft--;
        }
    }, 1000);

}

//hide the start button when taking quizz
function hideshow() {
    get('button').style.display = 'block'; 
    this.style.display = 'none';
}      
    
//question
var myQuestions = [
    {
        question: "Question 1",
        answers: {
            a: "1A",
            b: "1B",
            c: "1C"
        },    
        correctAnswer: "c"
    },    
    {
        question: "Question 2",
        answers: {
            a: "2A",
            b: "2B",
            c: "2C"
        },    
        correctAnswer: "c"
    },    
    {
        question: "Question 3",
        answers: {
            a: "3A",
            b: "3B",
            c: "3C"
        },    
        correctAnswer: "c"
    },    
    {
        question: "Question 4",
        answers: {
            a: "4A",
            b: "4B",
            c: "4C"
        },    
        correctAnswer: "c"
    },    

];   

// quiz main 
function displayquizz() {
    
    if (currentQuestion >= myQuestions.length) {
        endQuiz();
        getResult();
        return
    }
    
    var question = myQuestions[currentQuestion].question;
    var chA = myQuestions[currentQuestion].answers.a;
    var chB = myQuestions[currentQuestion].answers.b;
    var chC = myQuestions[currentQuestion].answers.c; 
    
    get('anwser-container').innerHTML = "";

    // display the answer options
    get('quiz-container').innerHTML = `<h3>`+question+`</h3><p>Question `+(currentQuestion+1)+`of `+myQuestions.length+`<p>`;
    get('anwser-container').innerHTML += "<label onclick='checkAnswer()'> <input type='radio' name='choices' value='a'> "+chA+"</label><br>";
    get('anwser-container').innerHTML += "<label onclick='checkAnswer()'> <input type='radio' name='choices' value='b'> "+chB+"</label><br>";
    get('anwser-container').innerHTML += "<label onclick='checkAnswer()'> <input type='radio' name='choices' value='c'> "+chC+"</label><br><br>";
}    


// check the Answer
function checkAnswer(){
    // use getElementsByName because we have an array which it will loop through
    choices = document.getElementsByName("choices");
    
    for(var i=0; i<choices.length; i++){
        if(choices[i].checked){
            choice = choices[i].value;
            if (choice === myQuestions[currentQuestion].correctAnswer) { 
                get('rep').innerHTML="Correct";
                correct ++ ;
            } else {
                timeLeft--;
                get('rep').innerHTML="Wrong cmnr"
            }
        }
    }
    currentQuestion++;
    displayquizz();
}


// end quiz
function endQuiz() {
    get('quiz-status').textContent= "Test completed";
}

// call out the result
function getResult() {
    var quizSc   = document.getElementById("info"); 
    var quiz = get('quiz-container'); 
    get('anwser-container').innerHTML = "";
    get( "quiz-container" ).innerHTML = "";
    get('rep').innerHTML= "";
    quiz.innerHTML = "<h2> You got "+correct+" of "+myQuestions.length+" question correct </h2>";
    quizSc.innerHTML= `<p id='A'>Your Name:<input id='list' type='text' value='here'>Your Score: ${correct}</p><button id='submit'>Submit</button>`;
    //saving result by submit button
    document.getElementById("submit").addEventListener("click", function() {
        saveData();
        printData();
    })
}

var userName = document.getElementById("list");
console.log(username)
// save function
function saveData() {
    var userData = {
        userName: userName,
        userScr : correct,
    };
    console.log(userData)
    localStorage.setItem("userData", JSON.stringify(userData));
}

// print out the data
function printData() {
    var userList = JSON.parse(localStorage.getItem("userData"));
    if(userList !== null) {
        document.getElementById("user").textContent = userList.userName;
        document.getElementById("score").textContent= userList.userScr;
    } else {
        return;
    }
}







