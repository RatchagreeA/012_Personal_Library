/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const Books = require("../models").Books;

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      Books.find({}, (err, data) => {
        if (err) {
          res.json({ err });
          return;
        }
        if (!data) {
          res.json([]);
          return;
        }
        const resJson = data.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length,
          };
        });
        res.json(resJson);
      });
    })

    .post(function (req, res) {
      let title = req.body.title;
      if (!title) {
        res.send("missing required field title");
        return;
      }
      const newBook = new Books({ title: title, comments: [] });
      newBook.save((err, data) => {
        if (err) {
          res.json({ err });
          return;
        }
        res.json({ _id: data._id, title: data.title });
      });
    })

    .delete(function (req, res) {
      Books.deleteMany({}, (err, data) => {
        if (err) {
          res.json({ err });
          return;
        }
        res.send("complete delete successful");
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      let bookid = req.params.id;
      Books.findById(bookid, (err, data) => {
        if (err || !data) {
          res.send("no book exists");
          return;
        }
        const resJson = {
          _id: data._id,
          title: data.title,
          comments: data.comments,
          commentcount: data.comments.length,
        };
        res.json(resJson);
      });
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        res.send("missing required field comment");
        return;
      }
      Books.findById(bookid, (err, book) => {
        if (err || !book) {
          res.send("no book exists");
          return;
        }
        book.comments.push(comment);
        book.save((err, data) => {
          if (err) {
            res.json({ err });
            return;
          }
          const resJson = {
            _id: data._id,
            title: data.title,
            comments: data.comments,
            commentcount: data.comments.length,
          };
          res.json(resJson);
        });
      });
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      Books.findByIdAndRemove(bookid, (err, data) => {
        if (err || !data) {
          res.send("no book exists");
          return;
        }
        res.send("delete successful");
      });
    });
};
