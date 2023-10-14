import React from "react";



function Carousel ({url}) {
    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100" src={url} alt="First slide" />
                </div>
            </div>
        </div>
    );
}

export default Carousel;
