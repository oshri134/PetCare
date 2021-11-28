import React from 'react';
import './Footer.css';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscribe'>
        <p className='footer-subscribe-header'>
        Join the PetCare newsletter to receive our deals !!
        </p>
        <p className='footer-subscribe-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h3>Contact Us</h3>
            <a href="/">Address: Hashalom 15 Tel aviv</a>
            <a href="/">Number: 972+ 039772323</a>
            <a href="mailto:PetCare@Gmail.com.com">PetCare@Gmail.com</a>
            
          </div>
          <div class='footer-link-items'>
          <h3>About Us</h3>
            <Link to='/Login'>Login</Link>
            <Link to='/about'>About</Link>
            <Link to='/Contact'>Contact</Link>
            <Link to='/Blog'>Blog</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>         
          <div class='footer-link-items'>
            <h3>Social Media</h3>
            <a href="facebook.com">Instagram</a>
           
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.youtube.com/">Youtube</a>
            <a href="https://www.instagram.com/">Instagram</a>

          </div>
        </div>
      </div>                      
    </div>
  );
}

export default Footer;
