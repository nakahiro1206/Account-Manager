import { memo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Padding } from '@mui/icons-material';


export const TableComponent = memo((props: {date: Date, recordList: Array<record>, removeRecord:Function, setInput:Function, initializeInput:Function})=>{
    const {date, recordList, removeRecord, setInput, initializeInput} = props;
    return (
      <table>
        <caption>{String(date.getFullYear()) +'-'+ String(date.getMonth()+1).padStart(2,'0')}</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map((record) => {
            if(record.id==176){console.log(record)}
            // return <RecordComponent key={record.id} record={record} />;
            return (
              <tr key={record.id}>
                <td width='15%'>{String(record.date).slice(-2)}</td>
                <td width='20%'>{record.category}</td>
                <td style={{paddingRight:'5%'}} width='15%' align="right">{record.amount}</td>
                <td width='30%'>{record.note}</td>
                <td width='15%'>{record.balance}</td>
                <td width='5%'>
                  <Tooltip
                    placement="right"
                    title={
                      <div>
                        <IconButton
                          onClick={()=>setInput(record)}
                        >
                          <EditIcon fontSize='small' sx={{color: '#FFFFFF'}}/>
                        </IconButton>
                        <IconButton
                          onClick={()=>{
                            console.log(record.id);
                            removeRecord(record.id);
                            initializeInput();
                          }}
                        >
                          <DeleteIcon fontSize='small' sx={{color: '#FFFFFF'}} />
                        </IconButton>
                      </div>
                    }
                  >
                    <MoreVertIcon />
                  </Tooltip>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  });