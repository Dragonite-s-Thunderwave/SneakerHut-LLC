function requireUser(req, res, next) {
    try {
        if(!req.user) {
            res.status(401);
            next({
                name: "MissingUserError",
                message: "You must be logged in to perform this action"
            });
        } else {
            next()
        }
    } catch(error) {
        next(error)
    }
}

function requireAdmin(req, res, next) {

    try {
        if(!req.user.isAdmin) {
            res.status(403);
            next({
                error: "MissingAdminError",
                name: "MissingAdminError",
                message: "You must be logged in to perform this action"
            });
        } else {
            next();
        }
    } catch(error) {
        next(error)
    }
}



module.exports = {
    requireUser,
    requireAdmin
}
