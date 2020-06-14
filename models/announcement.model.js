const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  "code": {"type": "String"},
  "reportdate": {"type": "String"},
  "title": {"type": "String"},
  "content": {"type": "String"}
});

const Announcement = mongoose.model('Announcement', announcementSchema, 'announcements');

module.exports = Announcement;