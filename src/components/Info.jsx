import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";

const Info = ({title, subtitle, imageUrl}) => {
  const {setIsCartOpen} = useContext(AppContext)

  return (
    <section className="infoBlock">
      <img src={imageUrl} alt={title} draggable='false'/>
      <h4>{title}</h4>
      <p>{subtitle}</p>
      <Link to='/' className='infoButton' onClick={() => setIsCartOpen(false)}>
        К покупкам
        <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">*
          <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </section>
  );
};

export default Info;