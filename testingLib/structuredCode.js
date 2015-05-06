
//arguments should be an array of objects
testCode.structuredCode = function(){
    var astTree = getAST(codeStr);
    var strHtml = '';

    console.log('this is ast', astTree);

    function iterate(node){
        console.log(node);
        var nodeType = node.type;
        if(!nodeType){
            return;
        }
        var str = '<li>' + nodeType + '</li>';
       // console.log(str)
        strHtml += str;
        //console.log(strHtml);
        if(Array.isArray(node.body)){
            strHtml += '<ul>';
            _.each(node.body,function(innerNode){
                iterate(innerNode);
            });
            strHtml += '</ul>';
        } else if(node.consequent){
            strHtml += '<ul>';
            iterate(node.consequent);
            strHtml += '</ul>';
        } else if(node.body){
            strHtml += '<ul>';
            iterate(node.body);
            strHtml += '</ul>';
        }
    }

    iterate(astTree);

   structure.html(strHtml);
};
