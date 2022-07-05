

const Banking = ({code}) => {
  return (
    <div className="banking_box">
        <img src="techcombank.webp"></img>
        <p>Vui lòng chuyển khoản vào: <span>Nguyen Van A, 192031313</span></p>
        <p>Nội dung: <strong>{code}</strong><span className="tip">(mã code được tạo tự động)</span></p>
        <p className="tip2">Sẽ được xử lý trong vòng 1 tiếng nếu nhận được tiền từ khách, không nhận được thì khóa acc!</p>
    </div>
  )
}

export default Banking