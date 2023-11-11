import React from 'react'
import Link from 'next/link'

import  {urlFor} from '../lib/client'

const HeadBanner = ({headbanner}) => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'>{headbanner.smallText}</p>
            <h3>{headbanner.midText}</h3>
            <h1>{headbanner.largeText1}</h1>
            <img src={urlFor(headbanner.image)} alt="headphones" className='hero-banner-image' />

            <div>
                <Link href={`/product/${headbanner.product}`}>
                    <button type='button'>{headbanner.buttonText}</button>
                </Link>
                    <div className='desc'>
                        <h5>description</h5>
                        <p>{headbanner.desc}</p>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default HeadBanner