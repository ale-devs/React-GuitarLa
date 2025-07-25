/* eslint-disable no-unused-vars */
import { use, useEffect, useState } from 'react'
import Header from './components/header'
import Guitar from './components/Guitar'
import { db } from './data/db'
import './index.css'

function App() {

    const initialCart = () => {
      const localStorageCart = localStorage.getItem('cart')
      return localStorageCart ? JSON.parse(localStorageCart) : []   
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const max_items = 5
    const min_items = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item){
        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist >= 0 ){
            if(cart[itemExist].quantity >= max_items) return
            const updateCart = [...cart]
            updateCart[itemExist].quantity++
            setCart(updateCart)
        }
        else{
            item.quantity = 1
            setCart([...cart, item])
        }

    }

    function removeFromCar(id)
    {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id)
    {
        const updateCart = cart.map(item => {
            if(item.id === id && item.quantity < max_items){
                return {
                    ...item,
                    quantity: item.quantity + 1    
                }
            }
            return item
        })
        setCart(updateCart)
    }

    function decreaseQuantity(id)
    {
        const decreaseCart = cart.map(item => {
            if(item.id === id && item.quantity > min_items){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(decreaseCart)
    }

    function clearCart(){
        setCart([])
    }

  return (
      <>
      <Header 
            cart={cart}                        
            removeFromCar={removeFromCar}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            clearCart={clearCart}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar) => (
                    <Guitar 
                    key={guitar.id} 
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                    removeFromCar={removeFromCar}
                    />
                )
                )}
            </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
