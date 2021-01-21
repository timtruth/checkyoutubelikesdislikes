window.dataResp = "";

function getDataPoint() {
	var toggleButtonRenderers = document.getElementsByClassName("ytd-toggle-button-renderer");
	var thumbsUp = "0";	
	var thumbsDown =  "0";
	var sawTU = false;
	for(var i = 0; i < toggleButtonRenderers.length; i++) {
		if(toggleButtonRenderers[i].id == 'text') {
			if(sawTU) {
				thumbsDown = parseNum(document.getElementsByClassName("ytd-toggle-button-renderer")[i].innerText);
				break;
			} else {
				sawTU = true;
				thumbsUp = parseNum(document.getElementsByClassName("ytd-toggle-button-renderer")[3].innerText);
			}
		}
	}
	var dataLine = (new Date()).toLocaleTimeString() + "\t" + thumbsUp + "\t" + thumbsDown;
	dataResp += dataLine + "\n";
}
function parseNum(numStr) {
	numStr = numStr.trim();
	if(numStr.length == 0) {
		return 0;
	}
	var lastChar = numStr.substring(numStr.length-1);
	var multiplier = 1;
	if(lastChar == "K") {
		multiplier = 1000;
		numStr = numStr.substring(0, numStr.length-1);
	} else if(lastChar == "M") {
		multiplier = 1000000;
		numStr = numStr.substring(0, numStr.length-1);
	}
	var num = parseFloat(numStr);
	if(isNaN(num)) {
		return 0;
	}
	return num * multiplier;
}

window.setInterval(getDataPoint, 60000);
getDataPoint();


//To copy the data:
copy(window.dataResp);