import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ ok: false, message: "Token required" });
    }

    token = token.split(" ")[1];

    try{
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        req.email = email;
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({ ok: false, message: "Internal server error" });
    }

}