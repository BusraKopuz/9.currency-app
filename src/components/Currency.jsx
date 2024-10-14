import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import '../components/currency.css';
import { schemas } from '../schema/schemas';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest"
let API_KEY = "fca_live_mqcOZDbiD1rPLnzOhpogTwdyECyPAmwDvXe7R3c2"

function Currency() {

    const [result, setResult] = useState(null);

    const exchange = async (values) => {
        try {
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${values.fromCurrency}`);
            const result = (response.data.data[values.toCurrency] * values.amount).toFixed(2);
            setResult(result);
        } catch (error) {
            console.error("API hatası:", error);
        }
    };


    const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: {
          amount: '',
          fromCurrency: 'USD',
          toCurrency: 'TRY',
        },
        validationSchema: schemas,
        onSubmit: (values, actions) => {
            exchange(values); 
            actions.setSubmitting(false);
        }
    
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='currency-div'>
                    <div  style={{ fontFamily:"arial",backgroundColor: "black", color:"#fff", width:"100%", textAlign:"center" }}>
                        <h3>DÖVİZ KURU UYGULAMASI</h3>
                    </div>

                    <div style={{marginTop: "25px"}}>
                        <input
                            name="amount"
                            value={values.amount}
                            onChange={handleChange}
                            type="number" 
                            className='amount' 
                        />
                        {errors.amount && <p className='input-error'>{errors.amount}</p> }

                        <select
                            name="fromCurrency"
                            value={values.fromCurrency} 
                            onChange={handleChange} 
                            className='from-currency-option'
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="TRY">TRY</option>
                        </select>
                        {errors.fromCurrency && <p className='input-error'>{errors.fromCurrency}</p> }

                        <FaRegArrowAltCircleRight style={{ fontSize: "25px", marginRight: "10px" }}/>

                        <select
                            name="toCurrency" 
                            value={values.toCurrency} 
                            onChange={handleChange} 
                            className='to-currency-option'
                        >
                            <option value="TRY">TRY</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                        </select>
                        {errors.toCurrency && <p className='input-error'>{errors.toCurrency}</p> }

                        <input
                            value={result || ''} 
                            type="number" 
                            className='result'
                            readOnly 
                        />
                    </div>
                    <div>
                        <button
                            type='submit' 
                            className='exchange-button'
                        >
                            Çevir
                        </button>
                    </div>

                </div>
            </form>
        </div>
        
    )
}

export default Currency