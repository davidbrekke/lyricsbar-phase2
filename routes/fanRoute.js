const User = require('../models/user');
const Fan = require('../models/fan');

module.exports = (app) => {
    app.get('/fan/:artist', isLoggedIn, (req, res) => {
        const newFan = new Fan({
            artist: req.params.artist,
            fan: req.user.username
        });
        newFan.save(e => e);
        res.redirect('/artists/' + req.params.artist + '/songs')
    });
    app.get('/unfan/:id', isLoggedIn, (req, res) => {
        Fan.findByIdAndDelete(req.params.id, (err, response) => {
            if (err) return err;
            console.log(response)
            res.redirect('/artists/' + response.artist + '/songs')
        });

    })

}

// route middleware to make sure
function isLoggedIn(req, res, next) {
    // if user is auth in session
    if (req.isAuthenticated()) {
        return next();
    }
    // if not go home
    res.redirect('/');
}