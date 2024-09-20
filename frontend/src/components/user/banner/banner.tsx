import './banner.css';

const Banner = () => {
    return (
        <div className="container-fluid p-0" style={{ marginTop: "71px"}}>
            <div className="banner d-flex align-items-center">
                <div className="row w-100">
                    <div className="col-md-6 col-12 text-center text-md-start right-slide">
                        <img 
                            src="https://res.cloudinary.com/dlkrxem40/image/upload/v1726833095/Ecomm/pexels-jmendezrf-1536619_s2zhsy.jpg"
                            className="banner-img img-fluid rounded-circle border border-light"
                            alt="Fashion display"
                        />
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-start left-slide">
                        <h4 className="lead" style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>Welcome to EMAX</h4>
                        <p className="lead" style={{ fontSize: "1.125rem", lineHeight: "1.6" }}>
                            At EMAX, we bring you the latest trends in fashion, offering a wide range of clothing for every style and occasion. 
                            Our user-friendly platform makes shopping easy and enjoyable, providing high-quality garments that cater to all tastes. 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
