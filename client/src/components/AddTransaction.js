import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'



export const AddTransaction = () => {
    
    const[text, SetText] = useState('');
    const[amount, SetAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: Math.floor(Math.random()  * 10000000),
            text,
            amount: +amount
        }

        addTransaction(newTransaction);
    }

    return (
        <>
        <h3>Add new transaction</h3>
        <form onSubmit={onSubmit}>
            <div className="form-control">
            <label htmlFor="text">Text</label>
            <input value={text} onChange={(e) => SetText(e.target.value)} type="text" placeholder="Enter text..." />
            </div>
            
            <div className="form-control">
            <label htmlFor="amount"
                >Amount <br />
                (negative - expense,    positive - income)</label
            >
            <input value={amount} onChange={(e) => SetAmount(e.target.value)} type="number" placeholder="Enter amount..." />
            </div>
            <button className="btn">Add transaction</button>
        </form> 
        </>
    )
}
