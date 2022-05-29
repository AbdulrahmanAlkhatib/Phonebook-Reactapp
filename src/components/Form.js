import React from "react"

const Form =({addName, newName, newPhone, handleNameChange, handlePhoneChange}) => {
    return(
        <div>
            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    number: <input value={newPhone} onChange={handlePhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form