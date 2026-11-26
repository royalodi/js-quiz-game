// questions.js — Quiz Question Bank
// 40 Questions across 4 categories

const QUESTIONS = {
  html: [
    { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], ans: 0 },
    { q: "Which tag creates a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], ans: 1 },
    { q: "Which attribute specifies the URL of an image?", options: ["href", "link", "src", "url"], ans: 2 },
    { q: "Which HTML5 element is used for navigation?", options: ["<navigation>", "<nav>", "<menu>", "<navigate>"], ans: 1 },
    { q: "What is the correct HTML for a line break?", options: ["<break>", "<lb>", "<newline>", "<br>"], ans: 3 },
    { q: "Which element makes text italic in HTML5?", options: ["<i>", "<italic>", "<em>", "Both <i> and <em>"], ans: 3 },
    { q: "What does the `<!DOCTYPE html>` declaration do?", options: ["Defines document language", "Tells the browser this is HTML5", "Links a stylesheet", "Creates a comment"], ans: 1 },
    { q: "Which tag is used to define a table row?", options: ["<td>", "<tr>", "<th>", "<row>"], ans: 1 },
    { q: "Which HTML element is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], ans: 2 },
    { q: "What attribute makes an input required?", options: ["validate", "required", "mandatory", "must"], ans: 1 },
  ],
  css: [
    { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sections"], ans: 0 },
    { q: "Which CSS property controls text size?", options: ["text-size", "font-size", "text-style", "font-style"], ans: 1 },
    { q: "What is the default value of `position`?", options: ["relative", "fixed", "static", "absolute"], ans: 2 },
    { q: "Which CSS unit is relative to the root element font size?", options: ["em", "rem", "px", "%"], ans: 1 },
    { q: "What property shortens overflowed text with '...'?", options: ["text-wrap", "text-overflow: ellipsis", "overflow: hidden", "word-break"], ans: 1 },
    { q: "Which flexbox property aligns items on the cross axis?", options: ["justify-content", "align-self", "align-items", "flex-align"], ans: 2 },
    { q: "What is the CSS box model order from inside out?", options: ["content→border→padding→margin", "content→padding→margin→border", "content→margin→padding→border", "content→padding→border→margin"], ans: 3 },
    { q: "Which value of `display` makes an element a block-level flex container?", options: ["flex", "inline-flex", "block-flex", "grid"], ans: 0 },
    { q: "What pseudo-class selects an element on hover?", options: [":hover", ":focus", ":active", ":mouse"], ans: 0 },
    { q: "Which property creates space INSIDE the border?", options: ["margin", "gap", "padding", "border-spacing"], ans: 2 },
  ],
  javascript: [
    { q: "Which keyword declares a constant in JS?", options: ["var", "let", "const", "def"], ans: 2 },
    { q: "What does `typeof null` return?", options: ["null", "undefined", "object", "string"], ans: 2 },
    { q: "Which method removes the last element of an array?", options: ["shift()", "splice()", "pop()", "delete()"], ans: 2 },
    { q: "What is the output of `0.1 + 0.2 === 0.3`?", options: ["true", "false", "undefined", "NaN"], ans: 1 },
    { q: "What does `===` check in JavaScript?", options: ["Value only", "Type only", "Value and type", "Reference"], ans: 2 },
    { q: "Which built-in method converts JSON to a JS object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"], ans: 1 },
    { q: "What is a closure in JavaScript?", options: ["A block statement", "A function with access to outer scope variables", "An async function", "An IIFE"], ans: 1 },
    { q: "Which event fires when the DOM is fully loaded?", options: ["window.onload", "document.ready", "DOMContentLoaded", "body.onload"], ans: 2 },
    { q: "What does `Array.prototype.map()` return?", options: ["The same array modified", "A new array", "undefined", "A boolean"], ans: 1 },
    { q: "Which statement is used to handle asynchronous code?", options: ["try/catch", "async/await", "then/catch", "All of the above"], ans: 3 },
  ],
  python: [
    { q: "Which keyword starts a function in Python?", options: ["function", "func", "def", "fn"], ans: 2 },
    { q: "What data type is `{1, 2, 3}` in Python?", options: ["list", "dict", "tuple", "set"], ans: 3 },
    { q: "How do you comment a single line in Python?", options: ["//", "/*", "#", "--"], ans: 2 },
    { q: "What does `len('hello')` return?", options: ["4", "5", "6", "hello"], ans: 1 },
    { q: "Which method adds an item to the end of a list?", options: ["add()", "push()", "append()", "insert()"], ans: 2 },
    { q: "What is the output of `print(type([]))`?", options: ["<class 'list'>", "<class 'array'>", "list", "[]"], ans: 0 },
    { q: "How do you start an infinite loop in Python?", options: ["while True:", "loop:", "for ever:", "repeat:"], ans: 0 },
    { q: "What does the `range(5)` function produce?", options: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0,1,2,3,4,5]", "[1,2,3,4]"], ans: 1 },
    { q: "Which keyword is used for inheritance in Python?", options: ["extends", "inherits", "class Child(Parent)", "implements"], ans: 2 },
    { q: "What is a Python lambda?", options: ["A loop", "An anonymous function", "A class method", "A module"], ans: 1 },
  ]
};
