document.addEventListener('deviceready', onDeviceReady, false);

var socket;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!


    /*navigator.geolocation.getCurrentPosition(function(x){
        try {
            socket.send(JSON.stringify({tipo:'localizacao',dados:x}));

        }
        catch(e)
        {

        }

    }, null );*/

    /*navigator.geolocation.watchPosition(function(x){
        try {
            console.log(x.coords.latitude+'  ssss'+x.coords.longitude);
            var d = {lat:x.coords.latitude,long:x.coords.longitude};

            socket.send(JSON.stringify({tipo:'localizacao',dados:d}));

        }
        catch(e)
        {
        }
    }, null,{ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true } );*/


    /*document.getElementById("teste").addEventListener('click',function(){

        socket.send(JSON.stringify({tipo:'info',dados:'teste de envio quando o botao é apertado'}));
        
    },false);*/

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    var mymap = L.map('mapid').setView([-28.9356, -49.4864], 14);
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FkdTA4IiwiYSI6ImNrdTBoOHR0aTBydTkzMXBtcGhsdnVoaG8ifQ.L7KrdCXevoTgbjNo2-zJug', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiY2FkdTA4IiwiYSI6ImNrdTBoOHR0aTBydTkzMXBtcGhsdnVoaG8ifQ.L7KrdCXevoTgbjNo2-zJug'
    }).addTo(mymap);

    conectaServidorSockets('ws://192.168.3.8:10000', mymap);
}


function conectaServidorSockets (url, mymap)
{
    socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        console.log('Conectou no servidor');
        socket.send(JSON.stringify({tipo:'login',dados:{id:'frr',passwd:'sxsss'}}));
    }
    socket.onclose = function(evt) {
        console.log('foi desconectado do servidor'+evt);
    }

    socket.onmessage = function incoming(evt) {
        var a = JSON.parse(evt.data);

        switch (a.tipo)
        {
            case 'paradas':
                var paradas = a.dados;
                mostraParadas(paradas, mymap);
                break;
        }
    }
}

function mostraParadas (paradas, mymap)
{
    var busStopIcon = L.icon({
        iconUrl: '../img/busStopIcon.png',
        
        iconSize:     [38, 50], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    for(i = 0; i < 5; i++)
    {
        L.marker([paradas[i].latitude, paradas[i].longitude], {icon: busStopIcon}).addTo(mymap).bindPopup(paradas[i].nome);;
    }
}