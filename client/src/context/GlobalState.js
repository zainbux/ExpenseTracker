import React, { createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

//inital state
const initalState = { 
    transactions: [],
    error: null,
    loading: true
}

//Create context

export const GlobalContext = createContext(initalState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initalState);

    // Actions
    async function getTransactions(){
        try {
          const res= await axios.get('/api/v1/transactions');

          dispatch({
              type: 'GET_TRANSACTIONS',
              payload: res.data.data
          })
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction(id) {
         try {
             await axios.delete(`/api/v1/transactions/${id}`);

             dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
         } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
         }
    }

    // Actions
    async function addTransaction(transaction) {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            })
        }

    }
    

    return(<GlobalContext.Provider value={{
        transactions:state.transactions,
        getTransactions,
        err:state.error,
        loading: state.loading,
        deleteTransaction,
        addTransaction

    }}>
        {children}
    </GlobalContext.Provider>);
}