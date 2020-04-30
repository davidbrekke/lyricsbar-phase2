module.exports = (app, passport) => {
    app.get('/register', (req, res) => {
        console.log('-----------------------------------')
        console.log('-----REGISTER PAGE-----')
        res.render('registerPage', {
            user: req.user,
            message: ''
        });
    });
    app.post('/register', passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/register'
    }))
}