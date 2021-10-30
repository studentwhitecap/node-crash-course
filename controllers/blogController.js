const Blog = require('../models/blogs');

const blog_index = (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('blogs/index', { title: 'All blogs', blogs: result });
        })
        .catch((err) => { console.log(err); });
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
    const blogObject = new Blog(req.body);

    blogObject.save()
        .then((result) => {
            res.redirect('/');
        })
        .catch((err) => { console.log(err); });
}

const blog_get = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then(data => {
            res.render('blogs/details', { title: 'Single blog', blog: data });
        })
        .catch((error) => { res.status(404).render('404', { title: '404' }); });
}

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.deleteOne(
        { __id: id },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("deleted doc : ", docs);
                res.json({ redirect: '/' }); //cant not use res.redirect becoz request is from ajax
            }
        }
    );
}

const blog_update = (req, res) => {
    Blog.updateOne(
        { __id: '617b0950bf8d9f68866608c2' },
        { title: 'Update title' },
        function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Updated Docs : ", docs);
                res.send(docs);
            }
        });
}

module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_get,
    blog_delete,
    blog_update
}