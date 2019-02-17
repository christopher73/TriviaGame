$("document").ready(function() {
  var questions = [
    {
      question: `Inside which HTML element do we put the JavaScript?`,
      answer: `<script>`,
      wrong_answers: [`<js> `, `<scripting> `, `<javascript>`]
    },
    {
      question: `What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>`,
      answer: `document.getElementById("demo").innerHTML = "Hello World!"`,
      wrong_answers: [
        `#demo.innerHTML = "Hello World!";`,
        `document.getElement("p").innerHTML = "Hello World!";`
      ]
    },
    {
      question: `Where is the correct place to insert a JavaScript?`,
      answer: `Both the <head> section and the <body>`,
      wrong_answers: [`The <head> section`, `The <body> section`]
    },
    {
      question: `What is the correct syntax for referring to an external script called "xxx.js"?`,
      answer: `<script src="xxx.js">`,
      wrong_answers: [`<script name="xxx.js">`, `<script name="xxx.js">`]
    },
    {
      question: `The external JavaScript file must contain the <script> tag. `,
      answer: `false`,
      wrong_answers: [`true`]
    },
    {
      question: `How do you write "Hello World" in an alert box?`,
      answer: `alert("Hello World");`,
      wrong_answers: [
        `msg("Hello World");`,
        `alertBox("Hello World");`,
        `msgBox("Hello World");`
      ]
    },
    {
      question: `What is the correct way to write a JavaScript array?`,
      answer: `var colors = ["red", "green", "blue"]`,
      wrong_answers: [
        `var colors = (1:"red", 2:"green", 3:"blue")`,
        `var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")`,
        `var colors = "red", "green", "blue"`
      ]
    },
    {
      question: `Is JavaScript case-sensitive?      `,
      answer: `yes`,
      wrong_answers: [`no`]
    },
    {
      question: `What will the following code return: Boolean(10 > 9)      `,
      answer: `true`,
      wrong_answers: [`false`, ` NaN`]
    },
    {
      question: `How do you create a function in JavaScript?`,
      answer: `function myFunction()`,
      wrong_answers: [`function:myFunction() `, `function = myFunction()`]
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
  //--------initilize variable ---maybe cunstructors???
  let new_arr = shuffle(questions);
  let tmp = 0;
  let score = 0;
  let i = 0;
  let selected = [];
  $(".infodiv").hide();
  $(".newgame").hide(); //---------new game button restart !

  var timer = countDown => {
    //---------this funtion takes variable and creates count down
    $(".info").empty();
    let count = countDown;
    let seconds = 0;
    $(".info").text(`TIME : ${count / 1000}`);
    let n = setInterval(function() {
      count = count - 1000;
      seconds = Math.floor((count % (1000 * 60)) / 1000);
      $(".info")
        .empty()
        .text(`TIME : ${seconds}`);
      if (count === 0) {
        //---------if count down is finished simulate click next
        clearInterval(n);
        $(".next").click();
      }
    }, 1000);
    return n; //-------return cariable to be able to clear interbal later
  };
  $(".newgame").on("click", () => {
    //$(".main").empty();
    $(".next")
      .empty()
      .text("START");
    $(".next").show();
    $(".newgame").hide();
    new_arr = [];
    new_arr = shuffle(questions);
    // console.log(questions.length);
    tmp = 0;
    i = 0;
    selected = [];
    score = 0;
  });
  $(".next").on("click", () => {
    let $question = $("<div>").attr({
      class: "question col-sm-9 text-center m-auto p-3"
    });
    let $answers = $("<div>").attr({
      class: "answers col-sm-9 text-center m-auto p-3",
      id: i
    });
    $(".score").empty();
    $(".infodiv").show();
    var newt = timer(35000); //---------set time to 10sec

    $(".next")
      .empty()
      .text("Next");
    $(".main").empty();
    $(".main").append($question);
    $(".main").append($answers);
    $(".score").append(`SCORE: ${score}`);

    new_arr[i].wrong_answers.push(new_arr[i].answer);
    new_arr[i].wrong_answers = shuffle(new_arr[i].wrong_answers);
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
      tmp = $(this).val();
      clearInterval(newt);
      selected[i - 1] = tmp;
      //console.log(new_arr[i - 1].wrong_answers[tmp]);
      if (new_arr[i - 1].answer === new_arr[i - 1].wrong_answers[tmp]) score++;
      $(".next").click();
    });
    $(".next").hide();
    if (i < new_arr.length - 1) i++;
    else {
      clearInterval(newt);
      $($answers).hide();
      $($question).hide();
      $(".newgame").show();
    }
    console.log(score);
  });
});
