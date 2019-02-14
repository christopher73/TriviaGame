$("document").ready(function() {
  const questions = [
    {
      question: `Inside which HTML element do we put the JavaScript?`,
      correct_answer: `<script>`,
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
    for (let i = 0; i < arr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  let new_arr = shuffle(questions);
  console.log(questions.length);

  $(".start").on("click", () => {
    let i = 0;
    console.log(i);

    $(".next").on("click", () => {
      if (i < questions.length) {
        $(".question").empty();
        $(".answers").empty();
        console.log(i);
        $(".question").append($("<div>").text(new_arr[i].question));
        new_arr[i].wrong_answers.push(new_arr[i].answer);
        new_arr[i].wrong_answers = shuffle(new_arr[i].wrong_answers);
        for (let j = 0; j < new_arr[i].wrong_answers.length; j++) {
          $(".answers").append($("<p>").text(new_arr[i].wrong_answers[j]));
        }
      }
      //
      i++;
    });
  });
});
