const Song = require('../models/song');

module.exports = (app) => {
    app.get('/addSong', (req, res) => {
        res.render('addSong', {
            user: req.user
        });
    });
    app.post('/addSong', isLoggedIn, (req, res) => {
        // get form data
        let title = req.body.title
        let artist = req.user.username
        let album = req.body.album
        let genre = req.body.genre
        let year = req.body.year
        let lyrics = req.body.lyrics
        const newSong = new Song({
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            year: year,
            lyrics: lyrics,
        });
        newSong.save((err) => { if (err) return (err) });
        res.redirect('/');
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