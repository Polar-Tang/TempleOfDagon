// Middleware to validate IDs
const validateId = (req, res, next) => {
    if (!req.params._id.match(/^[a-f0-9]{24}$|^[a-f0-9]{32}$/)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    next();
  };

export default validateId
  // Apply to routes