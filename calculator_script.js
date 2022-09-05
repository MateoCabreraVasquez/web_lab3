

const math=window.math;
var input = "";
var isRadOn=true;
var isDegreeOn=false;
var isInvOn=false;

window.addEventListener('load', function() {
    addKeyOnCLickToEachKey();
});


function addKeyOnCLickToEachKey(){
    var allKeys=Array.from(document.getElementsByTagName("button"))
    allKeys.forEach(function(key){
        key.onclick= function() {onCalculatorKeyPressed(key);};;
    })
}

function onCalculatorKeyPressed(key){
    keyPressedProccesing(key.id);
}

function keyPressedProccesing(keyId){
 
    switch (keyId) {

        /* FIRTS ROW */
        case 'key_rad':
            setCalculatorAtRadMode();break;
        case 'key_degree':
            setCalculatorAtDegreeMode();break;
        case 'key_factorial':
            addKeyValueToEntry("!");break;
        case 'key_left_parenthesis':
            addKeyValueToEntry("(");break;
        case 'key_right_parenthesis':
            addKeyValueToEntry(")");break;
        case 'key_delete':
            deletLastKey();break;
        case 'key_rest':
            resetEntry();break;


        /* SECOND ROW */
        case 'key_inverse':
            changeInveseState();break;
        case 'key_sin':
            if(isInvOn)
                addKeyValueToEntry("asin(");
            else
                addKeyValueToEntry("sin(");
            break;
        case 'key_ln':
            if(isInvOn)
                addKeyValueToEntry("e^(");
            else
                addKeyValueToEntry("ln(");
            break;
        case 'key_7':
            addKeyValueToEntry("7");break;
        case 'key_8':
            addKeyValueToEntry("8");break;
        case 'key_9':
            addKeyValueToEntry("9");break;
        case 'key_division':
            addKeyValueToEntry("/");break;

        
        /* THIRD ROW */
        case 'key_pi':
            addKeyValueToEntry("3.1416");break;
        case 'key_cos':
            if(isInvOn)
                addKeyValueToEntry("acos(");
            else
                addKeyValueToEntry("cos(");
            break;
        case 'key_log':
            if(isInvOn)
                addKeyValueToEntry("10^(");
            else
                addKeyValueToEntry("log(");
            break;
        case 'key_4':
            addKeyValueToEntry("4");break;
        case 'key_5':
            addKeyValueToEntry("5");break;
        case 'key_6':
            addKeyValueToEntry("6");break;
        case 'key_multiplication':
            addKeyValueToEntry("x");break;

        
        /* FOURTH ROW */
        case 'key_e':
            addKeyValueToEntry("2.7183");break;
        case 'key_tan':
            if(isInvOn)
                addKeyValueToEntry("atan(");
            else
                addKeyValueToEntry("tan(");
            break;
        case 'key_sqrt' :
            addKeyValueToEntry("sqrt(");break;
        case 'key_3':
            addKeyValueToEntry("3");break;
        case 'key_2':
            addKeyValueToEntry("2");break;
        case 'key_1':
            addKeyValueToEntry("1");break;
        case 'key_minus':
            addKeyValueToEntry("-");break;

        /* FIFTH ROW */
        case 'key_ans':
            addKeyValueToEntry("Ans");break;
        case 'key_exp':
            addKeyValueToEntry("exp(");break;
        case 'key_elevate':
            addKeyValueToEntry("^");break;
        case 'key_0':
            addKeyValueToEntry("0");break;
        case 'key_dot':
            addKeyValueToEntry(".");break;
        case 'key_equal':
            calculateResul();break;
        case 'key_add':
            addKeyValueToEntry("+");break;
        
    }



}

function calculateResul(){
    var inValue=document.getElementById('input').value

    console.log(inValue);
    if(areBracesOk(inValue)){
        
        startCalculateProcess(inValue)
    }
    else{
        window.alert("Parentesis incorrecto");
    }

}




function startCalculateProcess(inValue){
    var formatedInValue=adecauateFormatToCalculate(inValue);
    var resp=math.evaluate(formatedInValue)
    if(resp=!null && resp.length>0){

        var historic=document.getElementById("historic")
        console.log(document);
        document.getElementById("input").value = resp
    }
}

function adecauateFormatToCalculate(inValue){
    var entry=inValue
    entry=entry.replace("x","*").replace("log","log10").replace("ln","log").replace("e","E")
    if(isDegreeOn){
        entry=entry.replace("sin(","sin((180/PI)*")
        entry=entry.replace("cos(","cos((180/PI)*")
        entry=entry.replace("tan(","tan((180/PI)*")

        entry=entry.replace("asin(","(180/PI)*asin(")
        entry=entry.replace("acos(","(180/PI)*acos(")
        entry=entry.replace("atan(","(180/PI)*atan(")
    }
    return entry
}

function addKeyValueToEntry(keyValue){
    var result=document.getElementById('input')
    result.value=result.value+keyValue
}

function setCalculatorAtDegreeMode(){
    isRadOn=false;
    isDegreeOn=true;
    setActiveFormat(document.getElementById("key_degree"));
    setDisableFormat(document.getElementById("key_rad"));
}

function setCalculatorAtRadMode(){
    isRadOn=true;
    isDegreeOn=false;
    setActiveFormat(document.getElementById("key_rad"));
    setDisableFormat(document.getElementById("key_degree"));
}

function changeInveseState(){
    isInvOn=!isInvOn
    if(!isInvOn)
        setDisableFormat(document.getElementById("key_inverse"));
    else
        setActiveFormat(document.getElementById("key_inverse"));
    
    updateInverseKeys(isInvOn)  

}



function resetEntry(){document.getElementById('input').value=""}

//Delete the last entry character
function deletLastKey(){
    var resultValue=document.getElementById('input')
    console.log(resultValue.value.length)
    if(resultValue.value.length>0){    
        resultValue.value=resultValue.value.substring(0,resultValue.value.length-1)
    }
}


//Delete the last entry character
function areBracesOk(braces){
    let opening = [ '(']
    let closing = [ ')']
    let arr = []
    for (let i = 0; i < braces.length; i++) {
        if (opening.includes(braces[i])) {
            arr.push(braces[i])
        } else
        if (closing.indexOf(braces[i]) === opening.indexOf(arr[arr.length - 1])) {
            arr.pop()
        } else return false
    
    console.log(arr.length === 0)

    } return arr.length === 0;
}

function setActiveFormat(key){
    key.classList.add('active_key');
    key.classList.remove('symbolic_key');
}

function setDisableFormat(key){
    key.classList.add('symbolic_key');
    key.classList.remove('active_key');
}

function updateInverseKeys(isInvOn){
    if(isInvOn){
        document.getElementById("key_sin").innerHTML="Sin<sup>-1</sup>"
        document.getElementById("key_ln").innerHTML="e<sup>x</sup>"
        document.getElementById("key_cos").innerHTML="Cos<sup>-1</sup>"
        document.getElementById("key_log").innerHTML="10<sup>x</sup>"
        document.getElementById("key_tan").innerHTML="tan<sup>-1</sup>"
    }
    else{
        document.getElementById("key_sin").innerHTML="Sin"
        document.getElementById("key_ln").innerHTML="ln"
        document.getElementById("key_cos").innerHTML="Cos"
        document.getElementById("key_log").innerHTML="log"
        document.getElementById("key_tan").innerHTML="Tan"
    }

} 