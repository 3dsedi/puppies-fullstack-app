import React from "react";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";
import "./PuppyList.css";

interface PuppiesList {
  puppies: { id: number; name: string; breed: string; birthDate: string }[];
  onDeletePuppy: (id: number) => void
}

export const PuppyList: React.FC<PuppiesList> = (props) => {
  return (
    <ul>
      {props.puppies.map((puppy) => (
        <li key={puppy.id}>
          <div>Name: {puppy.name}</div>
          <div>Breed: {puppy.breed}</div>
          <div>B.D: {puppy.birthDate}</div>
          <button>edit</button>
          <button onClick={props.onDeletePuppy.bind(null,puppy.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};
