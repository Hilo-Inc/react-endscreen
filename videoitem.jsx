import React from 'react';
import ReactDOM from 'react-dom';

import Thumbnail from './thumbnail.jsx';
import {MetaWatchAgain, MetaVertical, Meta} from './meta.jsx';

var VideoItemHorizontal = React.createClass({
    onClick: function() {
        var elem = ReactDOM.findDOMNode(this);
        $(elem).trigger( "onEndScreenItemClick", $(elem).data('contentid'));
        console.log('onClick', $(elem));
    },
    render: function () {
        var clip = this.props.clip;

        return (
            <div className="espl-item espl-itemHorizontal" data-contentid={clip.id} onClick={this.onClick}>
                <Thumbnail clip={clip}/>
                <Meta clip={clip}/>
            </div>
        );
    }
});

var VideoItemVertical = React.createClass({
    onClick: function() {
        var elem = ReactDOM.findDOMNode(this);
        $(elem).trigger( "onEndScreenItemClick", $(elem).data('contentid'));
        console.log('onClick', $(elem));
    },
    render: function () {
        var clip = this.props.clip;

        return (
            <div className="espl-item espl-itemVertical" data-contentid={clip.id} onClick={this.onClick}>
                <div className="espl-playBtnVertical">
                    <div className="espl-center"></div>
                </div>
                <MetaVertical clip={clip}/>
            </div>
        );
    }
});

export {VideoItemHorizontal, VideoItemVertical};

