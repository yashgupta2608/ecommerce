import react,{createContext,useContext,useState,useEffect} from "react";

import{toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext=({children})=> {
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantity, settotalQuantity] = useState(0);
    const [qty, setqty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
        
        if(checkProductInCart) {
          const updatedCartItems = cartItems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
            }
          })
    
          setcartItems(updatedCartItems);
        } else {
          product.quantity = quantity;
          
          setcartItems([...cartItems, { ...product }]);
        }
    
        toast.success(`${qty} ${product.name} added to the cart.`);
      } 
      const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id)

        settotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price * foundProduct.quantity)

        settotalQuantity(prevTotalQuantity => prevTotalQuantity - foundProduct.quantity)

        setcartItems(newCartItems);
      }
      const toggleCartItemsQuantity = (id,value) => {
          foundProduct = cartItems.find((item) => item._id === id);
          index = cartItems.findIndex((product)=> product._id === id);
          const newCartItems = cartItems.filter((item) => item._id !== id)

          if (value === 'inc'){
            
            setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1} ])
            settotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price)
            settotalQuantity(prevTotalQuantity => prevTotalQuantity + 1)
          }else if (value === 'dec'){
            if(foundProduct.quantity > 1 ){
            setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity - 1} ])
            settotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price)
            settotalQuantity(prevTotalQuantity => prevTotalQuantity - 1)
            }
          }
      }
      const incQty = () => {
        setqty((prevQty) => prevQty + 1);
      }
    
      const decQty = () => {
        setqty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }
    return (
        <Context.Provider
          value={{
            showCart,
            setshowCart,
            cartItems,
            totalPrice,
            totalQuantity,
            qty,
            incQty,
            onAdd,
            decQty,            
            setcartItems,
            settotalPrice,
            settotalQuantity,
            toggleCartItemsQuantity,
            onRemove
          }}
        >
          {children}
        </Context.Provider>
      )
    }
    

export const useStateContext =()=>useContext(Context);


