/**
 * calcBalance: calculate balance and re-assign id.
 */
export const calcBalance =(recordList: Array<record>):Array<record>=>{
  let tmpBalance = 0;
  const newRecordList = recordList.map((elem, index)=>{
    elem.balance = tmpBalance - elem.amount;
    tmpBalance -= elem.amount;
    elem.id = index;
    return elem
  });
  return newRecordList
};

export const insertRecord = (input:record, recordList: Array<record>):Array<record> => {
  let newRecordList: Array<record> = [];
  if(input.date >= recordList[recordList.length-1].date){
    newRecordList = [...recordList, input];
  }
  else if(input.date < recordList[0].date){
    newRecordList = [input, ...recordList];
  }
  else{
    let start:number = 0;
    let end:number = recordList.length;
    while(start+1<end){
      // start <= new < end
      const mid:number = Math.floor((start + end)/2);
      if(input.date < recordList[mid].date){end = mid;}
      else{start = mid;}
    }
    newRecordList = [...recordList.slice(0,end), input, ...recordList.slice(end)]
  }
  return newRecordList;
};

export const getMonthlyRecordList = (recordList:Array<record>, date:Date)=>{
  const thisMonth = (date.getFullYear()*100 + date.getMonth()+1) *100;
  const nextMonth = (date.getFullYear()*100 + date.getMonth()+2) *100;
  if(recordList[recordList.length-1].date < thisMonth){
    return [];
  }
  if(recordList[0].date >= nextMonth){
    return [];
  }

  /**
   * slice(startIndex, endIndex)
   * Array[endIndex] is not included in the sliced array.
   */ 
  let startIndex = -1; let endIndex = -1;
  if(recordList[0].date >= thisMonth){startIndex = 0;}
  if(recordList[recordList.length-1].date < nextMonth){endIndex = recordList.length}

  if(startIndex == -1){
    let start = 0; let end = recordList.length-1;
    while(start+1 < end){
      const mid = Math.floor((start + end)/2);
      if(recordList[mid].date >= thisMonth){
        end = mid;
      }
      else{start = mid;}
    }
    startIndex = end;
  }
  if(endIndex == -1){
    let start = 0; let end = recordList.length-1;
    while(start+1 < end){
      const mid = Math.floor((start + end)/2);
      if(recordList[mid].date < nextMonth){
        start = mid;
      }
      else{end = mid;}
    }
    endIndex = end;
  }
  return recordList.slice(startIndex, endIndex);
}

export const stripRecord = (index: number, recordList:Array<record>):Array<record> =>{
  const stripped = recordList.slice(0,index).concat(recordList.slice(index+1))
  return stripped
}