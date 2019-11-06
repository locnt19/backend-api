/**
 * GET /
 * Customers page.
 */
exports.getCustomers = (req, res) => {
  res.render('customers', {
    title: './controllers/customers.js // getCustomers()'
  });
};