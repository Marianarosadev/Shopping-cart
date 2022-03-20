import { useState, useEffect } from 'react'
import Products from '../products/Index'
import './Index.scss'

function Cart() {
    const [value, setValue] = useState({})

    useEffect(() => {
        fetch("http://localhost:5000/value", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setValue(data)
        })
        .catch(err => console.log('deu ruim', err))
    }, [])

  return (
    <>
      <div id="cart">       
          <div className="card">
            <div className="title">Meu carrinho</div>
            <Products/>
            <div className="total">
                <span>Total</span>
                <span>{(value/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
            {(value/100) > 10 &&
                <div className="shipping">
                    <span>Parabéns, sua compra tem frete grátis !</span>
                </div>
            }
            <div className="finish">
                <button type="button" className="button-primary">Finalizar compra</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default Cart