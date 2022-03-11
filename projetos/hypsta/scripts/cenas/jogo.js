class Jogo {
  constructor() {
    this.indice = 0;
    this.mapa = [
      {
       inimigo: 0,
        velocidade: 20
      }, 
      {
       inimigo: 2,
        velocidade: 30
      },
      {
       inimigo: 0,
        velocidade: 30
      },
      {
       inimigo: 1,
        velocidade: 15
      },
      {
       inimigo: 2,
        velocidade: 30
      },
      {
       inimigo: 0,
        velocidade: 25
      },
      {
       inimigo: 1,
        velocidade: 15
      },
      {
       inimigo: 2,
        velocidade: 40
      },
      {
       inimigo: 1,
        velocidade: 50
      },
      {
       inimigo: 2,
        velocidade: 60
      },
      {
       inimigo: 0,
        velocidade: 50
      },
      {
       inimigo: 1,
        velocidade: 40
      },
      {
       inimigo: 0,
        velocidade: 50
      },
      {
       inimigo: 2,
        velocidade: 60
      },
      {
       inimigo: 0,
        velocidade: 100
      },
      ]
  }
  
  setup() {
    cenario = new Cenario(imagemCenario, velocidadeCenario);
    pontuacao = new Pontuacao();
    
    vida = new Vida(3, 3)
    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 0, 30, 110, 135, 220, 270);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width - 52, 200, 100, 75, 200, 150, 10);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width * 2, 0, 200, 200, 400, 400, 10)

    inimigos.push(inimigo);
    inimigos.push(inimigoGrande);
    inimigos.push(inimigoVoador);

  }

  keyPressed(key) {
    if (key === 'ArrowUp') {
      personagem.pula()
    }
    if (key === 'w') {
      personagem.pula()
    }
    if (key === ' ') {
      personagem.pula()
    }
  }
  
  draw() {
   cenario.exibe();
  cenario.move();
  
  pontuacao.exibe();
  pontuacao.adicionarPonto()
  
  personagem.exibe();
  personagem.aplicaGravidade();
    
  const linhaAtual = this.mapa[this.indice]
  const inimigo = inimigos[linhaAtual.inimigo];
  const inimigoVisivel = inimigo.x < -inimigo.largura;
  inimigo.velocidade = linhaAtual.velocidade;
    
    inimigo.exibe()
    inimigo.move()
  
  if(inimigoVisivel){
    this.indice++;
    inimigo.aparece();
    if (this.indice > this.mapa.length - 1){
     this.indice = 0; 
    }
}
  
    if(personagem.estaColidindo(inimigo)){
      draw('imagens/assets/game-over.png')
      //somDoJogo.stop()
      //noLoop();
      
    }
  }
}