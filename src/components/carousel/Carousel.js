import "../../App.css";

const Carousel = () => {
  return (
    <div className="mb-3">

<div id="homepage-carousel" className="carousel slide" data-bs-ride="carousel" >
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={require("../../assets/carousel-1.jpg")} className="d-block w-100" alt="slide-1" />
    </div>
    <div className="carousel-item">
      <img src={require("../../assets/carousel-2.jpg")} className="d-block w-100" alt="slide-2" />
    </div>
    <div className="carousel-item">
      <img src={require("../../assets/carousel-3.jpg")} className="d-block w-100" alt="slide-3" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#homepage-carousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#homepage-carousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>
  )
}

export default Carousel