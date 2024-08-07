import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform that enables businesses and individuals to buy and sell goods and services over the internet. These websites typically feature product listings that include detailed descriptions, prices, and images. They provide a shopping cart system where customers can add items they wish to purchase, and a secure checkout process that supports various payment methods, such as credit/debit cards and digital wallets. Additionally, e-commerce websites handle order management, including processing, shipping, and tracking. Many sites also offer customer accounts for easier future transactions, order history, and personalized experiences. To enhance user experience, they often include search functions and organized categories to help customers find products easily.</p>
        </div>
    </div>
  )
}

export default DescriptionBox
