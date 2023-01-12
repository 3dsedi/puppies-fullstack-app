import React, { useState, useEffect } from "react";
import { PuppyList } from "./components/PuppyList2";
import { Puppy } from "../../server/models/puppy";
import { AddPuppyForm } from "./components/AddPuppyForm";
import { PuppyCard } from "./components/PuppyCard";
import './App.css';

function App() {
  const [puppy, setPuppy] = useState<Puppy[]>([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/puppies");
    const data = await response.json();
    const puppies = data.puppies;
    setPuppy(puppies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const puppyAddHandler = async (enteredPuppy: {
    name: string;
    breed: string;
    birthDate: string
  }) => {
    // console.log(enteredPuppy)
    const { name, breed, birthDate } = enteredPuppy;
    const reqBody = { name, breed, birthDate, id: Date.now() };
    const response = await fetch("http://localhost:8000/api/puppies", {
      mode: 'cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(reqBody),
    });

    if (response.status === 201) {
      const result = await response.json();
      setPuppy(result.puppies);
    }
      
  };
   
  const removePuppyHandler = async(id: number)  => {
    await fetch( `http://localhost:8000/api/puppies/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
    // if (response.status === 200) {
    //   const result = await response.json();
    //   setPuppyList(result.puppies);
    // }
    fetchData()
  };

  const updatePuppyHandler = async(id: number, updatePuppy: {
    name: string;
    breed: string;
    birthDate: string;
  })  => {
    console.log('update working')
    const {name, breed, birthDate } = updatePuppy
    const reqBody = { name, breed, birthDate,id}
    await fetch( `http://localhost:8000/api/puppies/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(reqBody),
    })
    fetchData()
  };
    
  const PuppyList = () =>
  <main className='puppyContainer'>
    {puppy?.map((p,index) =>
      <PuppyCard
        key={index}
        puppy={p}
        onDeletePuppy={removePuppyHandler}
        onUpdatePuppy={updatePuppyHandler}
      />)}
  </main>

  return (
    <div className="App">
      <div className="header">
      <h3>Wellcome To Puppy Home </h3>
      <h5>Select Your Puppy to Adopt</h5>
      <h5>Or Add Your Puppy </h5>
      </div>
      <AddPuppyForm  savePuppy={puppyAddHandler}/>
      <PuppyList  />
    </div>
  );
}

export default App;
