//By: Paul Bradley 

import appData from './data/data.json';

import EndScreen from './endscreen.jsx';

function getStandardMetadataByType(metadataType, contentInfo) {
    var meta1 = "";
    var meta2 = "";
    var meta3 = "";

    var id = contentInfo.Id;
    var mediaType = contentInfo.Media.Type;
    var contentType = contentInfo.Type;
    var mediaName = contentInfo.Media.Name;
    var contentName = contentInfo.Name;
    var seasonEpisodeText = "";
    var broadcastDateAndTime = "";

    var image = (contentInfo.Images != undefined && contentInfo.Images !=null) ?contentInfo.Images[0].Url : "";
    var duration = contentInfo.duration;
    var autheticatedRequired = false;

    var seasonEpisodeText = '';

    var metadataObj = {};

    if (contentInfo.Season.Number != undefined && contentInfo.Season.Number > 0) {
        seasonEpisodeText = "S" +  contentInfo.Season.Number.toString();
    }

    if (contentInfo.Episode != undefined) {
        if (seasonEpisodeText!="") {
            seasonEpisodeText+= ":";
        }
        seasonEpisodeText = seasonEpisodeText + "E" + contentInfo.Episode.toString();
    }


    if (contentInfo.BroadcastDateTime != undefined || contentInfo.BroadcastDateTime != null) {
        var dt = new Date(contentInfo.BroadcastDateTime);
        var timeStr = "";
        if (!isNaN(dt)) {
            broadcastDateAndTime = _etsapi.Common.convertDateToText(dt,  this._languageCode);
            timeStr = _etsapi.Common.convertTimeToText(dt,  this._languageCode);
            if (broadcastDateAndTime!="") {
                broadcastDateAndTime+=" " + timeStr;
            }

        }

    }

    switch (metadataType) {
        case "sports":
            if (contentType == "game" || contentType == "highlight" || contentType == "news" || contentType == "feature" || contentType == "segment" || contentType == "stream") {
                meta1 = contentName;
            } else {
                 meta1 = mediaType;
                 meta2 = ""; //release date?
            }

            break;
        case "news":
            meta1 = contentName;
            break;
        case "business":
            if (contentType == "episode" || contentType == "segment") {
                meta1 = mediaName;
                meta2 = contentName;
                meta3 = broadcastDateAndTime;
            } else if (contentType == "stream") {
                meta1 = contentName;
            } else {
                meta1 = contentName;
                meta2 = broadcastDateAndTime;
            }
            break;
        case "music":
            var musicMetadataObj = _etsapi.Common.getStandardMetadataForMusic(contentInfo);
            switch (mediaType) {
                case "music":
                    if (contentType == "song") {
                       meta1 =  musicMetadataObj.contentName;
                       meta2 = musicMetadataObj.featuredArtist;
                    } else {
                        meta1 = musicMetadataObj.contentName;              
                    }
                    break;
                case "series":
                    meta1 = musicMetadataObj.mediaName;
                    meta2 = musicMetadataObj.seasonEpisodeText;
                    meta3 = musicMetadataObj.contentName; 
                    break;
                case "special":
                    if (contentType == "events") {
                        meta1 = musicMetadataObj.mediaName;
                        meta2 = musicMetadataObj.contentName;      
                    } else {
                        meta1 = musicMetadataObj.contentName;           
                     }
                    break;
                case "news":
                    meta1 = musicMetadataObj.contentName;          
                    break;
                default:
                    meta1 = musicMetadataObj.mediaName;
                    meta2 = musicMetadataObj.contentName;
                    break;
            } //end mediaType switch
            break;
        default:
			metadataType = "default";
            if (contentType == "extra" || contentType == "specials" || contentType == "segment" || contentType =="promo") {
                meta1 = mediaName;
                meta2 = contentName;
            } else if (contentType == "episode") {
                meta1 = mediaName;
                meta2 = seasonEpisodeText;
                meta3 = contentName;
            } else {
                //defaults
                meta1 = mediaName;
            }

            break;

    }

    metadataObj.metaDataType = metadataType;
    metadataObj.contentType = contentType;
    metadataObj.mediaType = mediaType;
    metadataObj.meta1 = meta1;
    metadataObj.meta2 = meta2;
    metadataObj.meta3 = meta3;
    metadataObj.id = id;
    metadataObj.image = image;
    metadataObj.duration = duration;
    metadataObj.autheticatedRequired = autheticatedRequired;
    
    return metadataObj;

}

var _etsapi = {
        language: "en",
        copyFlash: appData.copyFlash
    },
    metaObj = null,
    morevideos = [],
    justwatched = getStandardMetadataByType("default", appData.justwatched);

var config = {
        parentElementId: 'parentContainer',
		elementId: 'container',
		copy: _etsapi.language == "en" ? _etsapi.copyFlash.copy[0].endscreen : _etsapi.copyFlash.copy[1].endscreen,
		expiredMessageEnabled: false,
		justWatchedEnabled: true,
		moreVideosEnabled: true
	};

if (appData.morevideos.ItemsType == "Content" && (appData.morevideos.Items !=undefined && appData.morevideos.Items!= null))  {
      for (var i =0; i < appData.morevideos.Items.length; i++){
        metaObj =  getStandardMetadataByType("default", appData.morevideos.Items[i]);
        morevideos.push(metaObj);
     }
}

var endScreen = new EndScreen;
endScreen.Init({data: undefined, config: config});
endScreen.setData({data: {justwatched: justwatched, morevideos: morevideos}});

$(document).on("onEndScreenItemClick", function(event, result) {
  console.log(event, result);
});

window.endScreen = endScreen;

