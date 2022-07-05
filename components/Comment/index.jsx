import styles from "../../styles/Comment.module.css";
import { useEffect, useState } from "react";
import apiModule from "../../http";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import Noty from "noty";
import Moment from 'react-moment';
import { useRef } from "react";
const { reviewget, reviewpost } = apiModule()

const Comment = ({ id }) => {
  
  const { userInfo } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(null);
  const [dataReview, setDataReview] = useState([]);
  const [textArea, setTextArea] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      (async function () {
        const { data } = await reviewget(id);
        if (data) {
          setDataReview(data);
        }
      })();
    }
  }, [id]);

  const postReview = async (event) => {
    (async function () {
      event.preventDefault();
      try {
        if (!userInfo?.user.name) {
          new Noty({
            type: "error",
            timeout: 2000,
            text: "Vui lòng đăng nhập !",
            progressBar: false,
          }).show();
          return;
        }
        if (!rating || !textArea) {
          new Noty({
            type: "error",
            timeout: 2000,
            text: "Không được bỏ trống !",
            progressBar: false,
          }).show();
          return;
        }
        setLoading(true)
        const { data } = await reviewpost({
          id: id,
          name: userInfo?.user.name,
          start: rating,
          review: textArea,
        });
        setLoading(false)
        if (data) {
          setTextArea('')
          setDataReview([...dataReview, data]);
          new Noty({
            type: "success",
            timeout: 2000,
            text: "Cảm ơn bạn đã đánh giá !",
            progressBar: false,
          }).show();
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    })();
   
  }
  
  let startobj = {
    oneStart: 0,
    twoStart: 0,
    threeStart: 0,
    fourStart: 0,
    fiveStart: 0
  }

  dataReview?.forEach((review, index) => {
    switch(review.start) {
      case 1: 
      startobj['oneStart']++
      break
      case 2: 
      startobj['twoStart']++
      break
      case 3: 
      startobj['threeStart']++
      break
      case 4: 
      startobj['fourStart']++
      break
      case 5: 
      startobj['fiveStart']++
      break
      default:
        break
    }
  })

  function sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseInt( obj[el] );
      }
    }
    return sum;
  }
      

  return (
    <div className={styles.comment}>
      <h3 className={styles.title_comment}>Đánh giá: </h3>
      <div className={styles.startReview}>
          <div className={styles.cols}>
            {Object.keys(startobj).map((key, index) => {
             return <div key={index} className={styles.col}>{index+1}<FaStar className={styles.star} color="#ffc107" size={12}/><span><div style={{width: `${startobj[key]/sum(startobj)*100}%`}}></div></span><p>{startobj[key]} đánh giá</p></div>
            })} 
          </div>
      </div>
      <div className={styles.head_comment}>
        <div className={styles.start}>
          <h3>Bạn chấm sản phẩm này bao nhiêu sao?</h3>
          <div>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onChange={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className={styles.star}
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    size={32}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <div className={styles.post_box}>
          <form onSubmit={postReview}>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              placeholder="Bạn có khuyên người khác mua sản phẩm này không? Tại sao?"
            ></textarea>
            <button>{loading ? 'Xin chờ' : 'Gửi đánh giá'}</button>
          </form>
        </div>
      </div>
      <div className={styles.comment_content}>
        {dataReview.length > 0 &&
          dataReview.map((review, index) => (
            <div key={index} className={styles.comment_user}>
              <h4>{review.name.slice(0, 7)}</h4>
              <div className={styles.start_comuser}>
                <div>
                  {[...Array(review.start)].map((_, i) => {
                    return (
                      <FaStar
                       key={i}
                        className={styles.star}
                        color="#ffc107"
                        size={12}
                      />
                    );
                  })}
                </div>
                <div className={styles.date}>
                  {<Moment locale="vi" fromNow ago date={review.createdAt}/>} trước
                </div>
              </div>
              <div>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comment;
