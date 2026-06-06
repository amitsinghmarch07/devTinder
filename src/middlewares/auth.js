const adminAuth = (req, res, next) => {
    console.log("Middle ware auth is checking");
    const token = "xyz"
    const isAuthorized = token == "xyz";
    if (isAuthorized)
        next()
    else
        res.status(401).send("unauthorizzed access");
}

module.exports = {
    adminAuth
}