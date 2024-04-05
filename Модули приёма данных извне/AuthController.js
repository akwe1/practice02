const UserService = require("../services/UserService")
const flash = require('connect-flash');

class AuthController {

    async auth(req, res) {
        if(req.session.auth && req.session.auth.id)  res.redirect('/');
        res.render('auth/login');
    }

    async reg(req, res) {
        if(req.session.auth && req.session.auth.id)  res.redirect('/');
        res.render('auth/reg', {message: req.flash('message')});
    }

    async login(req, res) {
        const user = await UserService.check(req.body.user_name,req.body.password)
        if(user.length===1){
            if (req.session.views) {
                req.session.views++;
                req.session.auth = user[0];
            } else {
                req.session.views = 1;
                req.session.auth = user[0];
            }
            res.redirect('/');
        }else{
            res.redirect('/auth/login');
        }
    }

    async registration(req, res) {
        const check = await UserService.check(req.body.user_name,req.body.password)
        if(check.length===0){
            if(req.body.password.length > 6){
                await UserService.registration(req.body)
                const user = await UserService.check(req.body.user_name,req.body.password)
                if (req.session.views) {
                    req.session.views++;
                    req.session.auth = user[0];
                } else {
                    req.session.views = 1;
                    req.session.auth = user[0];
                }
                res.redirect('/');
            }
            else{
                req.flash('message', 'Пароль слишком короткий');
                res.redirect('/auth/reg');

            }
        } else{
            res.redirect('/auth/login');
        }
    }

    async logout(req,res){
        req.session.views = null
        req.session.auth = {}
        res.redirect('/')
    }

    async lk(req,res){
        const user = await UserService.one(req.params.id)
        res.render('auth/lk',{
            user:user[0]
        })
    }

    async update(req,res){
        req.body.role_id = req.session.auth.role_id
        await UserService.update(req.body,req.params.id);
        const user = await UserService.one(req.params.id)
        req.session.auth =user[0]
        res.redirect('/auth/lk/'+req.params.id)
    }
}

module.exports = new AuthController();