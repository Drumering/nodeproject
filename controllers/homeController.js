exports.index = (req, res)=>{
    let obj = {
        pageTitle: 'Título de teste'
    }
    res.render('home', obj);
};