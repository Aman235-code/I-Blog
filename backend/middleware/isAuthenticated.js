import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Autorization token is missing or invalid",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
