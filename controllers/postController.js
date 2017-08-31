var Post = require('../models/post');
var async = require('async');
var moment = require('moment');

exports.post_create_get = function (req, res, next) {
    res.render('post_form', { title: 'Create new post' });
};

exports.post_create_post = function (req, res, next) {
    req.checkBody('post_title', 'Title cannot be empty.').notEmpty();
    req.checkBody('post_content', 'Content cannot be empty.').notEmpty();
    req.checkBody('post_author', 'Invalid Author').optional({ checkFalsy: true });

    req.sanitize('post_title').escape();
    req.sanitize('post_content').escape();
    req.sanitize('post_author').escape();

    req.sanitize('post_content').trim();
    req.sanitize('post_title').trim();
    req.sanitize('post_author').trim();

    var errors = req.validationErrors();

    var post = new Post({
        title: req.body.post_title,
        content: req.body.post_content,
        author: req.body.post_author,
        date: Date.now()
    });

    if (errors) {
        res.render('post_form', { title: 'Create new post', post: post, errors: errors });
        return;
    } else {
        //data valid
        post.save(function (err) {
            if (err) { return next(err); }
            //successful - redirect to post record url.
            res.redirect(post.url);
        })
    }
};

exports.post_detail = function (req, res, next) {
    Post.findById(req.params.id).exec(function (err, post) {
        if (err) { return next(err); }
        //successful, so render
        res.render('post_details', { title: post.title, post: post });
    });
};

exports.post_list = function (req, res, next) {
    var query = Post.find({});
    query.sort('date');
    query.exec(function(error, post_list){
        //successful, so render
        res.render('post_list', { title: 'Post list', post_list: post_list });
    });
};