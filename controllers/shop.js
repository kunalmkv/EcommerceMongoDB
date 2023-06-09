const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err => { console.log(err) });

};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('123 ', prodId);
  Product.findById(prodId).then(product => {
    console.log('345', product);
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' })
  }).catch(err => {
    console.log(err)
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err => { console.log(err) });

};


exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    }
    ).catch(err => console.log(err));
}




exports.postOrder = (req, res, next) => {
  //let fetchedCart;
  req.user.addOrder().then(result => {
    res.redirect('/orders');
  }).catch(err => console.log(err))

}
exports.getOrders = (req, res, next) => {

  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    }).catch(err => console.log(err))

};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};
//const Cart = require('../models/cart');
/*exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    })
  }).catch(err => { console.log(err) });

};*/
/*exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
    res.render('shop/product-detail', { product: product[0], pageTitle: product.title, path: '/products' })
  }).catch(err => {
    console.log(err)
  });
}*/
/*exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId } })
    .then(products => {
      res.render('shop/product-detail', { product: products[0], pageTitle: products[0].title, path: '/products' })
    })
}*/
/*exports.getIndex = (req, res, next) => {
  Product.fetcAll().then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    })
  }).catch(err => { console.log(err) });

};*/
// Cart.getCart(cart => {
//   Product.fetchAll(products => {
//     const cartProducts = [];
//     for (product of products) {
//       const cartProductData = cart.products.find(
//         prod => prod.id === product.id
//       );
//       if (cartProductData) {
//         cartProducts.push({ productData: product, qty: cartProductData.qty });
//       }
//     }
//     res.render('shop/cart', {
//       path: '/cart',
//       pageTitle: 'Your Cart',
//       products: cartProducts
//     });
//   });
// });

/*exports.postCart = (req, res, next) => {

  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}*/