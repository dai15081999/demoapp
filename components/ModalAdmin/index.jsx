import styles from "../../styles/ModalAdmin.module.css";

const ModalAdmin = ({ items, setOpenModal, setItems}) => {
  return (
    <div className={styles.openmodaladmin}>
      <div className={styles.contentmodal}>
        {items &&
          items.map((item, key) => (
            <div key={key} className={styles.items}>
              <img src={`${item.image}`} alt="" />
              <p className={styles.nameti}>{item.name}</p>
              <span className={styles.qty_order}>Số lượng: <p className={styles.price}>{item.qty}</p></span>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          setOpenModal(false)
          setItems([])
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default ModalAdmin;
