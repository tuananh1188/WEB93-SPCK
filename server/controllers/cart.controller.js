import CartModel from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const userId = req.user.id;
    const product = req.productData;
    const price = product.price;
    //Tim gio hang cua nguoi dung
    let cart = await CartModel.findOne({ userId });
    //Neu da co gio hang , kiem tra san pham ( cung ID va cung Size da ton tai )
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId && item.size === size,
      );

      //San pham da co trong gio => chi tang so luong (quantity)
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;

        if (cart.items[itemIndex].quantity > product.stock) {
          return res.status(400).send({
            message: `quantity greater than stock ${product.stock}`,
          });
        }
      } else {
        //San pham chua co => Them moi vao mang items
        cart.items.push({ productId, quantity, size, price });
      }
      //Cap nhat lai tong tien
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      );

      cart = await cart.save();
      return res.status(200).send(cart);
    } else {
      const newCart = await CartModel.create({
        userId,
        items: [{ productId, quantity, size, price }],
        totalPrice: quantity * price,
      });
      return res.status(201).send({
        message: "Add cart successfully !",
        newCart,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Lay tu middleware verifyToken
    const cart = await CartModel.findOne({ userId }).populate({
      path: "items.productId",
      model: "products",
      select: "name images price stock isDeleted",
    });
    if (!cart) {
      return res.status(200).send({
        message: "Empty Cart !",
        items: [],
        totalPrice: 0,
      });
    }
    cart.items = cart.items.filter((item) => item.productId !== null);
    res.status(200).send({
      message: "Cart info",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size } = req.params;

    const cart = await CartModel.findOne({ userId });
    if (!cart)
      return res.status(404).send({
        message: "Cart is not found !",
      });
    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size),
    );

    if (cart.items.length === initialLength) {
      return res.status(404).send({
        message: "Product is exist in cart !",
      });
    }
    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    await cart.save();
    res.status(200).send({
      message: "product is deleted from cart !",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [], totalPrice: 0 } },
      { new: true },
    );
    res.status(200).send({
      message: "Cart is empty !",
      cart,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;
    const userId = req.user.id;
    const product = req.productData;

    let cart = await CartModel.findOne({ userId });
    if (!cart)
      return res.status(404).send({
        message: "Cart is not found !",
      });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      );
      await cart.save();
      return res.status(200).send({
        message: "Updated successfully!",
        cart,
      });
    } else {
      return res.status(404).send({
        message: "Product is exist in cart !",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
