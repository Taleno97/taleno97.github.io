class weightCalculator {
    /*
    * Klasse braucht:
    * alle Gewichte die ausgerechnet werden sollen                  - allWeights
    * alle Gewichte die ich verwenden kann                          - myUsableWeights
    * alle Kombinationen um die gewünschten Gewichte abzubilden      - combinations
    * */
    constructor(allWeights, myUsableWeights, combinations) {
        this.allWeights = function (){
            let tmpArray = [];
            for(let i = 0; i < 1000; i++){
                tmpArray[i] = i * 10 + 10;
            }
            return tmpArray;
        };
        this.myUsableWeights = [5000, 1000, 1000, 1000, 500, 500, 500, 100, 100, 100,50, 50, 10, 10, 10];
        this.combinations = combinations;
    }
    calculateCombinations(usableWeights, weightToCalculate) {
        let usedWeightSum = 0
        let combinations = [];
        for(let i = 0; i < usableWeights.length ; i++) {
            if(weightToCalculate >= (usedWeightSum + usableWeights[i])){
                usedWeightSum += usableWeights[i];
                combinations.push(usableWeights[i])
            }
        };
        return {
            combinations,
            success: usedWeightSum == weightToCalculate,
            'used Weight Sum':usedWeightSum,
            weightToCalculate
        }
    }
    calculateLeftSideCombinations(usableWeights, weightToCalculate) {
        let usedWeightSum = 0
        let rightSideWeight;
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
                    success: (usedWeightSum + weightToCalculate) == tmpRightSideWeight,
                    'used Weight Sum Left Side': usedWeightSum,
                    'used Weight Right Side': tmpRightSideWeight,
                    weightToCalculate
                }
            }
        };
    }

}

myWeightCalculator = new weightCalculator();
weightsToCheck = myWeightCalculator.allWeights();
//console.table(myWeightCalculator.calculateCombinations(myWeightCalculator.myUsableWeights, 5570));

//for(let i = 0; i < weightsToCheck.length ; i++) {
//   let result = myWeightCalculator.calculateCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]);
// console.table(result);
//}
let result = [];
for(let i = 0; i < weightsToCheck.length ; i++){
    console.table(myWeightCalculator.calculateLeftSideCombinations(myWeightCalculator.myUsableWeights, weightsToCheck[i]));
}

// console.table(myWeightCalculator.calculateCombinations(myWeightCalculator.myUsableWeights, 5570, 0 ,[], [], [], 0));
