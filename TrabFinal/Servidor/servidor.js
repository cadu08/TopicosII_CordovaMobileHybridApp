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
            
      });
});