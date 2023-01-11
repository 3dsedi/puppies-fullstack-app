import React, { useState, useEffect } from "react";
import { PuppyList } from "./components/PuppyList";
import { Puppy } from "../../server/models/puppy";
import { AddPuppyForm } from "./components/AddPuppyForm";

function App() {
  const [puppyList, setPuppyList] = useState<Puppy[]>([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8000/api/puppies");
    const data = await response.json();
    const puppies = data.puppies;
    setPuppyList(puppies);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const puppyAddHandler = async (enteredPuppy: {
    name: string;
    breed: string;
    birthDate: string;
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
      setPuppyList(result.puppies);
    }
      
  };
   
  const removePuppyHandler = async(id: number)  => {
    const response = await fetch( `http://localhost:8000/api/puppies/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
    if (response.status === 204) {
      const result = await response.json();
      console.log(result)
      setPuppyList(result.puppies);
    }
   
  
  };


  return (
    <div className="App">
      <AddPuppyForm  savePuppy={puppyAddHandler}/>
      <PuppyList puppies={puppyList}
        onDeletePuppy={removePuppyHandler}
      />
    </div>
  );
}

export default App;
