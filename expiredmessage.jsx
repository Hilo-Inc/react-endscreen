import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import AutoprefixStyleProp from './autoprefix';
import ellipsis from './ellipsis';

var ExpiredMessage = React.createClass({
    onClick: function() {
        window.open(this.props.config.copy.item[5].copy, "_self");
    },
    componentDidMount: function() {
        //window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
        //window.removeEventListener('resize', this.handleResize);
    },
    render: function () {
        var clip = this.props.data;
        var element = "#" + this.props.config.parentElementId;
        var textCopy = this.props.config.copy.item[3].copy.split('.');

        var expiredMessageStyle = {
            height: '50%'
        };

        $.extend(expiredMessageStyle, AutoprefixStyleProp({display: 'flex'}));

        var itemStyle = {
            backgroundColor: '#000',
            borderStyle: 'none'
        };


        if(this.props.config.expiredMessageEnabled == false){
            expiredMessageStyle.display = 'none';
        }

        if($(element).width() <= 680){
            expiredMessageStyle.width = '100%';
            expiredMessageStyle.height = '100%';

            return (
                <div id="expired-message" style={expiredMessageStyle} onClick={this.onClick}>
                    <div>
                        <div><b>{textCopy[0]}</b></div>
                        <div>{textCopy[1]}</div>
                        <div>
                            <div className="espl-btnVisitNow">
                                {this.props.config.copy.item[4].copy}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div id="expired-message" style={expiredMessageStyle} data-contentid={clip.id} onClick={this.onClick}>
                    <div>
                        <div><b>{textCopy[0]}</b>{textCopy[1]}</div>
                        <div>
                            <div className="espl-btnVisitNow">
                                {this.props.config.copy.item[4].copy}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

    }
});

export default ExpiredMessage;