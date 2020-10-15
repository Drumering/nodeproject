const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleware = (req, res, next)=> {
    let info = {name:'Anderson', id:123};
    req.userInfo = info;
    next();
};

exports.index = async (req, res)=>{
    let responseJson = {
        pageTitle: 'HOME',
        posts: [],
        tags: [],
        tag: ''
    };

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag != 'undefined') ? {tags: responseJson.tag}: {};

    const tagsPromisse = Post.getTagsList();
    const postsPromisse = Post.find(postFilter);

    const [tags, posts] = await Promise.all([tagsPromisse, postsPromisse]);

    for (let i in tags) {
        if(tags[i]._id == responseJson.tag){
            tags[i].class = "selected"
        }
    }
    responseJson.tags = tags;
    responseJson.posts = posts;

    res.render('home', responseJson);
};