import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import { memo } from 'react';

export const SelectCategory = memo((props: {category: string, setInputCategory: Function, categoryList: Array<string>}) => {
    const {category, setInputCategory, categoryList} = props;
    return (
        <TextInput 
            spacer='' trigger={['']} options={{'': categoryList}}
            className='textInput'
            placeholder = 'Category'
            value = {category}
            onChange={setInputCategory}
        />
    )
})
