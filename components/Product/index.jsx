import styles from "../../styles/Product.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import Noty from "noty";
import { fotmatMoney } from "../../function/utils";
import { useSelector } from "react-redux";
import apiModule from "../../http/index";
import { useRouter } from "next/router";
import { useState } from "react";
const { deleteProductById, updateProduct } = apiModule();

const Products = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();
  const [brand, setBrand] = useState(product.brand);
  const [price, setPrice] = useState(product.price);
  const [desc, setDesc] = useState(product.description);
  const [name, setName] = useState(product.name);
  const [count, setCount] = useState(product.countInStock);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ qty: 1, ...product }));
    new Noty({
      type: "success",
      timeout: 1000,
      text: "Thêm vào giỏ hàng thành công !",
      progressBar: false,
    }).show();
    return;
  };

  const handleDelete = async (id) => {
    try {
      setLoadingDelete(true);
      const { data } = await deleteProductById(id);
      const { success } = data;
      setLoadingDelete(false);
      if (success) {
        new Noty({
          type: "success",
          timeout: 2000,
          text: "Xóa thành công",
          progressBar: false,
        }).show();
        router.reload({ scroll: false });
        return;
      }
    } catch (error) {
      setLoadingDelete(false);
      new Noty({
        type: "error",
        timeout: 2000,
        text: "Lỗi server you",
        progressBar: false,
      }).show();
      return;
    }
  };

  const handleChange = async (id) => {
    const dataUpdate = {
      name: name,
      price: Number(price),
      description: desc,
      brand: brand,
      countInStock: count,
    };
    if (
      !count ||
      !dataUpdate.name ||
      !dataUpdate.price ||
      !dataUpdate.description ||
      !dataUpdate.brand
    ) {
      new Noty({
        type: "error",
        timeout: 2000,
        text: "Không được bỏ trống mục nào",
        progressBar: false,
      }).show();
      return;
    }
    try {
      setLoadingUpdate(true);
      const { data } = await updateProduct({
        data: dataUpdate,
        id,
      });
      new Noty({
        type: "success",
        timeout: 2000,
        text: "Update thành công",
        progressBar: false,
      }).show();
      setLoadingUpdate(false);
      if (data) {
        setName(data.name);
        setPrice(data.price);
        setDesc(data.description);
        setBrand(data.brand);
      }
    } catch (error) {
      setLoadingUpdate(false);
      new Noty({
        type: "error",
        timeout: 2000,
        text: "Có lỗi xảy ra",
        progressBar: false,
      }).show();
    }
  };

  return (
    <>
      <a>
        <div className={styles.product}>
          <img
            className={styles.imgPro}
            src={`${product.image}`}
            alt="product"
          />
          <div className={styles.det}>
            {!userInfo?.user.isAdmin ? (
              <h4 className={styles.name}>{product.name}</h4>
            ) : (
              <div>
                <span className="title_admin">Tên:</span>
                <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              </div>
            )}

            {userInfo?.user.isAdmin ? (
              <div>
                <span className="title_admin">Hãng:</span>
                <input
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                value={brand}
              />
              </div>
            ) : (
              <h4 className={styles.brand}>Hãng: {product.brand}</h4>
            )}
            {!userInfo?.user.isAdmin && (
              <span className="sold_product">Đã bán: {product.sold}</span>
            )}
            {userInfo?.user.isAdmin ? (
             <div>
              <span className="title_admin">Giá:</span>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                value={price}
              />
             </div>
            ) : (
              <h4 className={styles.price}>
                Giá: {fotmatMoney(product.price)}
              </h4>
            )}
            {userInfo?.user.isAdmin && (
             <div>
                <span className="title_admin">Số lượng: </span>
                <input
                onChange={(e) => setCount(e.target.value)}
                type="text"
                value={count}
              />
             </div>
            )}
            {userInfo?.user.isAdmin && (
              <textarea
                onChange={(e) => setDesc(e.target.value)}
                type="text"
                value={desc}
              />
            )}
          </div>
          <div className={styles.options}>
            {!userInfo?.user.isAdmin ? (
              <Link href={`/product/${product._id}`}>
                <a>
                  <button>Xem chi tiết</button>
                </a>
              </Link>
            ) : (
              <a>
                <button onClick={() => handleChange(product._id)}>
                  {loadingUpdate ? "..." : "Sửa"}
                </button>
              </a>
            )}
            {userInfo && userInfo?.user.isAdmin ? (
              <button onClick={() => handleDelete(product._id)}>
                {loadingDelete ? "..." : "Xóa"}
              </button>
            ) : (
              <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            )}
          </div>
        </div>
      </a>
    </>
  );
};

export default Products;
