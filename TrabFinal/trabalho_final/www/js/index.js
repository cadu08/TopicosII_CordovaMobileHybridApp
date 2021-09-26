document.addEventListener('deviceready', onDeviceReady, false);

var socket;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    conectaServidorSockets('ws://192.168.3.8:10000');


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
}


function conectaServidorSockets (url)
{
    socket = new ReconnectingWebSocket(url);

    socket.onopen = function(evt) {
        console.log('Conectou no servidor');

        //document.getElementById('status').style.visibility='hidden';
        socket.send(JSON.stringify({tipo:'login',dados:{id:'frr',passwd:'sxsss'}}));
    }
    socket.onclose = function(evt) {
        //document.getElementById('status').style.visibility='visible';
            console.log('foi desconectado do servidor'+evt);

    }

    socket.onmessage = function(evt) {
       console.log('recebeu mensagem:', evt);
    }

}