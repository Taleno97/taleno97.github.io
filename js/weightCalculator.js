class weightCalculator {
    /*
    BWINF 2021 Runde 1 Aufgabe 5 von Lennart Talaga
    * Klasse braucht:
    * alle Gewichte die ausgerechnet werden sollen                  - allWeights
    * alle Gewichte die ich verwenden kann                          - myUsableWeights
    * alle Kombinationen um die gewünschten Gewichte abzubilden      - combinations
    * */
    constructor(allWeights, myUsableWeights) {
        this.allWeights = function (){
            let tmpArray = [];
            for(let i = 0; i < 1000; i++){
                tmpArray[i] = i * 10 + 10;
            }
            return tmpArray;
        };
    }
    calculateCombinations(usableWeights, weightToCalculate) {
        let usedWeightSum = 0
        let combinations = [];
        for(let i = 0; i < usableWeights.length ; i++) {
            if(weightToCalculate >= (usedWeightSum + usableWeights[i])){
                usedWeightSum += usableWeights[i];
                combinations.push(usableWeights[i])
            }
        }
        return {
            combinations,
            success: usedWeightSum === weightToCalculate,
            usedWeightSum,
            weightToCalculate
        }
    }
    calculateLeftSideCombinations(usableWeights, weightToCalculate) {
        let usedWeightSum = 0
        let combinations = [];
        let tmpRightSideWeight;
        let tmpLeftSideArray;
        usableWeights.sort(function (a,b){
            return (+a) - (+b);
        });
        for(let i = 0; i < usableWeights.length ; i++) {
            if(weightToCalculate < usableWeights[i]) {
                tmpRightSideWeight = usableWeights[i];
                tmpLeftSideArray = [...usableWeights.slice(0, i), ...usableWeights.slice(i + 1)];
                tmpLeftSideArray.sort((a,b) => {
                    return (+a) - (+b);
                }).reverse();
                for (let k = 0; k < tmpLeftSideArray.length; k++) {
                    if ((weightToCalculate + usedWeightSum + tmpLeftSideArray[k]) <= tmpRightSideWeight) {
                        usedWeightSum += tmpLeftSideArray[k];
                        combinations.push(tmpLeftSideArray[k]);
                    }
                }
                return {
                    combinations,
                    success: (usedWeightSum + weightToCalculate) === tmpRightSideWeight,
                    usedWeightSum,
                    tmpRightSideWeight,
                    weightToCalculate
                }
            }
            else if (weightToCalculate >= usableWeights[i]) {
                if(i === (usableWeights.length - 1)){
                    tmpRightSideWeight = 0;
                    tmpLeftSideArray = [];
                    let tmpRightSideArray = [];
                    let lastLoop = false;
                    usableWeights.sort(function (a,b){
                        return (+b) - (+a);
                    });
                    let tmpRightSideLoopArray = usableWeights;
                    usedWeightSum = 0;
                    for(let n = 0; n < usableWeights.length; n++) {
                        if (weightToCalculate >= (usableWeights[n] + tmpRightSideWeight)) {
                            tmpRightSideWeight += usableWeights[n];
                            tmpRightSideArray.push(usableWeights[n]);
                        } else {
                            if (!lastLoop) {
                                tmpRightSideWeight += usableWeights[n];
                                tmpRightSideArray.push(usableWeights[n]);
                            }
                            lastLoop = true;
                        }
                    }
                    for(let m = 0; m < tmpRightSideArray.length; m++){
                        const index = tmpRightSideLoopArray.indexOf(tmpLeftSideArray[m]);
                        if (index > -1){
                            tmpRightSideLoopArray.splice(index, 1);
                        }
                    }
                    tmpRightSideLoopArray.sort(function (a,b){
                        return (+b) - (+a);
                    });
                    for(let z = 0; z < tmpRightSideLoopArray.length; z++){
                        if((weightToCalculate + tmpRightSideLoopArray[z] + usedWeightSum) <= tmpRightSideWeight){
                            combinations.push(tmpRightSideLoopArray[z]);
                            usedWeightSum += tmpRightSideLoopArray[z];
                        }
                    }
                    return{
                        combinations,
                        success: (weightToCalculate + usedWeightSum) === tmpRightSideWeight,
                        usedWeightSum,
                        tmpRightSideWeight,
                        weightToCalculate
                    }
                }
                }
            }
        }
    showResult(htmlElement, result){
        htmlElement.innerHTML = "";
        let tbl = document.createElement('table');
        tbl.style.width = "300px";
        tbl.style.border = "1px solid black";
        const th = tbl.insertRow();
        const th1 = th.insertCell();
        th1.appendChild(document.createTextNode('Auszurechnendes Gewicht:'));
        th1.style.border = "1px solid black";
        const th2 = th.insertCell();
        th2.appendChild(document.createTextNode('Erfolg?'));
        th2.style.border = "1px solid black";
        const th3 = th.insertCell();
        th3.appendChild(document.createTextNode('Benutzte Gewichte'));
        th3.style.border = "1px solid black";
        const th4 = th.insertCell();
        th4.appendChild(document.createTextNode('Summe der verwendeten Gewichte'));
        th4.style.border = "1px solid black";
        const th5 = th.insertCell();
        th5.appendChild(document.createTextNode('Benutztes Gegengewicht'));
        th5.style.border = "1px solid black";
        for(let i = 0; i < result.length; i++){
            let size = Object.keys(result[i]).length;
            const tr = tbl.insertRow();
            for(let j = 0; j < size; j++){
                const td = tr.insertCell();
                switch(j){
                    case 0:
                        td.appendChild(document.createTextNode(result[i].weightToCalculate));
                        break;
                    case 1:
                        td.appendChild(document.createTextNode(result[i].success));
                        if(result[i].success){
                            tr.classList.add('success');
                        }else{
                            tr.classList.add('false');
                        }
                        break;
                    case 2:
                        td.appendChild(document.createTextNode(result[i].combinations.sort(function (a,b){
                            return (+a) - (+b);
                        }).reverse()));
                        break;
                    case 3:
                        td.appendChild(document.createTextNode(result[i].usedWeightSum));
                        break;
                    case 4:
                        td.appendChild(document.createTextNode(result[i].tmpRightSideWeight));
                        break;
                    default:
                        console.log('error');
                        break;
                }
                td.style.border = "1px solid black";
            }
            if(size < 5){
                const td = tr.insertCell();
                td.appendChild(document.createTextNode('-'));
                td.style.border = "1px solid black";

            }
        }
        htmlElement.appendChild(tbl);
    }
    buildResult(resultRightSide, resultLeftSide){
        let finalResult = [];
        for(let i = 0; i < resultRightSide.length; i++){
            if (resultRightSide[i].success){
                finalResult.push(resultRightSide[i]);
            }
            else if (resultLeftSide[i].success){
                finalResult.push(resultLeftSide[i]);
            }
            else{
                let rightSideDifference = resultRightSide[i].weightToCalculate - resultRightSide[i].usedWeightSum;
                let leftSideDifference = resultLeftSide[i].tmpRightSideWeight - (resultLeftSide[i].weightToCalculate + resultLeftSide[i].usedWeightSum);
                if(rightSideDifference <= leftSideDifference){
                    finalResult.push(resultRightSide[i]);
                }
                else{
                    finalResult.push(resultLeftSide[i]);
                }
            }
        }
        return finalResult;
    }
}

