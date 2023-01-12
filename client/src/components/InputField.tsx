import React from 'react'
import { PuppyInterface } from "../interface/puppyInterface";

interface Props{
    category: string,
    onChange: any,
    isRequired?: boolean
    value?: string|number
  }

export const InputField = ({ category, onChange, value }: Props) => {
  return (
    <div className='inputContainer'>
    <label htmlFor={category}>{category}</label>
    <input
      onChange={onChange}
      name={category}
      defaultValue={value}
      className='inputField2'
    />
  </div>
  )
}
