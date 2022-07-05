export function fotmatMoney(mn) {
  return mn.toLocaleString("vi", {
    style: "currency",
    currency: "VND"
  });
}

export const calculateTotal = (cartItems) => cartItems.reduce((ack, item) => ack + item.qty * item.price, 0);

export const makeid = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}
