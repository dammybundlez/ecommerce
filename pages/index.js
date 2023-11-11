import React from 'react' 
import { client } from '../lib/client'

import { Product , FooterBanner , HeadBanner } from '../components'
const Home = ({ products , banners }) => {
  return (
    <>
      <HeadBanner headbanner = {banners.length && banners[0]}/>

      <div className='products-heading'>
        <h2>
          Best Selling product
        </h2>
        <p>Speakers of many variety</p>
      </div>
      <div className='products-container'>
        {products?.map((product) => <Product key={product._id} product = {product} /> )}
      </div>

      <FooterBanner FooterBanner={banners && banners[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const BannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(BannerQuery);

  return {
    props : {
      products , banners
    }
  }
}
export default Home