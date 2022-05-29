import React from "react"

const Phonebook = ({personsToShow, deletePhone}) => {

    return(
        <div>
            <ul>
                {personsToShow.map(
                    person =>
                        <li key={person.id}>
                            <p>{person.name}</p>
                            <p>{person.phone}</p>
                            <button value={person.id} onClick={deletePhone}>Delete</button>
                        </li>
                )}
            </ul>
        </div>
    )
}
export default Phonebook