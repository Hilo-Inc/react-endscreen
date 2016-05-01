import React from 'react';
import ReactDOM from 'react-dom';

var Meta = React.createClass({
    render: function () {
        var clip = this.props.clip;
        var showInfo = clip.meta2 + " " + clip.meta3;

        return (
            <div className="espl-itemMeta">
                <div className="espl-showName">{clip.meta1}</div>
                <div className="espl-showInfo">{showInfo}</div>
            </div>
        );
    }
});

var MetaVertical = React.createClass({
    render: function () {
        var clip = this.props.clip;
        var showInfo = clip.meta2 + " " + clip.meta3;
 
        return (
            <div className="espl-itemMetaVertical espl-vertical-align">
                <div className="espl-showNameVertical">{clip.meta1}</div>
                <div className="espl-showInfoVertical">{showInfo}</div>
            </div>
        );
    }
});

var MetaWatchAgain = React.createClass({
    render: function () {
        var config = this.props.config;
        var clip = this.props.clip;
        var parentElement = "#" + config.parentElementId;

        var showInfo = clip.meta2 + " " + clip.meta3;
        var itemMetaStyle = {};

        if(($(parentElement).width() <= 481) && config.justWatchedEnabled == true){
            itemMetaStyle.width = 'inherit';
        }

        return (
            <div className="espl-itemMeta espl-itemMetaWatchAgain" style={itemMetaStyle}>
                <div>
                    <div className="espl-showName">{clip.meta1}</div>
                    <div className="espl-showInfo">{showInfo}</div>
                </div>
                <div>
                    <div className="espl-btnWatchAgain">
                        {config.copy.item[0].copy}
                        <div className="espl-btnWatchAgainImg"></div>
                    </div>
                </div>
            </div>
        );
    }
});

export {Meta, MetaVertical, MetaWatchAgain};