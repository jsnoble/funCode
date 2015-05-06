
//arguments should be an array of strings
testCode.requireCode = function(array){
    var astTree = testCode.get();
    var args;
    if(array){
        args = array.slice();
        testCode.requireCode.config = array;
    } else{
        args =  testCode.requireCode.config;
    }

    var results = _.filter(args, function(nodeType){
        return !acorn.walk.findNodeAt(astTree, null, null, nodeType)
    });

    if(results.length > 0){
        _.each(results, function(nodeType){
            messages.append($('<li>')
                .text('Make sure to have a '+ nodeType+' in your code')
                .css({ 'color': 'red', 'font-size': '125%' }));
        });
    }
};

//set default
testCode.requireCode.config = ['IfStatement','VariableDeclaration','ReturnStatement'];