const Song = require('../models/song');

module.exports = (app) => {
    app.get('/deleteSong/:id', isLoggedIn, (req, res) => {
        Song.findByIdAndDelete(req.params.id, (err, response) => {
            if (err) return err;
            res.redirect(`/me/${req.user._id}/songs`)
        })
    });
    app.get('/updateSong/:id', isLoggedIn, (req, res) => {
        Song.findById(req.params.id, (err, song) => {
            if (err) return err;
            res.render('updateSong', {
                song: song,
                user: req.user
            });
        });
    });
    app.post('/updateSong/:id', isLoggedIn, (req, res) => {
        const updatedSong = {
            // get form data
            title: req.body.title,
            album: req.body.album,
            genre: req.body.genre,
            year: req.body.year,
            lyrics: req.body.lyrics,
        }
        Song.findByIdAndUpdate(req.params.id, updatedSong, (err, song) => {
            if (err) return err;
            res.redirect('/songs/' + req.params.id);
        })
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