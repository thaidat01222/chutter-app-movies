const fs = require('fs');

exports.homepage = (req, res) => {
    let query = "SELECT * FROM `players` ORDER BY id ASC";
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/home');
        }

        res.render('home.ejs', {
            title: "Welcome to Chutter",
            players: result
        });
    });
};
