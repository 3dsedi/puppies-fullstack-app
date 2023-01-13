 import React, {useRef} from 'react'
import './AddPuppyForm.css'


type NewPuppyProps = {
    savePuppy: (enteredPuppy: {name: string; breed: string; birthDate: string; img: string}) => void 

}
export const AddPuppyForm: React.FC<NewPuppyProps>= (props) => {
    const nameInputRef = useRef<HTMLInputElement>(null);
    const breedInputRef = useRef<HTMLInputElement>(null);
   const birthDateInputRef = useRef<HTMLInputElement>(null);
   const imgInputRef = useRef<HTMLInputElement>(null);

    const puppySubmitHandler  =(event: React.FormEvent) => {
        event.preventDefault();
        const enteredPuppy = {
           name: nameInputRef.current!.value,
            breed: breedInputRef.current!.value,
            birthDate: birthDateInputRef.current!.value,
            img: imgInputRef.current!.value}

        props.savePuppy(enteredPuppy)
    }
    

  return (
    <form className='form' onSubmit={puppySubmitHandler} >
    <div className='from__itemes'>
      <div>
        <label className='form__lable' htmlFor='name'>Name</label>
        <input className='form__input' type='text' id='name' ref={nameInputRef} />
      </div>
      <div>
        <label className='form__lable' htmlFor='breed'>Breed</label>
        <input className='form__input' type='text' id='breed' ref={breedInputRef}/>
      </div>
      <div>
        <label className='form__lable' htmlFor='birth date'>Birth Date</label>
        <input className='form__input' type='date' id='birth Date' ref={birthDateInputRef} />
      </div>
      <div>
        <label className='form__lable' htmlFor='img'>Image</label>
        <input className='form__input' type='file' id='img' accept="image/*" ref={imgInputRef} />
      </div>
    </div>
    <button className='submit'>Add puppy</button>
  </form>
  )
}
