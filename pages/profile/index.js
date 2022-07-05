import Noty from "noty";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/Profile.module.css";
import { logout } from "../../redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import apiModule from "../../http";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [loadingUpdateAvatar, setLoadingUpdateAvatar] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mailContent, setMailContent] = useState("");
  const [loadingChangePassword, setLoadingChangePassword] = useState(false);
  const [loadingMail, setLoadingMail] = useState(false);

  const dispatch = useDispatch();
  const { updateAvatar, changepassword, sendmail } = apiModule();

  const getImage = useCallback(
    (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result);
      };
    },
    [image]
  );

  const handleLogout = () => {
    try {
      router.replace("/auth/login");
      dispatch(logout());
      new Noty({
        type: "success",
        timeout: 1000,
        text: "Đăng xuất thành công",
        progressBar: false,
      }).show();
      return;
    } catch (error) {
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Có lỗi xảy ra...",
        progressBar: false,
      }).show();
      return;
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.replace("/auth/login");
    }
  }, [userInfo]);

  const handleUpdateAvatar = async () => {
    try {
      if (!image) {
        new Noty({
          type: "error",
          timeout: 1000,
          text: "Vui lòng chọn ảnh bạn muốn đổi",
          progressBar: false,
        }).show();
        return;
      }
      setLoadingUpdateAvatar(true);
      const { data } = await updateAvatar({ image, id: userInfo?.user?.id });
      setLoadingUpdateAvatar(false);
      if (data) {
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Cập nhật ảnh thành công",
          progressBar: false,
        }).show();

        router.reload();
      }
    } catch (error) {
      setLoadingUpdateAvatar(false);
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Lỗi server",
        progressBar: false,
      }).show();
      return;
    }
  };

  const handleChangePassword = async () => {
    try {
      if (!password || !newPassword || !confirmPassword) {
        new Noty({
          type: "warning",
          timeout: 1000,
          text: "Không được bỏ trống mục nào",
          progressBar: false,
        }).show();
        return;
      }
      if (newPassword !== confirmPassword) {
        new Noty({
          type: "warning",
          timeout: 1000,
          text: "Xác nhận mật khẩu không khớp",
          progressBar: false,
        }).show();
        return;
      }
      if (newPassword.length < 3) {
        new Noty({
          type: "warning",
          timeout: 1000,
          text: "Độ dài mật khẩu phải lớn hơn 2 ký tự",
          progressBar: false,
        }).show();
        return;
      }
      setLoadingChangePassword(true);
      const { data } = await changepassword({
        id: userInfo?.user?.id,
        password,
        newpassword: newPassword,
      });
      if (data?.success) {
        setPassword("");
        setConfirmPassword("");
        setNewPassword("");
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Bạn đã đổi mật khẩu thành công",
          progressBar: false,
        }).show();
      }
      setLoadingChangePassword(false);
    } catch (error) {
      setLoadingChangePassword(false);
      new Noty({
        type: "error",
        timeout: 1000,
        text: error.response.data.error.message,
        progressBar: false,
      }).show();
    }
  };

  const handleMail = async () => {
    try {
      if (!mailContent) {
        new Noty({
          type: "warning",
          timeout: 1000,
          text: "Không được bỏ trống nội dung",
          progressBar: false,
        }).show();
        return;
      }
      setLoadingMail(true);
      const { data } = await sendmail({
        youremail: userInfo?.user?.email,
        message: mailContent,
      });

      if (data?.success) {
        setMailContent("");
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Cảm ơn đã góp ý!",
          progressBar: false,
        }).show();
        setLoadingMail(false);
        return;
      }
    } catch (error) {
      setLoadingMail(false);
      new Noty({
        type: "error",
        timeout: 1000,
        text: "Lỗi server",
        progressBar: false,
      }).show();
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Thông tin người dùng</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          <label htmlFor="field2">
            <img src={image ? image : userInfo?.user?.avatar} />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="field2"
            onChange={getImage}
          />
          <button onClick={handleUpdateAvatar}>
            {loadingUpdateAvatar ? "..." : "Thay đổi avatar"}
          </button>
        </div>
        <div className={styles.description_user}>
          <h1>
            Tên đăng nhập: <span>{userInfo?.user?.name}</span>
          </h1>
          <h2>
            Tài khoản email: <span>{userInfo?.user?.email}</span>
          </h2>
          <h5>
            Chức vụ: {userInfo?.user?.isAdmin ? "Quản trị viên" : "Người dùng"}
          </h5>
          {!userInfo?.user?.isAdmin && (
            <Link href="/order">
              <button className={styles.logoutbtn}>
                <a>Đơn hàng đã đặt</a>
              </button>
            </Link>
          )}
          <button className={styles.logoutbtn} onClick={handleLogout}>
            Đăng Xuất
          </button>
        </div>
      </div>
      <div className={styles.onchange}>
        <h4>Thay đổi thông tin</h4>
        <div className={styles.box}>
          <div>
            <span>Thay mật khẩu</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              placeholder="Nhập mật khẩu hiện tại"
            />
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="text"
              placeholder="Mật khẩu mới"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="text"
              placeholder="Xác nhận mật khẩu mới"
            />
            <button onClick={handleChangePassword}>
              {loadingChangePassword ? "Đang đổi" : "Thay đổi"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
