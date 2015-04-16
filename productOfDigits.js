/*PROMPT
*   Given an interger N, return a number such that the product of all the digits = N
*   If mulltiple values of X is possible return the smalles one, If no number exists return -1
*
*   N will be between 1 and 1,000,000,000
*
*   EX
*   N = 1 //return 1
*
*   N = 10 // return 25 (2*5)
*
*   N = 26 // return -1
*
*   N = 100 // return 455
*
*   N = 2520 // return 5789
*
*   N = 864 //  return 2689
*
* */

function getProduct (num){
    var numb = num;
    numbLength = String(num).length;
    var answers = [];

    if(num === 1){
        return 1
    }

    function recurse(arr){

        var product = arr.reduce(function(prev, curr){
            return prev * curr ;
        },1);

        //Max num passed in is 10 digits long
        if(product > numb || arr.length > numbLength+1){
            return;
        }
        if(product === numb){
            answers.push(arr.join(''));
        }

        for(var i = 1; i <= 9; i++){
            arr.push(i);
            recurse(arr);
            arr.pop();
        }

    }

    recurse([]);

    if(answers.length === 0){
        return -1
    }

    answers.sort(function(a,b){return a -b});
    console.log(answers);
    return answers[0];

}

console.log(getProduct(864));
