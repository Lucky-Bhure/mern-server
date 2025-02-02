const adminMiddleware = async (req, res, next) => {
    try {
        const userData = req.user;
        
        if(!userData.isAdmin) {
            res.status(403).json({message: "Access denied. User is not an admin."})
        }

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;