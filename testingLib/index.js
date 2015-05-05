
var messeges = $('#messages');
var editor = $('#editor');
var testCode = {};

var codeEditor = ace.edit(editor[0]);
codeEditor.setTheme("ace/theme/twilight");
codeEditor.getSession().setMode("ace/mode/javascript");

var code = codeEditor.getValue();

codeEditor.on('change', _.debounce(logme,1000));
console.log(code);


function logme(){console.log(codeEditor.getValue())}