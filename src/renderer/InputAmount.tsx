import { memo } from 'react';

export const InputAmount = memo((props: {amount: number, setInputAmount:React.ChangeEventHandler<HTMLInputElement>}) => {
    const {amount, setInputAmount} = props;
    return (
        <input
            type="number"
            className='textInput'
            placeholder='Amount'
            value={(amount != 0) ? Number(amount) : ''}
            onChange={setInputAmount}
          />
    )
})

export const InputNote = memo((props: {note:string, setInputNote:React.ChangeEventHandler<HTMLInputElement>}) => {
    const {note, setInputNote} = props;
return (
        <input
        type="text"
        className='textInput'
        value={note}
        placeholder='Note (optional)'
        onChange={setInputNote}
        />
    )
})
