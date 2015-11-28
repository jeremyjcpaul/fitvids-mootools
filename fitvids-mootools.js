var Fitvids = new Class({

	Implements: Options,
	
	options: {
	    customSelector: null,
	    ignore: null
	},

	initialize: function() {
		var selectors = [
			'iframe[src*="player.vimeo.com"]',
			'iframe[src*="youtube.com"]',
			'iframe[src*="youtube-nocookie.com"]',
			'iframe[src*="kickstarter.com"][src*="video.html"]',
			'object',
			'embed'
		];

		if (this.options.customSelector) {
			selectors.push(this.options.customSelector);
		}

		var ignoreList = '.fitvidsignore';
		if (this.options.ignore) {
			ignoreList = ignoreList + ', ' + this.options.ignore;
		}

		$$(selectors.join(',')).each(function(video){
			var ignoreVideo = false;

			if(video.getParents(ignoreList).length > 0) {
				ignoreVideo = true; // Disable FitVids on this video.
			}

			if (video.tagName.toLowerCase() === 'embed' && video.getParent('object') != null || video.getParent('.fluid-width-video-wrapper') != null) {
				ignoreVideo = true;
			}

			if (!ignoreVideo) {
				if ((!video.getStyle('height') && !video.getStyle('width')) && (isNaN(video.get('height')) || isNaN(video.get('width')))) {
					video.set('height', 9);
					video.set('width', 16);
				}

				var height = parseInt(video.get('height'), 10);
				var width = parseInt(video.get('width'), 10);
				var aspectRatio = height / width;

				if (!video.get('id')) {
					var videoID = 'fitvid' + Math.floor(Math.random()*999999);
					video.get('id', videoID);
				}

				var wrapper = new Element('div.fluid-width-video-wrapper').wraps(video);
				wrapper.setStyles({
					'padding': 0,
					'padding-top': (aspectRatio * 100)+'%',
					'position': 'relative',
					'width': '100%'
				});
				video.removeProperty('height').removeProperty('width');

				$$('.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed').setStyles({
					'position': 'absolute',
					'top': 0,
					'left': 0,
					'width': '100%',
					'height': '100%'
				});
			}
		});
	}
});
