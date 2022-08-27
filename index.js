/* Courtesy of guregu's github gist: https://gist.github.com/guregu/e9f9caaed4b264a9214799bf03a06946 */
    
function fixImageMaps(force) {
		var imgs = document.querySelectorAll("img[usemap]");
		[].forEach.call(imgs, function(img) {
			if (!img.naturalHeight) { return; }
			var h = img.height / img.naturalHeight;
			var w = img.width / img.naturalWidth;
			var map = document.getElementsByName(img.useMap.slice(1))[0];
			if (!map) { return; }
			for (var i = 0; i < map.children.length; i++) {
				var area = map.children[i];
				if (!area.coords) { continue; }
				var coords = area.coords;
				if (!area.originalCoords) {
					area.originalCoords = coords;
				} else {
					coords = area.originalCoords;
				}
				var split = coords.split(",")
				var fixed = "";
				split.forEach(function(coord, n) {
					if (n != 0) { fixed += ","; }
					fixed += n % 2 == 0 ? Number(coord) * w : Number(coord) * h;
				})
				area.coords = fixed;
			}
		});
	}

    window.onresize = fixImageMaps;
	window.onload = fixImageMaps;
