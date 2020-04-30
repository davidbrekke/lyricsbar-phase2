const Song = require('../models/song');
const User = require('../models/user');


module.exports = (app) => {
    app.get('/', (req, res) => {
        if (req.query.songSearch) {
            var search = req.query.songSearch;
            Song.find({ $text: { $search: search } }, function (err, docs) {
                if (err) console.log(err);
                User.find((err, users) => {
                    if (err) return handleError(err);
                    docs.reverse();
                    users.reverse()
                    res.render('homePage', {
                        user: req.user,
                        songs: docs,
                        artists: users
                    });

                });
            });



        } else if (req.query.artistSearch) {
            var search = req.query.artistSearch;
            User.find({ $text: { $search: search } }, function (err, docs) {
                if (err) console.log(err);
                Song.find((err, songs) => {
                    if (err) return handleError(err);
                    songs.reverse()
                    docs.reverse()
                    res.render('homePage', {
                        user: req.user,
                        songs: songs,
                        artists: docs
                    });

                });
            });



        } else {
            Song.find((e, songs) => {
                if (e) return handleError(e);
                User.find((err, users) => {
                    if (err) return handleError(err);
                    songs.reverse()
                    users.reverse()
                    res.render('homePage', {
                        user: req.user,
                        songs: songs,
                        artists: users
                    });

                }).limit(25);
            }).limit(25);
        }
    })
}