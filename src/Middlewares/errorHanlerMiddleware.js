
export const notFound = (req, res, next) => {
  res.status(404).json({ error: 'Not found' });
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Server error' });
};





