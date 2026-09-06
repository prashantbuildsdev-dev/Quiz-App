const container = document.querySelector('.container');
const questionBox = document.querySelector('.questionBox');
const choicesBox = document.querySelector('.choicesBox');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
//make an array of object
const quiz = [
    {
        question:"Q1. Which keyword is used to declare a variable that can be reassigned?",
        choices:["const", "let", "static", "define"],
        answer: "let"
    },
    {
        question:"Q2. Which method is used to print a message in the browser console?",
        choices:["console.log()", "print()", "document.write()", "alert.log()"],
        answer: "console.log()"
    },
    {
        question:"Q3. Which operator checks both value and data type?",
        choices:["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question:"Q4. Which data type is used for true or false values?",
        choices:["String", "Number", "Boolean", "Object"],
        answer: "Boolean"
    },
    {
        question:"Q5. Which method adds an item to the end of an array?",
        choices:["pop()", "push()", "shift()", "slice()"],
        answer: "push()"
    },
    {
        question:"Q6. Which method removes the last item from an array?",
        choices:["pop()", "push()", "unshift()", "concat()"],
        answer: "pop()"
    },
    {
        question:"Q7. Which keyword is used to create a function?",
        choices:["function", "func", "method", "create"],
        answer: "function"
    },
    {
        question:"Q8. What does DOM stand for?",
        choices:["Document Object Model", "Data Object Method", "Digital Object Model", "Document Order Method"],
        answer: "Document Object Model"
    },
    {
        question:"Q9. Which method selects an element by its id?",
        choices:["getElementById()", "getElementsByClassName()", "querySelectorAll()", "createElement()"],
        answer: "getElementById()"
    },
    {
        question:"Q10. Which event happens when a user clicks an element?",
        choices:["change", "click", "load", "submit"],
        answer: "click"
    },
    {
        question:"Q11. Which symbol is used for a single-line comment?",
        choices:["//", "<!-- -->", "##", "**"],
        answer: "//"
    },
    {
        question:"Q12. Which method converts a JSON string into a JavaScript object?",
        choices:["JSON.parse()", "JSON.stringify()", "Object.create()", "parseInt()"],
        answer: "JSON.parse()"
    },
    {
        question:"Q13. Which method converts a JavaScript object into a JSON string?",
        choices:["JSON.parse()", "JSON.stringify()", "toString()", "Object.assign()"],
        answer: "JSON.stringify()"
    },
    {
        question:"Q14. Which loop is best for running code a fixed number of times?",
        choices:["for", "while", "do...while", "switch"],
        answer: "for"
    },
    {
        question:"Q15. What is the result of typeof 'Hello'?",
        choices:["string", "text", "object", "character"],
        answer: "string"
    },
    {
        question:"Q16. Which statement is used to make a decision in JavaScript?",
        choices:["if...else", "for", "break", "return"],
        answer: "if...else"
    },
    {
        question:"Q17. Which method changes text inside an HTML element?",
        choices:["textContent", "appendChild", "setAttribute", "removeChild"],
        answer: "textContent"
    },
    {
        question:"Q18. Which value represents no value in JavaScript?",
        choices:["null", "0", "false", "empty"],
        answer: "null"
    },
    {
        question:"Q19. Which array method creates a new array by transforming every item?",
        choices:["map()", "find()", "filter()", "forEach()"],
        answer: "map()"
    },
    {
        question:"Q20. Which keyword stops a loop immediately?",
        choices:["continue", "break", "return", "stop"],
        answer: "break"
    }
];


//making variable
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 30;
let timerID = null;
//Arrow Function to Show Question
const showQuestions = () =>{
    stopTimer();
    timeLeft = 30;
    timer.textContent = timeLeft;
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                const selectedChoice = document.querySelector('.choice.selected');
                if(selectedChoice){
                    selectedChoice.classList.remove('selected');
                }
                choiceDiv.classList.add('selected');
            }
        });
    }

    startTimer();
    
}

//funstion to check answer
const checkAnswer = () =>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
       // alert("correct answer!")
        displayAlert("Correct Answer");
        score++;
    }
    else{
        //alert("wrong answer!")
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        quizOver = true;
    }
}

//funstion to show score
const showScore = ()=>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
   
}

//Function to show Alert
const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
         alert.style.display = "none";
    }, 2000);
   
}


//function to start timer
const startTimer = () =>{
    const counDown = () =>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            stopTimer();
            displayAlert(`Time Up! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
            currentQuestionIndex++;
            if(currentQuestionIndex < quiz.length){
                showQuestions();
            }
            else{
                showScore();
                quizOver = true;
            }
        }
    
    }
    timerID = setInterval(counDown, 1000);
    
}
//function to stop timer
const stopTimer = () =>{
    clearInterval(timerID);
}
const starQuiz = () =>{
    showQuestions();
}
//Adding event listener to start btn
startBtn.addEventListener('click',()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    starQuiz();
});

nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
   // alert("select your answer");
    displayAlert("Select your answer")
    return;
}
if(quizOver){
    // currentQuestionIndex = 0;
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        score = 0;
        quizOver =  false;
        showQuestions();
    
}
else{
   checkAnswer(); 
}
    
});
