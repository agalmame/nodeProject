

module.exports = (req, res, next) => {
    if(req.session.isLogedIn){
        next();
    }else {
        res.redirect('/login');
    }

}