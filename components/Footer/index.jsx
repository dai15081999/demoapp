import styles from "../../styles/Footer.module.css";
import { useState } from "react";
import { sendmail } from "../../http";
import Noty from "noty";


const Footer = () => {
  // const [email, setEmail] = useState("");
  // const [text, setText] = useState("");

  // const sendmailHandle = async (e) => {
  //   e.preventDefault()
  //   if(!email || !text) {
  //     new Noty({
  //       type: "error",
  //       timeout: 1500,
  //       text: "Không được bỏ trống mục nào",
  //       progressBar: true,
  //     }).show();
  //     return
  //   }
  //   try {
  //     const {data} = await sendmail({youremail: email, message: text})
  //     if(data) {
  //       setEmail('')
  //       setText('')
  //       new Noty({
  //         type: "success",
  //         timeout: 1500,
  //         text: "Cảm ơn đã góp ý",
  //         progressBar: true,
  //       }).show();
  //       return
  //     }
  //   } catch (error) {
  //     new Noty({
  //       type: "error",
  //       timeout: 1500,
  //       text: "Có lỗi từ server",
  //       progressBar: true,
  //     }).show();
  //     return
  //   }
  // }

  return (
    <>
       <footer className="footer">
        <ul className="footer__nav">
          <li className="nav__item">
            <h2 className="nav__title">Chứng nhận bởi</h2>
            <ul className="nav__ul cn">
              <li>
                <a href="#"><img className="bct2" src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"/></a>
              </li>
              <li>
                <a href="#"><img className="bct" src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"/></a>
              </li>
            </ul>
          </li>
     <li className="nav__item">
            <h2 className="nav__title">Tài khoản admin</h2>
            <ul className="nav__ul cn">
              <li>
                admin@gmail.com, mk: 12345
              </li>
            </ul>
          </li>
        </ul>
        <div className="legal">
          <p>© 2022</p>
          <div className="legal__links">
            <span><span className="heart">♥</span> Overview</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
