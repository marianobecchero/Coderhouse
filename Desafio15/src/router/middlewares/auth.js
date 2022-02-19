function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }

function isAuth2(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/datos')
  } else {
    next()
  }
}

module.exports = {isAuth, isAuth2}