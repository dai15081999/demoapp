import axios from "axios"
const ISSERVER = typeof window === "undefined"

const userInfo = !ISSERVER ?
    localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    null :
    null

const apiModule = () => {

    const api = axios.create({
        baseURL: "https://ttcsnapi.herokuapp.com/api",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userInfo?.accessToken}`
        }
    })


    const updateAvatar = async (data) => await api.post('/updateavatar', data)
    const loginApi = async (data) => await api.post("/login", data)
    const forgotpassword = async (email) => await api.post("/forgot", email)
    const registerApi = async (data) => await api.post("/register", data)
    const getallProducts = async ({page, size}) => await api.get(`/product/getproducts?page=${page}&size=${size}`)
    const getProductById = async (id) => await api.get(`/product/${id}`)
    const createProduct = async (data) => await api.post(`/product`, data)
    const updateProduct = async ({
        data,
        id
    }) => await api.put(`/product/${id}`, data)
    const deleteProductById = async (id) => await api.delete(`/product?idProduct=${id}`)
    const createOrderApi = async (data) => await api.post(`/order`, data)

    const getAllUser = async () => await api.get(`/getalluser`)
    const searchProduct = async (key) => await api.get(`/product?product=${key}`)
    const updateStatusApi = async (data) => await api.put(`/order/${data.orderId}`, {
        status: data.status
    })
    const reviewpost = async (data) => await api.post(`/review/${data.id}`, {
        start: data.start,
        name: data.name,
        review: data.review
    })
    const reviewget = async (id) => await api.get(`/review/${id}`)
    const sendmail = async (data) => await api.post('/sendmail', data)
    const changepassword = async (data) => await api.put('/changepassword', data)
    const block = async (id) => await api.put('/block', id)
    const unblock = async (id) => await api.put('/unblock', id)
    const getall = async () => await api.get('/product/getall')
    const deleteuserbyid = async (id) => await api.put('/deleteuserbyid', id)
    const deleteorder = async (id) => await api.delete(`/order/${id}`)

    return {
        updateAvatar,
        loginApi,
        forgotpassword,
        registerApi,
        getallProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProductById,
        createOrderApi,
        getAllUser,
        searchProduct,
        updateStatusApi,
        reviewpost,
        reviewget,
        sendmail,
        changepassword,
        block,
        unblock,
        getall,
        deleteuserbyid,
        deleteorder
    }
}

export default apiModule