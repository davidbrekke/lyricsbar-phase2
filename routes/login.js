module.exports = (app, passport) => {
    app.get('/login', (req, res) => {
        console.log('-----------------------------------')
        console.log('-----LOGIN PAGE-----')
        res.render('loginPage', {
            user: req.user,
            message: ''
        });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: `/`,
        failureRedirect: '/login'
    }),
        (req, res) => {
            console.log("hello");
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/')
    })
}