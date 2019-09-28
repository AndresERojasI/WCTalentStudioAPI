import * as express from 'express';
import passport from '../../../common/auth';

export default express
  .Router()
  .get('/', (req, res) => {
    res.json({
        status: 'session cookie not set'
    });
  })
  .get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
  }))
  .get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
  )
  .get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
  });
