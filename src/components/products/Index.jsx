import { useState, useEffect } from 'react'
import Loading from '../loading/Index'
import './Index.scss'

function Products() {
    const [items, setItems] = useState({})
    const [removeLoading, setRemoveLoading] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/items", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setItems(data)
            setRemoveLoading(true)
        })
        .catch(err => console.log('deu ruim', err))
    }, [])

  return (
    <>
        <div id="products">
            {items.length > 0 && items.map((item) => ( 
                <div className="product">
                    <div className="photo">
                        <img src={item.imageUrl} alt="Product photo" />
                    </div>
                    <div className="infos">
                        <div className="name">{item.name}</div>
                        <div className="initial-price">{(item.price/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                        <div className="price">{(item.sellingPrice/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                    </div>
                </div>
            ))}
            {!removeLoading && <Loading/>}
        </div>
    </>
  )
}

export default Products