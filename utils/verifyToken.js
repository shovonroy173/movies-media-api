export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log("LINE AT 7" , token);
    res.send("ok")
  };