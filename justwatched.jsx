import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoprefixStyleProp from './autoprefix';
import ellipsis from './ellipsis';

import Thumbnail from './thumbnail.jsx';
import {MetaWatchAgain} from './meta.jsx';

var JustWatched = React.createClass({
    onClick: function() {
        var elem = ReactDOM.findDOMNode(this);
        $(elem).trigger( "onEndScreenItemClick", $(elem).data('contentid'));
        console.log('onClick', $(elem));
    },
    ellipsis: function(){

        var parentElement = "#" + this.props.config.parentElementId;

        if($(parentElement).width() < 400){
            $(parentElement).find('#just-watched .espl-title').css('display','none');

            $(parentElement).find('#just-watched .espl-showName').ellipsis({ lines: 2 });
            $(parentElement).find('#just-watched .espl-showInfo').ellipsis({ lines: 3 });

            $(parentElement).find('#just-watched .espl-itemMetaWatchAgain > div:first-child').css('width', '150px');

        }else{
            $(parentElement).find('#just-watched .espl-title').css('display','block');

            $(parentElement).find('#just-watched .espl-showName').ellipsis({ lines: 3 });
            $(parentElement).find('#just-watched .espl-showInfo').ellipsis({ lines: 3 });

            $(parentElement).find('#just-watched .espl-itemMetaWatchAgain > div:first-child').css('width', 'inherit');
        }

    },
    handleResize: function(e) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.ellipsis, 100);
    },
    componentDidMount: function() {
        window.addEventListener('resize', this.handleResize);

        this.ellipsis();

        var parentElement = "#" + this.props.config.parentElementId;

        //remove play button for only just watched
        $(parentElement).find("#just-watched .espl-thumbnailPlayImage").css("display", "none");
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.handleResize);
    },
    render: function () {
        var config = this.props.config;
        var clip = this.props.data;
        var parentElement = "#" + config.parentElementId;

        var justWatchedStyle = AutoprefixStyleProp({display: 'flex'});
        var itemStyle = {
            backgroundColor: '#000',
            borderStyle: 'none'
        };
        var thumbnailStyle = {display: 'block'};

        if(config.justWatchedEnabled == false || config.expiredMessageEnabled == true){
            justWatchedStyle.display = 'none';
        }

        if(config.moreVideosEnabled == false){
            justWatchedStyle.width = '375px';

            if($(parentElement).width() <= 490){
                thumbnailStyle.display = 'none';
            }

        }else{
            if($(parentElement).width() >= 780){
                justWatchedStyle.width = '45%';
            }else{
                justWatchedStyle.width = '40%';
            }

            if($(parentElement).width() <= 580){
                thumbnailStyle.display = 'none';
            }
        }

        if($(parentElement).width() <= 440){
            justWatchedStyle.width = 'inherit';
        }

        return (
            <div id="just-watched" style={justWatchedStyle} data-contentid={clip.id} onClick={this.onClick}>
                <div className="espl-title">{config.copy.item[1].copy}</div>
                <div className="espl-item" style={itemStyle}>
                    <Thumbnail clip={clip} style={thumbnailStyle}/>
                    <MetaWatchAgain config={config} clip={clip}/>
                </div>
            </div>
        );

    }
});

export default JustWatched;