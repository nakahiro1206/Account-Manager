import { useState, useEffect, useCallback, memo } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { ChartComponent} from './ChartComponent';
import { TableComponent } from './TableComponent';
import {calcBalance, getMonthlyRecordList, insertRecord, stripRecord} from './handleList';
import { SelectCategory } from './SelectCategory';
import {InputAmount, InputNote} from './InputAmount';
import { SubmitButton, ResumeButton } from './Buttons';
import { loadCategory,loadRecordList,storeRecordList } from './App';

export const HomeScreen = (props: {loadCategory:Function, loadRecordList:Function, storeRecordList:Function}) => {
  // const {loadCategory,loadRecordList,storeRecordList} = props;
  const [recordList, setRecordList] = useState<Array<record>>([]);
  const [monthlyRecordList, setMonthlyRecordList] = useState<Array<record>>([]);
  const [categoryList, setCategory] = useState<Array<string>>([]);
  const [date, setDate] = useState<Date>(new Date());

  const inputInitial = ()=>{
      return {
          id: -1,
          date: (()=>{return (date.getFullYear()*100 + date.getMonth()+1)*100 + date.getDate();})(), 
          category: '',
          amount: 0,
          note: '',
          balance: 0
      }
  };
  const [input, setInput] = useState<record>(inputInitial());
  const initializeInput = ()=>{setInput(inputInitial())};
  const setInputAmount = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput({ ...input, amount: Number(e.target.value)})
  }, [input]);
  const setInputCategory = useCallback((category:string)=>{
    setInput({...input, category: category});
  }, [input])
  const setInputNote = useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput({...input, note: e.target.value});
  }, [input])

  const setInputDate = useCallback((e:Date)=>{
    setDate(e);
    setInput({ ...input, date: (e.getFullYear()*100 + e.getMonth()+1)*100 + e.getDate()});
  }, [date])

  const [submitButtonEnabled, setSubmitButtonEnabled] = useState<boolean>(false)
  const [isEditedRecord, setIsEditedRecord] = useState<boolean>(false)
  const addRecord = ()=>{setRecordList(calcBalance(insertRecord(input,recordList)))}
  const removeRecord = (index:number)=>{setRecordList(calcBalance(stripRecord(index, recordList)))}
  const updateRecord = ()=>{setRecordList(calcBalance(insertRecord(input,stripRecord(input.id, recordList))))}

  /**
   * useEffect は第二引数の変更時に実行される.
   * []を空欄にしてたら初回時のみ実行.
   */
  useEffect(() => {
    // loadCategory().then((category:Array<string> | null)=>{
    //   if(category){
    //     setCategory(category)
    //   }
    // });
    loadRecordList().then((recordList:Array<record> | null) => {
      if (recordList) {
      //   setTodoList: useState for recordList
      //   const cmpFunc = (a: record, b: record)=>{
      //     if(a.date < b.date){return -1;}
      //     else if(a.date > b.date){return 1;}
      //     else{
      //       if(a.amount < b.amount){return -1;}
      //       else if(a.amount > b.amount){return 1;}
      //       else{return 0;}
      //     }
      //   }
      //   recordList.sort(cmpFunc);
        calcBalance(recordList);
        setRecordList(recordList);
      }
    });
  }, []);
  useEffect(()=>{
      if(recordList.length > 0){
        console.log("recordList was updated")
        storeRecordList( recordList );

        const newCategoryList:Array<string> = [];
        recordList.forEach((elem:record)=>{
          if(newCategoryList.indexOf(elem.category) == -1){
            newCategoryList.push(elem.category)
          }
        })
        setCategory(newCategoryList)
      }
  }, [recordList]);
  useEffect(()=>{
    console.log("monthlyRecordList was changed")
  }, [monthlyRecordList]);
  useEffect(()=>{
    if(recordList.length >0 && date !== undefined){
      const newMonthlyRecordList = getMonthlyRecordList(recordList, date);
      console.log("monthlyRecordList was updated")
      setMonthlyRecordList(newMonthlyRecordList)
    }
  }, [recordList, date]);
  useEffect(()=>{
    if(input.id === undefined){setSubmitButtonEnabled(false)}
    else if(input.date === undefined){setSubmitButtonEnabled(false)}
    else if(input.category == ''){setSubmitButtonEnabled(false)}
    else if(input.amount == 0){setSubmitButtonEnabled(false)}
    else{setSubmitButtonEnabled(true)}

    if(input.id === undefined || input.id == -1){setIsEditedRecord(false)}
    else{setIsEditedRecord(true)}
    console.log("submitEnable, isEditedRecord was updated")
  },[input])

  return (
    <div>
      <div className="container">
        <div className='chart'>
          <ChartComponent date = {date} recordList = {monthlyRecordList} categoryList={categoryList} />
        </div>
        <div className="input-field">
          <DatePicker 
            // move popper to the top layer.
            portalId="root-portal"
            className='datePicker'
            dateFormat="yyyy/MM/dd"
            selected={date} 
            onChange={setInputDate}
            timeIntervals={30}
          />
          <SelectCategory category = {input.category} setInputCategory = {setInputCategory} categoryList={categoryList} />
          <InputAmount amount = {input.amount} setInputAmount = {setInputAmount} />
        </div>
        <div className="input-field">
          <InputNote note = {input.note} setInputNote = {setInputNote} />
          <SubmitButton initializeInput={initializeInput} addRecord={addRecord} updateRecord={updateRecord} enabled={submitButtonEnabled} isEdited={isEditedRecord}/>
          <ResumeButton initializeInput={initializeInput} isEdited={isEditedRecord}/>
        </div>

        <div className='scroll-container'>
          <TableComponent date={date} recordList={monthlyRecordList} removeRecord={removeRecord} setInput={setInput} initializeInput={initializeInput}/>
        </div>
      </div>
    </div>
  )
}