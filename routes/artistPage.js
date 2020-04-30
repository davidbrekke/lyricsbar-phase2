const Song = require('../models/song');
const User = require('../models/user');
const Fan = require('../models/fan');

module.exports = (app) => {
    app.get('/artists/:username/:selection', (req, res) => {
        console.log('-----------------------------------')
        console.log('-----ARTIST PAGE-----')
        console.log('searching for ' + req.params.username)
        let selection = req.params.selection;
        // FINDING ARTIST
        if (!req.user) {
            User.find({ username: req.params.username }, (err, user) => {
                if (err) return handleError(err);
                console.log('NO USER');
                console.log(req.params.username + ' found \n')
                // IF SONGS
                if (selection === 'songs') {
                    Song.find({ artist: req.params.username }, (err2, songs) => {
                        if (err2) return handleError(err2);
                        res.render('artistPage', {
                            user: req.user,
                            artist: user[0],
                            songs: songs,
                            fanof: '',
                            fans: '',
                            isfan: []
                        });
                    });

                    // IF FANOF
                } else if (selection === 'fanof') {
                    Fan.find({ fan: req.params.username }, (fanerr, fanof) => {
                        if (fanerr) return fanerr;
                        res.render('artistPage', {
                            user: req.user,
                            artist: user[0],
                            songs: '',
                            fanof: fanof,
                            fans: '',
                            isfan: []
                        });
                    });
                    // IF FANS
                } else if (selection === 'fans') {
                    Fan.find({ artist: req.params.username }, (fanerr, fans) => {
                        if (fanerr) return fanerr;
                        res.render('artistPage', {
                            user: req.user,
                            artist: user[0],
                            songs: '',
                            fanof: '',
                            fans: fans,
                            isfan: []
                        });
                    });
                }
            });
        } else if (req.user) {
            if (req.user.username === req.params.username) {
                res.redirect(`/me/${req.user._id}/songs`)
            }
            User.find({ username: req.params.username }, (err, user) => {
                if (err) return handleError(err);
                console.log('USER');
                console.log(req.params.username + ' found \n')
                // IF SONGS
                if (selection === 'songs') {
                    Fan.find({ artist: req.params.username, fan: req.user.username }, (errfan, fan) => {
                        if (errfan) return handleError(errfan);
                        Song.find({ artist: req.params.username }, (err2, songs) => {
                            if (err2) return handleError(err2);
                            res.render('artistPage', {
                                user: req.user,
                                artist: user[0],
                                songs: songs,
                                fanof: '',
                                fans: '',
                                isfan: fan
                            });
                        });
                    });

                    // IF FANOF
                } else if (selection === 'fanof') {
                    Fan.find({ artist: req.params.username, fan: req.user.username }, (errfan, fan) => {
                        if (errfan) return handleError(errfan);
                        Fan.find({ fan: req.params.username }, (fanerr, fanof) => {
                            if (fanerr) return fanerr;
                            res.render('artistPage', {
                                user: req.user,
                                artist: user[0],
                                songs: '',
                                fanof: fanof,
                                fans: '',
                                isfan: fan
                            });
                        });
                    });
                    // IF FANS
                } else if (selection === 'fans') {
                    Fan.find({ artist: req.params.username, fan: req.user.username }, (errfan, fan) => {
                        if (errfan) return handleError(errfan);
                        Fan.find({ artist: req.params.username }, (fanerr, fans) => {
                            if (fanerr) return fanerr;
                            res.render('artistPage', {
                                user: req.user,
                                artist: user[0],
                                songs: '',
                                fanof: '',
                                fans: fans,
                                isfan: fan
                            });
                        });
                    });
                }
            });
        }

    });
}