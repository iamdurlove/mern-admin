import React from 'react';
import '../components/css/ServiceBox.css'; // 


const ServiceBox = ( props ) =>
{
    return (
        <div className="servicebox-container">
            <div className="service-image">
                <img src="/vite.svg" alt="service-image" />
            </div>
            <div className="service-info">
                <h2>{ props.service }</h2>
                <p>{ props.description }</p>
            </div>
            <div className="service-cost">
                <div className='service-provider' >Provider: { props.provider }</div>
                <div className='service-price' >Starting from { props.price }</div>
            </div>
        </div>
    )
}

export default ServiceBox