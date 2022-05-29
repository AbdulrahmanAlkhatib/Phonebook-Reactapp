import { useEffect, useState } from 'react'
import Form from './components/Form'
import Filter from './components/Filter'
import Phonebook from './components/Phonebook'
import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filtered, setFiltered] = useState('')

  useEffect(
    () => {
      axios
        .get(baseURL)
        .then( Response => setPersons(Response.data))
    }
  ,[])

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) =>{
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    let add = true 
    event.preventDefault()
    const newObject = {
      name: newName,
      phone: newPhone,
      id: persons.length+1
    }    
    persons.filter(person => {
      if(person.name === newObject.name) {
        add = false
      }
      console.log(add)
    })
    if(add){
      axios
        .post(baseURL, newObject)
        .then( response => setPersons(persons.concat(response.data)) )
      //setPersons(persons.concat(newObject))
      setNewName('')
      setNewPhone('')
    }else{
      if(window.confirm(`the name is already added, do you want to update the number`)){
        persons.map(person => {
          if(person.name === newObject.name){
            axios
              .put(`${baseURL}/${person.id}`,newObject)
              .then(response => console.log(response.data))
          }
        })
      }
    } 
  }

  const personsToShow = (filtered === '') ? persons : persons.filter(person => person.name.includes(filtered))

  const handleFilter = (event) => {
    setFiltered(event.target.value)
    console.log(personsToShow)
  }

  const deletePhone = (event) => {
    event.preventDefault()
    let name = ''
    /*persons.filter( person => {
      if(person.id === event.target.value) {
        name = person.name
      }
    })*/
    if ( window.confirm(`do you confirm the deletion`)) {
      axios.delete(`${baseURL}/${event.target.value}`)
      setPersons(persons.filter( person => person.id !== event.target.value ))
    }   
}


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filtered={filtered} handleFilter={handleFilter} />
      <h2>Add New</h2>
      <Form 
        addName={addName} 
        newName={newName} 
        newPhone={newPhone} 
        handleNameChange={handleNameChange} 
        handlePhoneChange={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Phonebook personsToShow={personsToShow} deletePhone={deletePhone}/>
    </div>
  )
}

export default App