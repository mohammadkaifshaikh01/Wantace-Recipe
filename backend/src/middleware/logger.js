const logger = (req, res, next) => {
   const timestamp = new Date().toISOString();
   console.log(`[${timestamp}] ${req.method} ${req.url}`);
   next(); 
 };
 
 export default logger
 