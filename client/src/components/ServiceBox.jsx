const ServiceBox = ( props ) =>
{
    return (
        <div className="servicebox-container">
            <div className="service-image">
                <img src="/public/vite.svg" alt="service-image" />
            </div>
            <div className="service-info">
                <h2>{ props.service }</h2>
                <p>{ props.description }</p>
            </div>
            <div className="service-price">
                <h3>Starting from { props.price }</h3>
            </div>
        </div>
    )
}

export default ServiceBox