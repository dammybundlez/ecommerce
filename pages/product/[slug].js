import React , { useState } from 'react'
import { urlFor , client } from '../../lib/client'
import { AiOutlineMinus , AiOutlinePlus , AiFillStar , AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components'
import { useStateContext } from '../../context/stateContext'


const ProductDetails = ({ products , product }) => {
    const { image , name , price , details} = product;
    const [index , setindex] = useState(0)
    const { qty , increaseQuantity , decreaseQuantity , onAdd } = useStateContext()
    
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[index])} className='product-detail-image'/>
                </div>
                <div className='small-images-container'>
                    {image?.map((item , i) => (
                        <img src={urlFor(item)}
                        className={i === index ?
                        'small-image selected-image ' :
                        'small-image'
                    } onMouseEnter={() => setindex(i)}/>
                    ))}
                </div>
            </div>
            <div className='product-detail-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiFillStar/>
                        <AiOutlineStar/>
                    </div>
                    <p>(20)</p>
                </div>
                <h4>Details:</h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3>Quantity: </h3>
                    <p className='quantity-desc'>
                        <span className='minus' onClick={decreaseQuantity}><AiOutlineMinus/></span>
                        <span className='num' onClick=''>{qty}</span>
                        <span className='plus' onClick={increaseQuantity}><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className='buttons'>
                    <button className='add-to-cart' type='button' onClick={() => onAdd(product , qty)}>Add To Cart</button>
                    <button className='buy-now' type='button'>Buy Now</button>
                </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((items) => (
                        <Product key={items._id} product={items} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "produt"] {
        slug { current }
    }`
    const products = await client.fetch(query)
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths, fallback: 'blocking'
    }
}



export const getStaticProps = async ({ params: {slug} }) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    const BannerQuery = '*[_type == "banner"]';
    const banners = await client.fetch(BannerQuery);
  
    return {
      props : {
        products , product
      }
    }
  }
  
export default ProductDetails