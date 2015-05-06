
//arguments should be an array of strings
testCode.restrictCode = function(array){
    var astTree = testCode.get();
    var args;
    if(array){
        args = array.slice();
        testCode.restrictCode.config = array;
    } else{
        args =  testCode.restrictCode.config;
    }

    var results = _.filter(args, function(nodeType){
        return acorn.walk.findNodeAt(astTree, null, null, nodeType)
    });

    if(results.length > 0){
        _.each(results, function(nodeType){
            messages.append($('<li>')
                .text('So close! Try removing '+ nodeType+' from your code')
                .css({ 'color': 'red', 'font-size': '125%' }));
        });
    }
};
//set default config
testCode.restrictCode.config = ['BreakStatement', 'WithStatement'];