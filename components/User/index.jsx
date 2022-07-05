import styles from "../../styles/User.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import Moment from "react-moment";
import apiModule from "../../http";
import Noty from "noty";
import socketInit from '../../websocket'

const User = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [alluser, setAlluser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockloading, setBlockloading] = useState(false);
  const [userOnline, setUserOnline] = useState([]) 
  const [unBloadLoading, setUnBlockLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const socket = useRef(null)
  const {block, unblock, deleteuserbyid} = apiModule()

    useEffect(() => {
      socket.current = socketInit()
    }, [])

    
    useEffect(() => {
      socket.current.on('sendUserOnline', (data) => {
        setUserOnline(data)
      })
    }, [socket, userOnline])
    console.log(userOnline)
  useEffect(() => {
    if (userInfo) {
      (async () => {
        setLoading(true);
        const { data } = await axios.get(
          "https://ttcsnapi.herokuapp.com/api/getalluser"
        );
        if (data) {
          setAlluser(data);
          setLoading(false);
        }
      })()
    }
  }, [userInfo, unBloadLoading, blockloading, deleteLoading]);

  const handleBlock = async (id) => {
    try {
      setBlockloading(true)
      const {data} = await block({id: id})
      if(data?.success) {
        setBlockloading(false)
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Chặn người dùng thành công",
          progressBar: false,
        }).show();
        return
      }
    } catch (error) {
      setBlockloading(false)
      new Noty({
        type: "warning",
        timeout: 1000,
        text: "Lỗi server",
        progressBar: false,
      }).show();
    }
  }
  const handleUnBlock = async (id) => {
    try {
      setUnBlockLoading(true)
      const {data} = await unblock({id: id})
      if(data?.success) {
        setUnBlockLoading(false)
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Mở khóa thành công",
          progressBar: false,
        }).show();
        return
      }
    } catch (error) {
      setUnBlockLoading(false)
      new Noty({
        type: "warning",
        timeout: 1000,
        text: "Lỗi server",
        progressBar: false,
      }).show();
    }
  }

  const handleDelete = async(id) => {
    try {
      setDeleteLoading(true)
      const {data} = await deleteuserbyid({id: id})
      if(data?.success) {
        setDeleteLoading(false)
        new Noty({
          type: "success",
          timeout: 1000,
          text: "Xóa người dùng thành công",
          progressBar: false,
        }).show();
        return
      }
    } catch (error) {
      setDeleteLoading(false)
      new Noty({
        type: "warning",
        timeout: 1000,
        text: "Lỗi server",
        progressBar: false,
      }).show();
    }
  }
  return (
   <>
     {(blockloading || unBloadLoading || deleteLoading) && <div className="loadingRound"><MoonLoader color="blue" size={65}/></div>}
    <div className={styles.user_thongke}>
      {loading ? (
        <div className={styles.loadinguser}>
          <MoonLoader color="red" size={55} />
        </div>
      ) : (
        <>
          <h4 className={styles.title_thongke}>Danh sách người dùng, tổng ({alluser.length})</h4>
            <table class="styled-table">
            <thead>
              <tr>
                <th>Quyền</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Trạng thái</th>
                <th>Thời gian hoạt động</th>
                <th>Khóa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {alluser &&
                alluser.map((user, index) => (        
                    <tr key={index}>
                    <td style={{color: `${user.block ? 'grey' : user.isAdmin && 'green'}`}}>{user.block ? 'Đã bị khóa' : user.isAdmin ? "Admin" : "Người dùng"}</td>
                    <td style={{color: `${user.block ? 'grey' : user.isAdmin && 'green'}`}}>{user.name}</td>
                    <td style={{color: `${user.block ? 'grey' : user.isAdmin && 'green'}`}}>{user.email}</td>
                    <td><span className={userOnline.some(elm => elm.name === user.name) ? styles.status : styles.statuserr}></span></td>
                    <td style={{color: `${user.block ? 'grey' : user.isAdmin && 'green'}`}}>{<Moment locale="vi" fromNow ago date={user.createdAt} />}</td>
                    <td>{user.isAdmin ? <i class="block_pr2 fa-solid fa-ban"></i> : user.block ? <i onClick={() => handleUnBlock(user._id)} className="block_pr fa-solid fa-unlock"></i> : <i onClick={() => handleBlock(user._id)} className="block_pr fa-solid fa-user-lock"></i>}</td>
                    <td>{user.isAdmin ? <i class="block_pr2 fa-solid fa-ban"></i> : <i onClick={() => handleDelete(user._id)} class="block_pr fa-solid fa-trash-can"></i>}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
   </>
  );
};

export default User;
