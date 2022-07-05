import styles from "../../styles/Nav.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../redux/authSlice";
import { searchStart } from "../../redux/searchSlice";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { PuffLoader } from "react-spinners";
import axios from "axios";


const Nav = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { productSearch, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [searchValue, setSeachValue] = useState("");
  const [productFromStore, setProductFromStore] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const inputRef = useRef();


  useEffect(() => {
    if (productSearch) {
      setProductFromStore(productSearch);
    }
    if (!searchValue.length) {
      setProductFromStore([]);
    }
  }, [productSearch, searchValue]);

  useEffect(() => {
    if (searchValue.length) {
      dispatch(searchStart(searchValue));
    }
  }, [searchValue]);


  const searchRef = useRef();

  const handleClickOutside = useCallback(
    (e) => {
      if (showBox && e.target.closest(".search") !== searchRef.current) {
        setShowBox(false);
        inputRef.current.value = "";
      }  
    },
    [showBox, setShowBox, searchRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
      axios
      .get(`http://localhost:4000/api/getUser/${userInfo?.user?.id}`, {
      })
      .then((data) => dispatch(loginSuccess(data.data)))
      .catch((err) => console.log(err));
  }, []);

  

  return (
    <>
      <div>
        <ul className={styles.nav}>
          <div className={styles.links}>
            <li>
              <Link href="/">
                <a>Trang chủ</a>
              </Link>
            </li>
            {!userInfo?.user?.isAdmin ? (
              <>
              <li className={styles.cartli}>
                <Link href="/cart">
                  <a>
                    <i
                      style={{ fontSize: "33px" }}
                      className="fa-solid fa-cart-arrow-down"
                    ></i>
                    <span className={styles.carttotal}>{cartItems?.length}</span>
                  </a>
                </Link>
              </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/thongke">
                    <a>Thống kê</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin">
                    <a>Xử lý đơn</a>
                  </Link>
                </li>
              </>
            )}
          </div>
          <div ref={searchRef} className={styles.search}>
            <input
              onKeyPress={() => setShowBox(true)}
              ref={inputRef}
              onChange={(e) => setSeachValue(e.target.value)}
              type="text"
              placeholder="Nhập từ khóa..."
            />
            {showBox && (
              <div className={styles.boxContent}>
                {loading ? (
                  <div className={styles.loadingSearch}>
                    <PuffLoader size={55} color="red" />
                  </div>
                ) : (
                  <div className={styles.searchPro}>
                    {productFromStore &&
                      productFromStore.map((item, i) => (
                        <Link href={`/product/${item._id}`}>
                          <a>
                            <div className={styles.product_box}>
                              <Image
                                src={`${item.image}`}
                                height={40}
                                width={40}
                              />
                              <h4 className={styles.name_product}>
                                {item.name}
                              </h4>
                            </div>
                          </a>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={styles.user}>
            {userInfo && userInfo ? (
              <div className={styles.info}>

                    <Link href={"/profile"}>
                      <a>
                        <span className={styles.username}>
                          <img className={styles.avatar} src={userInfo?.user?.avatar}/>
                          {userInfo?.user?.name}
                        </span>
                      </a>
                    </Link>
            
              </div>
            ) : (
              <div className={styles.buttons}>
                <Link href="/auth/login">
                  <button>Đăng nhập</button>
                </Link>
                <Link href="/auth/register">
                  <button>Đăng ký</button>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Nav;
