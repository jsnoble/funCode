

testCode.requireCode = function(array){
    var astTree = getAST(codeStr);
    var arr = array ? array.slice() : ['IfStatement','VariableDeclaration','ReturnStatement'];
    var results = [];

    arr.forEach(function(nodeType){
        if(!acorn.walk.findNodeAt(astTree, null, null, nodeType)){
            results.push(nodeType);
        }
    });

        if(results.length > 0){
            results.forEach(function(nodeType){
                messages.append($('<li>').text('Make sure to have a '+ nodeType+' in your code'));
            });
        }
};