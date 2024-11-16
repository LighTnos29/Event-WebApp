function roleCheck(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next()
        } else {
            res.status(403).send("Access denied.")
        }
    }
}

module.exports = roleCheck