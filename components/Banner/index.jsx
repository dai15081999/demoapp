import styles from "../../styles/Banner.module.css";
import Slider from "react-slick";

const settings = {
  arrows: false,
  dots: false,
  pauseOnHover: false,
  infinite: true,
  speed: 1000,
  autoplay: true,
  variableWidth: false,
  slidesToShow: 1,
  slidesToScroll: 1,
}
const Banner = () => {
  return (
    <>
      
      <div className={styles.banner}>
        <div className={styles.top}>
        <div className={styles.slider}>
          <Slider {...settings}>
            <div>
              <img className="slide-img" src="/slider/sl1.webp" alt="" />
            </div>
            <div>
            <img className="slide-img" src="/slider/sl2.webp" alt="" />
            </div>
            <div>
            <img className="slide-img" src="/slider/sl3.webp" alt="" />
            </div>
            <div>
            <img className="slide-img" src="/slider/sl4.webp" alt="" />
            </div>
            <div>
            <img className="slide-img" src="/slider/sl5.webp" alt="" />
            </div>
          </Slider>
          
        </div>
        <div className={styles.left}>
            <img src="bannert.webp"/>
        </div>
        </div>
      </div>
    </>
  );
};

export default Banner;