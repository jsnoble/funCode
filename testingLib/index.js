
var messages = $('#messages');
var editor = $('#editor');
var structure = $('#structure');

//testCode will be global object api
var testCode = {
    results: null,
    set: function(string){
        this.results = acorn.parse(string);
    },
    get: function(){
        return this.results;
    }
};

var codeEditor = ace.edit(editor[0]);
codeEditor.setTheme("ace/theme/twilight");
codeEditor.getSession().setMode("ace/mode/javascript");


codeEditor.on('change', _.debounce(runTests,1000));

function runTests(){
    testCode.set(codeEditor.getValue());
    //reset messages
    messages.empty();

    testCode.requireCode();
    testCode.restrictCode();
    testCode.structuredCode();
}
$(function(){
    runTests();
});



