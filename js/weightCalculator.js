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
            'used Weight Sum':usedWeightSum,
            weightToCalculate
        }
    }
    calculateLeftSideCombinations(usableWeights, weightToCalculate) {
        let usedWeightSum = 0
        let combinations = [];
        let tmpRightSideWeight;
        let tmpLeftSideArray;
        usableWeights.sort();
        for(let i = 0; i < usableWeights.length ; i++) {
            if(weightToCalculate < usableWeights[i]) {
                tmpRightSideWeight = usableWeights[i];
                tmpLeftSideArray = [...usableWeights.slice(0, i), ...usableWeights.slice(i + 1)];
                tmpLeftSideArray.sort().reverse();
                for (let k = 0; k < tmpLeftSideArray.length; k++) {
                    if ((weightToCalculate + usedWeightSum + tmpLeftSideArray[k]) <= tmpRightSideWeight) {
                        usedWeightSum += tmpLeftSideArray[k];
                        combinations.push(tmpLeftSideArray[k]);
                    }
                }
                return {
                    combinations,
                    success: (usedWeightSum + weightToCalculate) === tmpRightSideWeight,
                    'used Weight Sum Left Side': usedWeightSum,
                    'used Weight Right Side': tmpRightSideWeight,
                    weightToCalculate
                }
            }
            else if (weightToCalculate > usableWeights[i]) {
                if(i == (usableWeights.length - 1)){
                    tmpRightSideWeight = 'no bigger weight available';
                    return{
                        combinations,
                        success: false,
                        'used Weight Sum Left Side': usedWeightSum,
                        'used Weight Right Side': tmpRightSideWeight,
                        weightToCalculate
                    }
                }
            }
        }
    }
    showResult(htmlElement, result){
        let tbl = document.createElement('table');
        tbl.style.width = "300px";
        tbl.style.border = "1px solid black";
        let size = Object.keys(result[0]).length;
        for(let i = 0; i < result.length; i++){
            const tr = tbl.insertRow();
            for(let j = 0; j < size; j++){
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(Object.values(result[i])[j])); 
                td.style.border = "1px solid black";
            }
        }
        htmlElement.appendChild(tbl);
    }
    buildResult(resultRightSide, resultLeftSide){
        let finalResult = [];
        for(let i = 0; i < resultRightSide.length; i++){
            if (resultRightSide[i].success){
                finalResult.push(resultRightSide);
            }
            else if (resultLeftSide[i].success){
                finalResult.push(resultLeftSide);
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


console.log('Kombinationen rechte Seite:');
let resultRightSide = [];
for(let i = 0; i < weightsToCheck.length ; i++) {
    resultRightSide.push(myWeightCalculator.calculateCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]));
}
console.table(resultRightSide);



console.log('Kombinationen linke + rechte Seite:');
let result = [];
for(let i = 0; i < weightsToCheck.length ; i++){
    tmpResult = myWeightCalculator.calculateLeftSideCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]);
    if(tmpResult){
        result.push(myWeightCalculator.calculateLeftSideCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]));
    }
}
console.table(result);


let finalResult = myWeightCalculator.buildResult(resultRightSide, result);
// console.table(finalResult);
// myWeightCalculator.showResult(outputElement, finalResult);
