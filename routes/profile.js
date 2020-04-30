const Song = require('../models/song');
const Fan = require('../models/fan');

module.exports = function (app) {
    // this page protected
    app.get('/me/:id/:selection', isLoggedIn, (req, res) => {
        let userID = req.user._id;
        let selection = req.params.selection;
        console.log(selection);
        // IF CLIENT IS PROFILE
        if (userID === req.params.id) {
            // IF SONGS
            if (selection === 'songs') {
                Song.find({ artist: req.user.username }, (err, songs) => {
                    if (err) return (err);
                    console.log
                    res.render('profile', {
                        user: req.user,
                        songs: songs,
                        fans: '',
                        fanof: ''
                    });
                }).catch(e => console.log(e));
                // IF FAN OF
            } else if (selection === 'fanof') {
                Fan.find({ fan: req.user.username }, (fanerr, fanof) => {
                    if (fanerr) return fanerr;
                    res.render('profile', {
                        user: req.user,
                        songs: '',
                        fanof: fanof,
                        fans: ''
                    });
                }).catch(e => console.log(e));
                // IF FANS
            } else if (selection === 'fans') {
                Fan.find({ artist: req.user.username }, (fanerr, fans) => {
                    if (fanerr) return fanerr;
                    res.render('profile', {
                        user: req.user,
                        songs: '',
                        fans: fans,
                        fanof: ''
                    });
                }).catch(e => console.log(e));
            }
            // PROFILE NOT CLIENT
        } else {
            res.redirect('/')
        }

    });
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