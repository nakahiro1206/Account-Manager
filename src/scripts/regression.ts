import {multiply, diag, concat, ones, transpose, matrix, inv, mean} from 'mathjs'
// 重み付き重回帰分析の関数

export const weightedRegression = (recordList: Array<record>) => {
    // analysis range.
    const makeDate = (d: number)=>{
        return new Date(Math.floor(d/10000), Math.floor((d%10000)/100)-1, d%100);
    }
    const dateStart = makeDate( recordList[0].date );
    const dateEnd = makeDate( recordList[recordList.length-1].date );
    const dataSize = Math.floor( (dateEnd.getTime() - dateStart.getTime()) /86400000) + 1;
    const RegressionData = {
        dependent: {
            date: Array<number>(dataSize).fill(0), 
            balance: Array<number>(dataSize).fill(0), 
            weight: Array<number>(dataSize).fill(0)
        }, 
        object: Array<number>(dataSize).fill(0),
        result: Array<number>(3).fill(0)
    }
    // add date: date * balance
    recordList.forEach((elem)=>{
        if(elem.amount <= 0){return;}
        const tmpDate = makeDate(elem.date);
        const idx = Math.floor( (tmpDate.getTime() - dateStart.getTime()) /86400000);
        RegressionData.object[idx] += elem.amount;
        RegressionData.dependent.balance[idx] = Math.max(elem.amount+elem.balance, RegressionData.dependent.balance[idx]);
    });
    // calc balance & set weight
    // let tmpBalance = 155850;
    let tmpDate = dateStart;
    for(let i=0;i<dataSize;i++){
        if(RegressionData.dependent.balance[i] == 0 && i>0){
            RegressionData.dependent.balance[i] = RegressionData.dependent.balance[i-1];
        }
        // tmpBalance -= RegressionData.object[i];
        // RegressionData.dependent.weight[dataSize-1 -i] = Math.pow(0.9, Math.floor(i/31));
        RegressionData.dependent.weight[dataSize-1 -i] = 1;
        RegressionData.dependent.date[i] = tmpDate.getDate();
        tmpDate.setDate(tmpDate.getDate()+1);
    }
    console.log(RegressionData.dependent.date)

    // console.log("data", [Dependent.date,Dependent.balance], Object, Dependent.weight)
    if(Object.length==0){
        return RegressionData;
    }

    // x: [date, balance]
    const x = [RegressionData.dependent.date, RegressionData.dependent.balance];
    const y = RegressionData.object;

    // 行列Xを作成
    const X = transpose(matrix(x));

    // 重み行列を対角行列に変換
    const weights = RegressionData.dependent.weight;
    const W = diag(weights);

    // 行列の計算を行う
    const XTWX = multiply(transpose(X), multiply(W, X));
    const XTWY = multiply(transpose(X), multiply(W, matrix(y)));

    // 重み付き回帰係数を計算
    const beta = multiply(inv(XTWX), XTWY);
    const betaArray =  beta.toArray().map(e => Number(e));
    const beta0 = mean(y) - betaArray[0]*mean(x[0]) - betaArray[1]*mean(x[1]);
    RegressionData.result = [beta0, betaArray[0], betaArray[1]];

    console.log("result", RegressionData);
    return RegressionData;
}