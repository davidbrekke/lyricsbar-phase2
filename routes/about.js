const Song = require('../models/song');
const User = require('../models/user');

module.exports = (app) => {
    app.get('/about', (req, res) => {
        console.log('-----------------------------------')
        console.log('-----ABOUT PAGE-----')
        User.find((err, users) => {
            if (err) return handleError(err);
            Song.find((err2, songs) => {
                if (err2) return handleError(err2);
                res.render('about', {
                    user: req.user,
                    artists: users,
                    songs: songs
                });
            });
        });
    });
}