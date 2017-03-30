window.addEventListener("load", function() {
    var elementPlayer = document.getElementById("divPlayer");
    var elementInputRSS = document.getElementById("divInputRSS");
    var sound = document.createElement("audio");
    sound.id = "audio-player";
    sound.controls = "controls";
    sound.type = "audio/mpeg";

    var buttonLoadRSS = document.createElement("button");
    buttonLoadRSS.innerHTML = "Load RSS feed";
    buttonLoadRSS.addEventListener("click", getRSS)

    var inputRSS = document.createElement("input");
    inputRSS.id = "inputRSS";
    inputRSS.value = "http://feeds.soundcloud.com/users/soundcloud:users:88516325/sounds.rss" //With that we don't have to enter our url everytime
    elementPlayer.appendChild(sound);
    elementInputRSS.appendChild(inputRSS);
    elementInputRSS.appendChild(buttonLoadRSS);

    function getRSS() { // It could be nice to use a callback function, but it bug when I try to use it whith an event listener
        var xhr = new XMLHttpRequest();
        var proxy = "https://crossorigin.me/"; // We need to use a proxy to fix the CORS problem
        var url = proxy.concat(document.getElementById("inputRSS").value); //We add our proxy just before the RSS url
        console.log("URL typed in the text input : " + url);
        xhr.open("GET", url, true);
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status === 0)) {
                displayListRSS(xhr);
            }
        });
        xhr.send(null);
    }

    function displayListRSS(rss) {
        var doc = rss.responseXML;

        var nodes = doc.getElementsByTagName("item");

        for (var i = 0, c = nodes.length; i < c; i++) {
            var tr = document.createElement("tr");
            var title = nodes[i].getElementsByTagName("title")[0].innerHTML;
            var descr = nodes[i].getElementsByTagName("description")[0].innerHTML;
            var podcastTable = document.getElementById('playlist-table');
            var tdTitle = document.createElement("td");
            tdTitle.innerHTML = title;
            var tdDescription = document.createElement("td");
            tdDescription.innerHTML = descr;

            var tdLoad = document.createElement("td");
            var btn = document.createElement("button");
            btn.id = "btn" + i;
            btn.value = nodes[i].getElementsByTagName("enclosure")[0].getAttribute("url");
            btn.innerHTML = "Load";
            btn.addEventListener("click", loadAudioFromRSS);

            podcastTable.appendChild(tr);
            tr.appendChild(tdTitle);
            tr.appendChild(tdDescription);
            tr.appendChild(tdLoad);
            tdLoad.appendChild(btn);
        }
    }

    function loadAudioFromRSS() {
        console.log("URL of the mp3 : " + this.value);
        sound.src = this.value;
    }

});
