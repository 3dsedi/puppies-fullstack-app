 import React, {useRef} from 'react'
import './AddPuppyForm.css'


type NewPuppyProps = {
    savePuppy: (enteredPuppy: {name: string;breed: string; birthDate: string;}) => void 

}
export const AddPuppyForm: React.FC<NewPuppyProps>= (props) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const breedInputRef = useRef<HTMLInputElement>(null);
   const birthDateInputRef = useRef<HTMLInputElement>(null);

    const puppySubmitHandler  =(event: React.FormEvent) => {
        event.preventDefault();
        const enteredPuppy = {
           name: nameInputRef.current!.value,
            breed: breedInputRef.current!.value,
            birthDate: birthDateInputRef.current!.value}

        props.savePuppy(enteredPuppy)
    }
    

  return (
    <form className='form' onSubmit={puppySubmitHandler} >
    <div className='from__itemes'>
      <div>
        <label htmlFor='name'>Name</label>
        <input  type='text' id='name' ref={nameInputRef} />
      </div>
      <div>
        <label htmlFor='breed'>Breed</label>
        <input type='text' id='breed' ref={breedInputRef}/>
      </div>
      <div>
        <label htmlFor='birth date'>Birth Date</label>
        <input type='text' id='birth Date' ref={birthDateInputRef} />
      </div>
    </div>
    <button >Add new puppy</button>
  </form>
  )
}
