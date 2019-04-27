var util = require("util");
var _ = require("lodash");
var Resource = require("./resource");
const CONSTANTS = require("./constants");


function Internal() {
    Resource.apply(this, arguments);
}

util.inherits(Internal, Resource);

module.exports = Internal;
var Exceptions = require('./exceptions');
var Request = require("./request");
var LoginExperiments = require('./login-experiments.json');

Internal.readMsisdnHeader = function (session) {
    return new Request(session)
        .setMethod('POST')
        .setResource('readMsisdnHeader')
        .setHeaders({
            'X-DEVICE-ID': session.uuid
        })
        .setData({
            mobile_subno_usage: 'ig_select_app'
        })
        .setBodyType('form')
        .signPayload()
        .send()
}

Internal.qeSync = function (session, preLogin) {
    var req = new Request(session)
        .setMethod('POST')
        .setResource('qeSync')
        .setHeaders({
            'X-DEVICE-ID': session.uuid
        })
        .setBodyType('form')
        .setData({})
        .setData({
            id: session.uuid,
            experiments: LoginExperiments.join(',')
        })

    if(!preLogin) {
        return session.getAccountId()
            .then(function(id) {
                return req.setData({
                    _uuid: session.uuid,
                    _uid: id
                })
                .signPayload()
                .send()
            });
    }

    else {
        return req.signPayload().send();
    }
}

Internal.launcherSync = function (session, preLogin) {
    var req = new Request(session)
        .setMethod('POST')
        .setResource('launcherSync')
        .setHeaders({
            'X-DEVICE-ID': session.uuid
        })
        .setBodyType('form')
        .setData({
            configs: 'ig_android_insights_welcome_dialog_tooltip,ig_android_extra_native_debugging_info,ig_android_insights_top_account_dialog_tooltip,ig_android_explore_startup_prefetch_launcher,ig_android_newsfeed_recyclerview,ig_android_react_native_ota_kill_switch,ig_qe_value_consistency_checker,ig_android_qp_keep_promotion_during_cooldown,ig_launcher_ig_explore_post_chaining_hide_comments_android_v0,ig_android_video_playback,ig_launcher_ig_android_network_stack_queue_undefined_request_qe,ig_camera_android_attributed_effects_endpoint_api_query_config,ig_android_notification_setting_sync,ig_android_dogfooding,ig_launcher_ig_explore_post_chaining_pill_android_v0,ig_android_request_compression_launcher,ig_delink_lasso_accounts,ig_android_stories_send_preloaded_reels_with_reels_tray,ig_android_critical_path_manager,ig_android_shopping_django_product_search,ig_android_qp_surveys_v1,ig_android_feed_attach_report_logs,ig_android_uri_parser_cache_launcher,ig_android_global_scheduler_infra,ig_android_explore_grid_viewpoint,ig_android_global_scheduler_direct,ig_android_upload_heap_on_oom,ig_launcher_ig_android_network_stack_cap_api_request_qe,ig_android_async_view_model_launcher,ig_android_bug_report_screen_record,ig_canvas_ad_pixel,ig_android_bloks_demos,ig_launcher_force_switch_on_dialog,ig_story_insights_entry,ig_android_executor_limit_per_group_config,ig_android_bitmap_strong_ref_cache_layer_launcher,ig_android_cold_start_class_preloading,ig_direct_e2e_send_waterfall_sample_rate_config,ig_android_qp_waterfall_logging,ig_synchronous_account_switch,ig_launcher_ig_android_reactnative_realtime_ota,ig_contact_invites_netego_killswitch,ig_launcher_ig_explore_video_chaining_container_module_android,ig_launcher_ig_explore_remove_topic_channel_tooltip_experiment_android,ig_android_request_cap_tuning_with_bandwidth,ig_android_rageshake_redesign,ig_launcher_explore_navigation_redesign_android,ig_android_betamap_cold_start,ig_android_employee_options,ig_android_direct_gifs_killswitch,ig_android_gps_improvements_launcher,ig_launcher_ig_android_network_stack_cap_video_request_qe,ig_launcher_ig_android_network_request_cap_tuning_qe,ig_android_qp_xshare_to_fb,ig_android_feed_report_ranking_issue,ig_launcher_ig_explore_verified_badge_android,ig_android_bloks_data_release,ig_android_feed_camera_latency'
        })

    if(!preLogin) {
        return session.getAccountId()
            .then(function(id) {
                return req.setData({
                    id: id,
                    _uuid: session.uuid,
                    _uid: id
                })
                .signPayload()
                .send()
            });
    }

    else {
        return req.setData({id: session.uuid}).signPayload().send();
    }
}

Internal.logAttribution = function (session) {
    return new Request(session)
        .setMethod('POST')
        .setResource('logAttribution')
        .setBodyType('form')
        .setData({})
        .setData({
            adid: session.advertising_id
        })
        .signPayload()
        .send()
}

Internal.fetchZeroRatingToken = function (session) {
    return new Request(session)
        .setMethod('GET')
        .setResource('zeroRatingToken', {
            cd_id: session.uuid,
            d_id: session.device.id,
            fr: 'token_expired',
            th: ''
        })
        .setBodyType('form')
        .send()
}

Internal.setContactPointPrefill = function (session) {
    return new Request(session)
        .setMethod('POST')
        .setResource('contactPointPrefill')
        .setBodyType('form')
        .setData({})
        .setData({
            phone_id: session.phone_id,
            usage: 'prefill',
            _csrftoken: session.CSRFToken
        })
        .signPayload()
        .send()
}


Internal.getRankedRecipients = function (session, mode) {
    return new Request(session)
        .setMethod('GET')
        .setResource('getRankedRecipients', {
            mode: mode,
            show_threads: true,
            use_unified_inbox: true 
        })
        .setBodyType('form')
        .send()
}


Internal.getPresences = function (session) {
    return new Request(session)
        .setMethod('GET')
        .setResource('getPresences')
        .setBodyType('form')
        .send()
}

Internal.getRecentActivityInbox = function (session) {
    return new Request(session)
        .setMethod('GET')
        .setResource('getRecentActivityInbox')
        .setBodyType('form')
        .send()
}

Internal.getProfileNotice = function (session) {
    return new Request(session)
        .setMethod('GET')
        .setResource('getProfileNotice')
        .setBodyType('form')
        .send()
}

Internal.getExploreFeed = function (session) {

    var supported_capabilities = [
        {
            name: 'SUPPORTED_SDK_VERSIONS',
            value: '9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0'
        },
        {
            name: 'FACE_TRACKER_VERSION',
            value: 10
        },
        {
            name: 'segmentation',
            value: 'segmentation_enabled'
        },
        {
            name: 'WORLD_TRACKER',
            value: 'WORLD_TRACKER_ENABLED'
        }
    ]


    return new Request(session)
        .setMethod('GET')
        .setResource('exploreFeed', {
            is_prefetch: '',
            session_id: session.session_id,
            supported_capabilities_new: encodeURIComponent(JSON.stringify(supported_capabilities))
        })
        .setBodyType('form')
        .send()
}