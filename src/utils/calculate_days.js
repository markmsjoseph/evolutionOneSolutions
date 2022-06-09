// used to calculate the time difference of the last purchase in days, if purchased on current day, days since purchase will be 0
const days_since_last_purchase = (product) => {
  const Difference_In_Time = Math.floor(
    (Date.now() - product.purchase_info[0].last_purchase.getTime()) /
      86400000
  );
 return Difference_In_Time;
}

module.exports = days_since_last_purchase