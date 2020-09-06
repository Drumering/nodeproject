exports.userMiddleware = (req, res, next)=> {
    let info = {name:'Anderson', id:123};
    req.userInfo = info;
    next();
};

exports.index = (req, res)=>{
    let obj = {
        pageTitle: 'Título de teste',
        userInfo: req.userInfo
    };
    res.render('home');
};