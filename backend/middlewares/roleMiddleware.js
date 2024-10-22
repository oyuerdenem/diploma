const checkAdminRole = (req, res, next) => {
  console.log("User role:", req.user.role); 

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden: Admins only' });
  }
  next();
};

export default checkAdminRole;
