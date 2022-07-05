import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Warehouse.module.css";
import apiModule from "../../http/index";
import { fotmatMoney } from "../../function/utils";
import ScaleLoader from "react-spinners/ScaleLoader";

const Warehouse = () => {
  const { getall } = apiModule();
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async() => {
      setLoading(true)
      const {data} = await getall()
      setAllProduct(data.sort((a, b) => b.sold - a.sold))
      setLoading(false)
    })()
  }, [])

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>Kho hàng, tổng ({allProduct?.length})</h3>
      <div className={styles.nav}>
        <ul>
          <li>Hình</li>
          <li>Tên sản phẩm</li>
          <li>Đã bán</li>
          <li>Còn</li>
          <li>Doanh thu sản phẩm</li>
        </ul>
      </div>
      {loading ? (
        <div class="loading-box">
          <ScaleLoader size={300} color="#cd1818" />
        </div>
      ) : (
          <div id="scrollableDiv" className={styles.boxproduct}>
            {allProduct &&
              allProduct.map((product, index) => (
                <div key={index} className={styles.productBox}>
                  <div>
                    <img src={product.image} />
                  </div>
                  <div>
                    <span>{product.name}</span>
                  </div>
                  <div>
                    <span>{product.sold}</span>
                  </div>
                  <div>
                    <span>{product.countInStock}</span>
                  </div>
                  <div>
                    <span>{fotmatMoney(product.sold * product.price)}</span>
                  </div>
                </div>
              ))}
          </div>
      )}
    </div>
  );
};

export default Warehouse;
