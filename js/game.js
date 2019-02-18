$("document").ready(function() {
  const questions = [
    {
      question: `Inside which HTML element do we put the JavaScript?`,
      answer: `<script>`,
      wrong_answers: [`<script>`, `<js> `, `<scripting> `, `<javascript>`]
    },
    {
      question: `What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>`,
      answer: `document.getElementById("demo").innerHTML = "Hello World!"`,
      wrong_answers: [
        `document.getElementById("demo").innerHTML = "Hello World!"`,
        `#demo.innerHTML = "Hello World!";`,
        `document.getElement("p").innerHTML = "Hello World!";`
      ]
    },
    {
      question: `Where is the correct place to insert a JavaScript?`,
      answer: `Both the <head> section and the <body>`,
      wrong_answers: [
        `Both the <head> section and the <body>`,
        `The <head> section`,
        `The <body> section`
      ]
    },
    {
      question: `What is the correct syntax for referring to an external script called "xxx.js"?`,
      answer: `<script src="xxx.js">`,
      wrong_answers: [
        `<script src="xxx.js">`,
        `<script name="xxx.js">`,
        `<script name="xxx.js">`
      ]
    },
    {
      question: `The external JavaScript file must contain the <script> tag. `,
      answer: `false`,
      wrong_answers: [`false`, `true`]
    },
    {
      question: `How do you write "Hello World" in an alert box?`,
      answer: `alert("Hello World");`,
      wrong_answers: [
        `alert("Hello World");`,
        `msg("Hello World");`,
        `alertBox("Hello World");`,
        `msgBox("Hello World");`
      ]
    },
    {
      question: `What is the correct way to write a JavaScript array?`,
      answer: `var colors = ["red", "green", "blue"]`,
      wrong_answers: [
        `var colors = ["red", "green", "blue"]`,
        `var colors = (1:"red", 2:"green", 3:"blue")`,
        `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
        `var colors = "red", "green", "blue"`
      ]
    },
    {
      question: `Is JavaScript case-sensitive?      `,
      answer: `yes`,
      wrong_answers: [`yes`, `no`]
    },
    {
      question: `What will the following code return: Boolean(10 > 9)      `,
      answer: `true`,
      wrong_answers: [`true`, `false`, ` NaN`]
    },
    {
      question: `How do you create a function in JavaScript?`,
      answer: `function myFunction()`,
      wrong_answers: [
        `function myFunction()`,
        `function:myFunction() `,
        `function = myFunction()`
      ]
    }
  ];
  function shuffle(arr) {
    //------funtion to shuffle my arrays
    let new_questions = arr;
    for (let i = 0; i < new_questions.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [new_questions[i], new_questions[j]] = [
        new_questions[j],
        new_questions[i]
      ];
    }
    return new_questions;
  }
  var timer = countDown => {
    //---------this funtion takes variable and creates count down
    $(".info").empty();
    let count = countDown;
    let seconds = 0;
    $(".info").text(`TIME REMAINING: ${count / 1000}`);
    let n = setInterval(function() {
      count = count - 1000;
      seconds = Math.floor((count % (1000 * 60)) / 1000);
      $(".info")
        .empty()
        .text(`TIME REMAINING: ${seconds}`);
      if (count === 0) {
        //---------if count down is finished simulate click next
        clearInterval(n);
        $(".next").click();
      }
    }, 1000);
    return n; //-------return cariable to be able to clear interbal later
  };
  //--------initilize variable ---maybe cunstructors???
  const newA = () => {
    return shuffle(questions);
  };
  let tmp = 0;
  let score = 0;
  let i = 0;
  let selected = [];
  $(".infodiv").hide();
  $(".newgame").hide(); //---------new game button restart !
  var new_arr = newA();

  $(".next").on("click", () => {
    var newt = timer(35000); //---------set time to 35sec
    let $question = $("<div>").attr({
      class: "question col-sm-9 text-center m-auto p-3"
    });
    let $answers = $("<div>").attr({
      class: "answers col-sm-9 text-center m-auto p-3",
      id: i
    });
    $(".score").empty();
    $(".infodiv").show();
    $(".next")
      .empty()
      .text("Next");
    $(".main").empty();
    $(".main").append($question);
    $(".main").append($answers);
    $(".score").append(`SCORE: ${score}`);
    new_arr[i].wrong_answers = shuffle(new_arr[i].wrong_answers); //------shuffle wrong answer
    $($question).text(new_arr[i].question);
    for (let j = 0; j < new_arr[i].wrong_answers.length; j++) {
      let $choices = $("<button>").attr({
        class: "input col-sm-12 mx-auto my-2 p-3",
        id: "input" + j,
        value: j
      });
      $($choices).text(new_arr[i].wrong_answers[j]);
      $(`#${i}`).append($choices);
    }
    $(`.input`).on("click", function() {
      //----------record answer
      tmp = $(this).val();
      clearInterval(newt);
      selected[i - 1] = tmp;
      if (new_arr[i - 1].answer === new_arr[i - 1].wrong_answers[tmp]) score++;
      $(".next").click();
    });
    if (i < new_arr.length - 1) i++;
    //-----------index variable
    else {
      clearInterval(newt);
      $($answers).hide();
      $($question).hide();
      $(".newgame").show();
    }
    $(".next").hide();
  });
  $(".newgame").on("click", () => {
    //--------------restart game
    $(".next")
      .empty()
      .text("START");
    $(".next").show();
    $(".newgame").hide();
    tmp = 0;
    i = 0;
    selected = [];
    score = 0;
  });
});
