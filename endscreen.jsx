//By: Paul Bradley 
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoprefixStyleProp from './autoprefix';
import ellipsis from './ellipsis';

import ExpiredMessage from './expiredmessage.jsx';
import JustWatched from './justwatched.jsx'
import {MoreVideos, MoreVideosHorizontal, MoreVideosVertical} from './morevideos.jsx';

var EndScreen = function(){

    var onExpiredMessageClick = function(){
        config.expiredMessageEnabled ? config.expiredMessageEnabled = false : config.expiredMessageEnabled = true;
        $('.espl-expiredMessageBtn').text(config.expiredMessageEnabled);

        Init({data: data, config: config});
    }

    var onJustWatchedClick = function(){
        config.justWatchedEnabled ? config.justWatchedEnabled = false : config.justWatchedEnabled = true;
        $('.espl-justWatchedBtn').text(config.justWatchedEnabled);

        Init({data: data, config: config});
    }

    var onMoreVideosClick = function(){
        config.moreVideosEnabled ? config.moreVideosEnabled = false : config.moreVideosEnabled = true;
        $('.espl-moreVideosBtn').text(config.moreVideosEnabled);

        Init({data: data, config: config});
    }

    var EndScreen = React.createClass({
        setMaxItems: function() {
            if($(element).width() >= 780 || ($(element).width() >= 480 && config.justWatchedEnabled == false)){
                this.maxItems = $(element).width() / 150;
            }else{
                this.maxItems = Math.floor(((($(element).width() / 1.777) - 103 - $('.espl-title').height() - 10 ) / 67));
            }

            if (this.maxItems < 1) this.maxItems = 1;

            return this.maxItems;
        },
        getInitialState: function() {
            return {maxItems: this.setMaxItems()};
        },
        handleResize: function(e) {
            this.setState({maxItems: this.setMaxItems()});

            var parentElement = "#" + config.parentElementId,
                width,
                height;

            setTimeout(function(){

                width = $(element).width() <= 960 ? $(element).width() : 960;
                height = (width / 1.777) - $(parentElement).find('.alfaHeaderH5').height() - $(parentElement).parent().find('.vjs-control-bar').height() - $(parentElement).parent().find('.vjs-progress-control').height() + 12;

                $(parentElement).find("#endscreen-container").css('height', height);

                if($(parentElement).find('[id^=more-videos]').is(':visible')){
                    $(parentElement).find("#endscreen-container").css('justify-content', 'space-between').css('align-items', 'baseline');
                }else{
                    $(parentElement).find("#endscreen-container").css('justify-content', 'center').css('align-items', 'center');
                }

            }, 500);

            //console.log("more-videos", $(parentElement), $(parentElement).find('[id^=more-videos]').is(':hidden'));
        },
        componentDidMount: function() {

            this.setState({maxItems: this.setMaxItems()});

            window.addEventListener('resize', this.handleResize);
            
            $(document).on('onShowEndScreen', this.handleResize);

        },
        render: function() {
            var justwatched = this.props.data.justwatched,
                morevideos = this.props.data.morevideos;

            if(morevideos){

                morevideos = morevideos.slice(0, this.state.maxItems);

                return (
                    <div id="endscreen-container">
                        <ExpiredMessage config={config} data={justwatched}/>
                        <JustWatched config={config} data={justwatched}/>
                        <MoreVideos config={config} data={morevideos}/>
                    </div>
                );

            }else{

                return (
                    <div id="endscreen-container">
                        <ExpiredMessage config={config} data={justwatched}/>
                        <JustWatched config={config} data={justwatched}/>
                    </div>
                );

            }

        }
    });

    var polyfill = function(){

        if (!String.prototype.includes) {
          String.prototype.includes = function() {'use strict';
            return String.prototype.indexOf.apply(this, arguments) !== -1;
          };
        }

        // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
        if (!Array.prototype.includes) {
          Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {'use strict';
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) {
              return false;
            }
            var n = parseInt(arguments[1]) || 0;
            var k;
            if (n >= 0) {
              k = n;
            } else {
              k = len + n;
              if (k < 0) {k = 0;}
            }
            var currentElement;
            while (k < len) {
              currentElement = O[k];
              if (searchElement === currentElement ||
                 (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
              }
              k++;
            }
            return false;
          };
        }

    };

    var Init = function(params){
        
        polyfill();

        try{
            data = params.data;
            config = params.config;

            if(config.parentElementId && config.elementId){
                element = $("#" + config.parentElementId + " ." + config.elementId)[0];
            }else if(config.elementId){
                element = document.getElementById(config.elementId) || document.getElementsByClassName(config.elementId)[0];
            }
            
            if (config && config.elementId && data){
                render();
            }

        }catch(error){
            console.log(error);
        }
    };

    var setData = function(params){
        data = params.data;

        if (config && config.elementId && data != null){
            render();
        }

        // else if(config.elementId){
        //     if($("." + config.elementId).length != 0) $("." + config.elementId).empty()
        // }
    };

    var render = function(){
        ReactDOM.unmountComponentAtNode(element);

        ReactDOM.render(<EndScreen config={config} data={data}/>, element);
    }

    var element,
        data,
        config,
        publicAPI = {
            Init: Init,
            setData: setData,
            onExpiredMessageClick: onExpiredMessageClick,
            onJustWatchedClick: onJustWatchedClick,
            onMoreVideosClick: onMoreVideosClick
        },
        flexboxKeys = [
          "alignContent",
          "alignItems",
          "alignSelf",
          "flex",
          "flexBasis",
          "flexDirection",
          "flexFlow",
          "flexGrow",
          "flexShrink",
          "flexWrap",
          "justifyContent",
          "order",
          "transform",
          "transformOrigin",
          "transformOriginX",
          "transformOriginY",
          "transformOriginZ",
          "transformStyle",
        ];

    return publicAPI;

};

export default EndScreen;