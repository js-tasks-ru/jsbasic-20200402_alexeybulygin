export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let productId = product.id;

    if ( this.isEmpty() ) {
      this.cartItems.push({"product": product, "count": 1});
    } else {

      let hasProduct = this.cartItems.find(item => item.product.id === productId);
      if ( hasProduct ) {
        hasProduct.count += 1;
      } else {
        this.cartItems.push({"product": product, "count": 1});
      }

    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.getTotalCount();
    this.getTotalPrice();

    for (let i = 0; i < this.cartItems.length; i++) {
      let item = this.cartItems[i];
      if ( item.product.id === productId ) {
        item.count = item.count + amount;
        if ( item.count < 1 ) {
          this.cartItems.splice([i], 1);
        }
      }
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return ( this.cartItems.length > 0 ) ? false : true;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += item.product.price * item.count;
    }

    return totalPrice;
  }

  onProductUpdate() {
    console.log(this.cartItems);
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
