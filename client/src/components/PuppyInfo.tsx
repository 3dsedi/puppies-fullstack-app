import React from 'react'
import { PuppyInterface } from '../interface/puppyInterface'

interface newInterface {
  puppyInfo: PuppyInterface[]
}

export const PuppyInfo:React.FC<newInterface>  = (props) => {
  return (
    <>
    <div>{props.puppyInfo[0].id}</div>
    {/* <div>{props.name}</div>
    <div>{props.breed}</div>
    <div>{props.birthDate}</div> */}
    </>
  )
}
