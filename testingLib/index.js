
var messages = $('#messages');
var editor = $('#editor');
var structure = $('#structure');

//testCode will be global api
var testCode = {};

var codeEditor = ace.edit(editor[0]);
codeEditor.setTheme("ace/theme/twilight");
codeEditor.getSession().setMode("ace/mode/javascript");

var codeStr = acorn.parse(codeEditor.getValue());

codeEditor.on('change', _.debounce(runTests,1000));

function getAST(string){
    return acorn.parse(string);
}

function runTests(){
    //set global for other functions to access
    codeStr = codeEditor.getValue();
    //reset messages
    messages.empty();
    var AST = getAST(codeStr);
    testCode.requireCode();
    testCode.restrictCode();
    testCode.structuredCode();

}

messages.text('hello </br> my name is jared');