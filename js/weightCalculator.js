class weightCalculator {
    /*
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
        this.myUsableWeights = [5000, 1000, 1000, 1000, 500, 500, 500, 100, 100, 100,50, 50, 10, 10, 10];
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
                    tmpRightSideWeight = 'no bigger weight available';
                    return{
                        combinations,
                        success: false,
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
        th5.appendChild(document.createTextNode('Gewicht auf der rechten Seite'));
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
        }
        htmlElement.appendChild(tbl);
    }
    buildResult(resultRightSide, resultLeftSide){
        let finalResult = [];
        for(let i = 0; i < resultRightSide.length; i++){
            //if(i == 100) break;
            if (resultRightSide[i].success){
                finalResult.push(resultRightSide[i]);
            }
            else if (resultLeftSide[i].success){
                //console.table(resultLeftSide[i]);
                finalResult.push(resultLeftSide[i]);
            }
            else{
                let rightSideDifference = resultRightSide[i].weightToCalculate - resultRightSide[i].usedWeightSum;
                let leftSideDifference = resultLeftSide[i].weightToCalculate - resultLeftSide[i].usedWeightSum;
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
                weightArray.push(fileContent[i][0]);
            }
        }
        weightArray.sort(function(a,b){
            return (+a) - (+b);
        }).reverse();
        let resultRightSide = [];
        let resultLeftAndRightSide = [];
        for(let i = 0; i < weightsToCheck.length ; i++) {
            resultRightSide.push(myWeightCalculator.calculateCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]));
        }
        for(let i = 0; i < weightsToCheck.length ; i++){
            resultLeftAndRightSide.push(myWeightCalculator.calculateLeftSideCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]));
        }
        let finalResult = myWeightCalculator.buildResult(resultRightSide, resultLeftAndRightSide);
        myWeightCalculator.showResult(outputElement, finalResult);
    }
    fr.readAsText(this.files[0]);
})