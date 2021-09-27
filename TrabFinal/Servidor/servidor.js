const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 10000 },function (){
	console.log('rodando');
});

paradas = [
      {'nome': 'UFSC', 'latitude': -28.95188530655119, 'longitude': -49.46611508665374},
      {'nome': 'Combo Atacadista', 'latitude': -28.939884795114352, 'longitude':-49.49705460580793},
      {'nome': 'Terminal rodoviário', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503},
      {'nome': 'Shopping Center', 'latitude': -28.94082635247697, 'longitude': -49.49118542940687},
      {'nome': 'Colégio Murialdo', 'latitude': -28.930536702986643, 'longitude': -49.48139260471865}
]

//Todos os ônibus saem do terminal rodoviário
onibus = [
      {'id': 123,'nome': 'Lagoão', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503},
      {'id': 122,'nome': 'Universitario', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503},
      {'id': 132,'nome': 'Turistando', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503},
      {'id': 133,'nome': 'Volta ao Morro', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503},
      {'id': 213,'nome': 'Rio dos Anjos', 'latitude': -28.93312245086673, 'longitude': -49.48671330587503}
]

wss.on('connection', function connection(ws) {

      console.log('Cliente conectou');

      ws.on('message', function incoming(message) {

            var a = JSON.parse(message);
            switch (a.tipo)
            {
                  case 'localizacao':
                        console.log(a.dados)
                        break;
                  case 'info':
                        console.log('mensagem info recebida: '+a.dados);
                        break;
                  case 'login':
                        console.log('mensagem login recebida: '+a.dados.id +'  '+a.dados.passwd);
                        break;
            }

            ws.send(JSON.stringify({tipo:'paradas',dados:paradas}));

            //Envia a posição dos ônibus a cada 1s
            setInterval(function() {
                  onibus = recalculaPosOnibus(onibus);

                  ws.send(JSON.stringify({tipo:'onibus',dados:onibus}));
            }, 1000);

      });
});

function recalculaPosOnibus(onibus)
{
      for(i = 0; i < 5; i++)
      {
            onibus[i].latitude += naleatorio();
            onibus[i].longitude += naleatorio();      
      }

      return onibus;
}

function naleatorio()
{
      return (Math.random()-Math.random())/300;
}