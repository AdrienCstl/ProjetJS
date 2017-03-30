
//Rossero/Castellon
window.addEventListener("load", function() {

  /*get*/
    var elementPlayer = document.getElementById("divPlayer"); //get divPlayer depuis HTML
    var elementInputRSS = document.getElementById("divInputRSS"); //get divInputRSS depuis HTML

  /*create*/
    var sound = document.createElement("audio"); // créer un élément type audio
    sound.id = "player";
    sound.controls = "controls";
    sound.type = "audio/mpeg";

    var buttonLoadRSS = document.createElement("button"); //créer un bouton pour lire le flux
    buttonLoadRSS.innerHTML = "Load RSS";
    buttonLoadRSS.id = "loadP";
    buttonLoadRSS.addEventListener("click", getRSS)

    var inputRSS = document.createElement("input"); //créer un input type text pour entrer le flux rss
    inputRSS.id = "inputRSS";
    inputRSS.type = "text";
    inputRSS.value = "http://feeds.soundcloud.com/users/soundcloud:users:88516325/sounds.rss";

    /*Add to document*/

    elementPlayer.appendChild(sound); //ajouter l'audio dans le div du lecteur
    elementInputRSS.appendChild(inputRSS); // ajouter l'input pour rss dans le div inputRSS
    elementInputRSS.appendChild(buttonLoadRSS);



/*Functions*/

  //Récupérer le rss depuis le INPUT
    function getRSS() {
        var xhr = new XMLHttpRequest(); //créer un objet xmlrequest
        var proxy = "https://crossorigin.me/"; // définition d'un proxy
        var url = proxy.concat(document.getElementById("inputRSS").value); // import du proxy dans l'url sinon on ne peut pas accéder au serveur, AJAX sécurise l'entrée
      //  console.log("URL typed in the text input : " + url); //vérification console
        xhr.open("GET", url, true); // accéder à l'url
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status === 0)) { //conditions de récupération , si l'opération est complète et status = 0 ou 200 (cas de succes 200, et 0 ..?.err.?.) #oppenClassroom
                displayListRSS(xhr);//on appel la fonction d'affichage de la liste des flux
            }
        });
        xhr.send(null);//on envois rien, pas de retour, il faut le préciser
    }

    function displayListRSS(rss) {

        var doc = rss.responseXML; //récupération du flux complet
        var nodes = doc.getElementsByTagName("item"); // assossiation d'un noeud (élément rss) à un item du xml, un item est noeud

        for (var i = 0, c = nodes.length; i < c; i++) { //pour chaque élément du flux
            var tr = document.createElement("tr"); //on cré un ligne
            var title = nodes[i].getElementsByTagName("title")[0].innerHTML; //on défini une variable comprenant le  titre du flux dans le xml
            var descr = nodes[i].getElementsByTagName("description")[0].innerHTML;
            var podcastTable = document.getElementById('playlist-table'); // podcatseTable est le tableau dans le doc

            var tdTitle = document.createElement("td"); //on créer un colone
            tdTitle.innerHTML = title; //on assossie a la colone title le titre de l'item

            var tdDescription = document.createElement("td");
            tdDescription.innerHTML = descr;

            var tdLoad = document.createElement("td");
            var btn = document.createElement("button");
            btn.id = "btn" + i;
            btn.value = nodes[i].getElementsByTagName("enclosure")[0].getAttribute("url"); //on récupere le contenu du noeud <enclosure type="audio/mpeg"...
            btn.innerHTML = "Load";
            btn.addEventListener("click", loadAudioFromRSS);

            /*insertion*/
            podcastTable.appendChild(tr);
            tr.appendChild(tdTitle);
            tr.appendChild(tdDescription);
            tr.appendChild(tdLoad);
            tdLoad.appendChild(btn);
        }
    }

    function loadAudioFromRSS() {
      //  console.log("URL of the mp3 : " + this.value);
        sound.src = this.value; //on ajoute au lecteur le contenue du noeud lié au bonton cliqué this
    }

});
