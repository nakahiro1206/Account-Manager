import { memo } from 'react';
import Button from '@mui/material/Button'

export const SubmitButton = memo((props:{initializeInput:Function, addRecord:Function, updateRecord:Function, enabled:boolean, isEdited:boolean}) => {
    const {initializeInput, addRecord, updateRecord, enabled, isEdited} = props;
    return (
        <Button 
            onClick={()=>{
                if(isEdited){
                    updateRecord();
                }
                else{
                    addRecord();
                }
                initializeInput();
            }} 
            variant="contained" 
            color="primary"
            sx={{mr: '6px' }}
            disabled={! enabled}
        >
            {(isEdited)? "Edit" : "Add"}
        </Button>
    )
})


export const ResumeButton = memo((props:{initializeInput:Function}) => {
    const {initializeInput} = props;
    return (
        <Button 
            onClick={()=>{
                initializeInput();
            }} 
            variant="contained" 
            color="primary"
        >
            Resume
        </Button>
    )
})