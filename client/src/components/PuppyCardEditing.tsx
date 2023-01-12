import React, {useState} from 'react'
import { PuppyInterface } from "../interface/puppyInterface";
import { InputField } from './InputField';


interface Props {
    puppy: PuppyInterface,
    updatePuppy: Function,
    closeEditing:Function
  }
export const PuppyCardEditing = ({puppy, updatePuppy, closeEditing}: Props) => {
    const { id, name, breed, birthDate} = puppy || {};
    const [newPuppy, setNewPuppy] = useState(puppy);
  
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewPuppy({ ...newPuppy, [event.target.name]: event.target.value });
    };
  
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updatePuppy(id as number, newPuppy);
    }
  
    return (
      <div className='puppyCardEditing'>
        <form onSubmit={submitForm} className="form_editing">
        <button className='button_delete' onClick={() => closeEditing()}>X</button>
          <p>PuppyID:  {id}</p>
          <InputField category="name" onChange={onChange} value={name} />
          <InputField category="breed" onChange={onChange} value={breed} />
          <InputField category="birthDate" onChange={onChange} value={birthDate} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
