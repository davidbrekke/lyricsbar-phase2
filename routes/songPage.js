const Song = require('../models/song');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
    app.get('/songs/:id', (req, res) => {
        console.log('-----------------------------------')
        console.log('-----SONG PAGE-----')
        console.log('searching for the song')
        Song.findById(req.params.id, (err, song) => {
            if (err) return (err);
            console.log('song found \n');
            console.log('getting song comments  \n');
            Comment.find({ songID: req.params.id }, (err, comments) => {
                if (err) return err;
                comments.reverse()
                res.render('songPage', {
                    user: req.user,
                    song: song,
                    comments: comments
                });
            });
        });

    });
    app.post('/songs/:id', isLoggedIn, (req, res) => {
        const newComment = new Comment({
            author: req.user.username,
            content: req.body.comment,
            songID: req.params.id
        });
        newComment.save((err) => err);
        res.redirect('/songs/' + req.params.id);
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