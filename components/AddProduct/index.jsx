
import { useState, useCallback } from "react"
import apiModule from "../../http"
import Noty from "noty";

const AddProduct = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [desc, setDesc] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [count, setCount] = useState('')
  const [loading, setLoading] = useState(false)
  const {createProduct} = apiModule()
  const getImage = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        setImage(reader.result);
    };
  }, [image])
   
  const postProduct = async (e) => {
    e.preventDefault()
    if(!name || !image || !price || !desc || !brand || !count) {
      new Noty({
        type: "error",
        timeout: 2000,
        text: "Không được bỏ trống mục nào",
        progressBar: false,
      }).show();
      return
    }
    try {
      const dataForm = {
        name,
        image,
        price,
        description: desc,
        brand,
        countInStock: parseInt(count)
      }
      setLoading(true)
      const {data} = await createProduct(dataForm)
      const {success} = data
      if(success) {    
        new Noty({
          type: "success",
          timeout: 2000,
          text: "Thêm sản phẩm thành công",
          progressBar: false,
        }).show();
        setLoading(false)
        setBrand('')
        setCount('')
        setDesc('')
        setImage('')
        setName('')
        setPrice('')
      }
    } catch (error) {
      setLoading(false)
      new Noty({
        type: "error",
        timeout: 2000,
        text: "Có lỗi xảy ra",
        progressBar: false,
      }).show();
    }
  }

  return (
    <div className="form_auth addcolor">
        <div className="form-style-3">
          <form onSubmit={postProduct}>
            <fieldset>
              <legend>Thêm sản phẩm</legend>
              <label for="field1">
                <span>
                  Tên sản phẩm<span className="required">*</span>
                </span>
                <input
                  type="text"
                  className="input-field"
                  name="field1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label for="field2">
                <span>
                  Hình ảnh <span className="required">*</span>
                </span>
                <input
                  type="file"
                  className="input-field "
                  name="field2"
                  onChange={getImage}
                />
                <div>
                 {image &&  <img className="image_input" src={image}/>}
                </div>
              </label>
              <label for="field3">
                <span>
                  Chi tiết sản phẩm:<span className="required">*</span>
                </span>
                <input
                  type="text"
                  className="input-field"
                  name="field3"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </label>

              <label for="field3">
                <span>
                 Giá: <span className="required">*</span>
                </span>
                <input
                  type="number"
                  className="input-field"
                  name="field3"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label for="field3">
                <span>
                 Hãng: <span className="required">*</span>
                </span>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="input-field"
                  name="field3"
                />
              </label>
              <label for="field3">
                <span>
                 Số lượng: <span className="required">*</span>
                </span>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="input-field"
                  name="field3"
                />
              </label>
            </fieldset>
            <fieldset>
              <input type="submit" value={loading ? 'Xin chờ...' : 'Thêm' } />
            </fieldset>
          </form>
        </div>
      </div>
  )
}

export default AddProduct