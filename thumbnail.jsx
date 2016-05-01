import React from 'react';
import ReactDOM from 'react-dom';

var Thumbnail = React.createClass({
    secondsTohhmmss: function(totalSeconds) {
        var hours   = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
        var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

        // round seconds
        seconds = Math.round((seconds * 100) / 100);
    
        var result = minutes + ":" + (seconds  < 10 ? "0" + seconds : seconds);

        return result;
    },
    render: function () {
        var clip = this.props.clip;
        var thumbnailStyle = {
            backgroundImage: 'url(' + clip.image + ')'
        };
        var playtimeStyle = {
            display: 'inline-block'
        }
        var duration = null;
        
        //inherit parent style
        if(typeof this.props.style != 'undefined'){
            $.extend(thumbnailStyle, this.props.style); 
        }

        duration = this.secondsTohhmmss(clip.duration);

        return (
            <div className="espl-thumbnail" style={thumbnailStyle} >
                <div className="espl-thumbnailPlayImage"></div>
                <div className="espl-thumbnailPlayTime" style={playtimeStyle}>{duration}</div>
            </div>
        );
    }
});

export default Thumbnail;