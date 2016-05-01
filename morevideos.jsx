import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoprefixStyleProp from './autoprefix';
import ellipsis from './ellipsis';

import {VideoItemHorizontal, VideoItemVertical} from './videoitem.jsx';

var MoreVideosHorizontal = React.createClass({
    render: function () {
        var config = this.props.config;
        var clips = this.props.clips;
        var style = this.props.style;

        return (
            <div id="more-videos-hor" style={style}>
                <div className="espl-title">{config.copy.item[2].copy}</div>
                {
                    clips.map(function (clip) {
                        return (
                            <VideoItemHorizontal key={clip.id} clip={clip}/>
                        );
                    })
                }
            </div>
        );
    }
});

var MoreVideosVertical = React.createClass({
    render: function () {
        var config = this.props.config;
        var clips = this.props.clips;
        var style = this.props.style;

        return (
            <div id="more-videos-vert" style={style}>
                <div className="espl-title espl-titleVertical">{config.copy.item[2].copy}</div>
                {
                    clips.map(function (clip) {
                        return (
                            <VideoItemVertical key={clip.id} clip={clip}/>
                        );
                    })
                }
            </div>
        );
    }
});

var MoreVideos = React.createClass({
    ellipsis: function(){

        var parentElement = "#" + this.props.config.parentElementId;

        $(parentElement).find('#more-videos-hor .espl-showName').ellipsis({ lines: 1 });

        if($(parentElement).width() <= 480){
            $(parentElement).find('#more-videos-hor .espl-showInfo').ellipsis({ lines: 2 });
        }else{
            $(parentElement).find('#more-videos-hor .espl-showInfo').ellipsis({ lines: 3 });
        }

        $(parentElement).find('#more-videos-vert .espl-showNameVertical').ellipsis({ lines: 1 });
        $(parentElement).find('#more-videos-vert .espl-showInfoVertical').ellipsis({ lines: 2 });

    },
    handleResize: function(e) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.ellipsis, 100);

        var parentElement = "#" + this.props.config.parentElementId;

        if($(parentElement).width() < 400){
            $(parentElement).find('#more-videos-vert .espl-title').css('display','none');
        }else{
            $(parentElement).find('#more-videos-vert .espl-title').css('display','block');
        }
    },
    componentDidMount: function() {
        setTimeout(this.ellipsis, 100);
        window.addEventListener('resize', this.handleResize);

        var parentElement = "#" + this.props.config.parentElementId;

        if($(parentElement).width() < 400){
            $(parentElement).find('#more-videos-vert .espl-title').css('display','none');
        }else{
            $(parentElement).find('#more-videos-vert .espl-title').css('display','block');
        }

        this.timeout = null;
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function () {
        var config = this.props.config;
        var clips = this.props.data;
        var moreVideosStyle = AutoprefixStyleProp({display: 'flex'});
        var parentElement = "#" + config.parentElementId;
        var component = null;

        if(config.moreVideosEnabled == false){
            moreVideosStyle.display = 'none';
        }

        if($(parentElement).width() >= 780){

            component = <MoreVideosHorizontal config={config} clips={clips} style={moreVideosStyle}/>;

        }else if($(parentElement).width() >= 480 && (config.justWatchedEnabled == false || config.expiredMessageEnabled == true)){

            if(($(parentElement).width() <= 600)){
                moreVideosStyle.display = 'none';
            }

            component = <MoreVideosHorizontal config={config} clips={clips} style={moreVideosStyle}/>;

        }else if($(parentElement).width() >= 200){

            if(config.justWatchedEnabled == true){
                moreVideosStyle.width = '45%';
            }

            if(($(parentElement).width() <= 440) && config.justWatchedEnabled == true){
                moreVideosStyle.display = 'none';
            }

            component = <MoreVideosVertical config={config} clips={clips} style={moreVideosStyle}/>;
        }

        return component;
    }
});

export {MoreVideos, MoreVideosHorizontal, MoreVideosVertical};