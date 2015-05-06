
//this code displays a hierarchical tree of the code
testCode.structuredCode = function(){
    var astTree = testCode.get();
    var strHtml = '';

    function recurse(node){
        var nodeType = node.type;
        if(!nodeType){
            return;
        }
        var str = '<li>' + nodeType + '</li>';
        strHtml += str;

        if(Array.isArray(node.body)){
            strHtml += '<ul>';
            _.each(node.body,function(innerNode){
                recurse(innerNode);
            });
            strHtml += '</ul>';
        } else if(node.consequent){
            strHtml += '<ul>';
            recurse(node.consequent);
            strHtml += '</ul>';
        } else if(node.body){
            strHtml += '<ul>';
            recurse(node.body);
            strHtml += '</ul>';
        }
    }

    recurse(astTree);

    //jQuery object
   structure.html(strHtml);
};
