import React from 'react'
import {CgMouse} from 'react-icons/cg';
import "./Home.css"
import Product from "./Product.js"
import MetaData from '../layout/MetaData.js';

const Home = () => {
  const product = {
    name:  "iPhone 13 Pro",
    price: "$900",
    image:[{url:"https://www.imagineonline.store/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_823x.jpg?v=1692351320"},],
    _id:  "5f6839247dffb6e9a8dd1adb",
    }

  return (
    <>
    <MetaData title="ECOMMERCE" />
      <div className='banner'>
        <p>Welcome to BuyIt</p>
        <h1>Find Amazing Products Below</h1>
        <a href='#container'>
            <button>
                Scroll <CgMouse />
            </button>
        </a>
      </div>

        <h2 className='homeHeading'>Featured Products</h2>

        <div className='container' id='container'>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
          <Product product={product}/>
        </div>
    </>
  )
}

export default Home
