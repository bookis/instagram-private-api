var _ = require('lodash');

function StoryTray(session) {
    this.session = session;
}

module.exports = StoryTray;
var Request = require('../request');
var Media = require('../media');

StoryTray.prototype.get = function () {

    var supported_capabilities = [
        {
            name: 'SUPPORTED_SDK_VERSIONS',
            value: '13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0'
        },
        {
            name: 'FACE_TRACKER_VERSION',
            value: 12
        },
        {
            name: 'segmentation',
            value: 'segmentation_enabled'
        },
        {
            name: 'COMPRESSION',
            value: 'ETC2_COMPRESSION'
        },
        {
            name: 'WORLD_TRACKER',
            value: 'WORLD_TRACKER_ENABLED'
        },
        {
            name: 'gyroscope',
            value: 'gyroscope_enabled'
        }
    ]

    var that_ = this;
    return new Request(this.session)
        .setMethod('POST')
        .setResource('storyTray')
        .setBodyType('form')
        .setData({})
        .setData({
            _uuid: this.session.uuid,
            _csrftoken: this.session.CSRFToken,
            reason: 'pull_to_refresh',
            supported_capabilities_new: JSON.stringify(supported_capabilities)
        })
        .send()
        .then(function (data) {
            var media = _.map(data.tray, function (medium) {
                return new Media(that_.session, medium);
            });
            return media;
        });
};