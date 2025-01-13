import React from 'react'
import infoAlert from '../images/info-alert.png'

export default function InfoBanner() {
  const [bannerShown, setBannerShown] = React.useState(true)

  return (
    bannerShown && (
      <div className='info-banner'>
        <div className='info-content'>
          <img className='info-icon' alt='info logo' src={infoAlert} />
          <p>
              <strong>Heads up! 🧑‍🍳</strong> 
              Due to the free-tier AI API, the recipe generation works best with 3-5 ingredients. 
                •  
              <a target='_blank' href="https://huggingface.co/mistralai/Mixtral-8x7B-Instruct-v0.1">
                 Learn more
              </a>
          </p>
        </div>
        <button
          className='close-banner'
          aria-label='Close banner'
          onClick={() => setBannerShown(false)}
        >
          ✖
        </button>
      </div>
    )
  )
}