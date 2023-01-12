import React from 'react'
import { PuppyInterface } from "../interface/puppyInterface";


interface Props {
    puppy: PuppyInterface,
    closeDetails: Function
  }
export const PuppyCardDetail = ({ puppy, closeDetails }: Props) => {
    const { id, name, breed, birthDate} = puppy
  return (
    <div className='puppyCardDetail'>
    <button className='button_delete' onClick={() => closeDetails() }>X</button>
    <p>PuppyID: {id}</p>
    <p>Name: {name}</p>
    <p>BirthDay: {birthDate}</p>
    <p>Breed: {breed}</p>
    <img alt="pic" src="https://loremflickr.com/320/240/dog" />
  </div>
  )
}
