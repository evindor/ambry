module.exports = {
    index: function(req, res) {
        if (req.user) return res.redirect('/' + req.user.username);
        res.render('index');
    }
}
