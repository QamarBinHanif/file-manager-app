exports.sendResponse = (res, data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
 };
 
 exports.sendError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ success: false, error });
 };
 