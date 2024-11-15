const { register, login } = require('../services/authService');
const { sendResponse, sendError } = require('../utils/responseHelper');

exports.registerUser = async (req, res) => {
   try {
      const { username, password,email } = req.body;
      const user = await register(username, password,email);
      sendResponse(res, { message: 'User registered successfully', user });
   } catch (error) {
      sendError(res, error.message);
   }
};

exports.loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      const data = await login(email, password);
      sendResponse(res, data);
   } catch (error) {
      sendError(res, error.message);
   }
};