let myWeightCalculator = new weightCalculator();
weightsToCheck = myWeightCalculator.allWeights();
let outputElement = document.getElementById('marktwaage');

document.getElementById('inputfile').addEventListener('change', function (){
    let fr = new FileReader();
    let weightArray = [];
    fr.onload = function (){
        fileContent = fr.result.split('\r\n');
        fileContent.shift();
        for(let i = 0; i < fileContent.length; i++){
            fileContent[i] = fileContent[i].split(' ');
        }
        for(let i = 0; i < fileContent.length; i++){
            for(let k = 0; k < fileContent[i][1]; k++){
                weightArray.push(parseInt(fileContent[i][0]));
            }
        }
        weightArray.sort(function(a,b){
            return (+a) - (+b);
        }).reverse();
        let resultRightSide = [];
        let resultLeftAndRightSide = [];
        for(let i = 0; i < weightsToCheck.length ; i++) {
            resultRightSide.push(myWeightCalculator.calculateCombinations(weightArray, weightsToCheck[i]));
        }
        for(let i = 0; i < weightsToCheck.length ; i++){
            resultLeftAndRightSide.push(myWeightCalculator.calculateLeftSideCombinations(weightArray, weightsToCheck[i]));
        }
        let finalResult = myWeightCalculator.buildResult(resultRightSide, resultLeftAndRightSide);
        myWeightCalculator.showResult(outputElement, finalResult);
    }
    fr.readAsText(this.files[0]);
})

function showAll(){
    let allHiddenItems = document.querySelectorAll('.hide');
    for(let i = 0; i < allHiddenItems.length; i++){
        allHiddenItems[i].classList.remove('hide');
    }
}
function hideTrue(){
    showAll();
    let allItemsToHide = document.querySelectorAll('tr.success');
    for(let i = 0; i < allItemsToHide.length; i++){
        allItemsToHide[i].classList.add('hide');
    }
}
function hideFalse(){
    showAll();
    let allItemsToHide = document.querySelectorAll('tr.false');
    for(let i = 0; i < allItemsToHide.length; i++){
        allItemsToHide[i].classList.add('hide');
    }
}

