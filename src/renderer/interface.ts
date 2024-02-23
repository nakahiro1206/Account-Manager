// データ型を定義
interface record{
  id: number;
  date: number;
  // yearMonth: string;
  category: string;
  amount: number;
  note: string;
  balance:number;
}
interface ChartData{
  // labels: date list
  labels: Array<string>; 
  datasets: Array<{
    // label: category
    label: string;
    borderColor: "#4FC3F7";
    backgroundColor: "#4FC3F7";
    borderWidth: 0;
    fill: false;
    data: Array<number>;
  }>
};
interface regressionData {
    dependent: {
        date: Array<number>;
        balance: Array<number>; 
        weight: Array<number>;
    }, 
    object: Array<number>;
    result: Array<number>;
}