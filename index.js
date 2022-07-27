(async () => {
  const stripe = require("stripe")(
    "sk_test_51LQ333SJMY9odrZ5JpLP1Pvc0f37DP3Y485zPLl36LJUCPuTpUkbKooOs3dEsBXkvfMuMDds29xjX74k9Dxa9sW300bTXv3PDt"
  );
  const PRODUCT_ID = "prod_M8P9ntxYLJw9ZB";

  async function createProduct() {
    let x = await stripe.prices.create({
      currency: "usd",
      unit_amount: 1000,
      product: `${PRODUCT_ID}`,
      recurring: { interval: "month" }, // the product created mustve recurring subscription model created.
    });

    return x;
  }

  async function createpaymentLink(priceid) {
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: `${priceid}`, quantity: 1 }],
      subscription_data: { trial_period_days: 7 },
    });
    return paymentLink;
  }

  let priceobj = await createProduct();
  console.log("price is :", priceobj);
  let linkobj = await createpaymentLink(priceobj.id);
  console.log("link is :", linkobj.url);
})();
