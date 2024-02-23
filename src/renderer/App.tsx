import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import {HomeScreen} from './HomeScreen'

// データ操作関数定義
// ToDoリストを読み込み
export const loadRecordList = async (): Promise<Array<record> | null> => {
  const recordList = await window.db.loadRecordList();
  return recordList;
};

// ToDoリストを保存
export const storeRecordList = async (recordList: Array<record>): Promise<void> => {
  await window.db.storeRecordList(recordList);
};

// load category
export const loadCategory = async (): Promise<Array<string> | null> => {
  const category = await window.db.loadCategory();
  return category;
};

// Electron window interface
interface ElectronWindow extends Window {
  db: {
    loadRecordList: () => Promise<Array<record> | null>;
    storeRecordList: (recordList: Array<record>) => Promise<void>;
    loadCategory: ()=> Promise<Array<string> | null>;
  };
}
declare const window: ElectronWindow;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen loadCategory={loadCategory} loadRecordList={loadRecordList} storeRecordList={storeRecordList}/>} />
      </Routes>
    </Router>
  );
}
