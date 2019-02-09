var util = require("util");
var Resource = require("./resource");


function ActivityNews(session, params) {
    Resource.apply(this, arguments);
}

util.inherits(ActivityNews, Resource);
module.exports = ActivityNews;

var Request = require('./request');

ActivityNews.getActivity = function (session) {
    return new Request(session)
        .setMethod('GET')
        .setResource('activityNews')
        .send()
};
