
var sprites = {
    alien_1: {
        id: "alien_1",
        width: 32,
        height: 32,
        tiles: [{ x: 4, y: 4 }, { x: 40, y: 4 }]
    },
    alien_2: {
        id: "alien_2",
        width: 44,
        height: 32,
        tiles: [{ x: 4, y: 40 }, { x: 56, y: 40 }]
    },
    alien_3: {
        id: "alien_3",
        width: 48,
        height: 32,
        tiles: [{ x: 4, y: 76 }, { x: 60, y: 76 }]
    },
    flyingSaucer: {
        id: "flyingSaucer",
        width: 48,
        height: 28,
        tiles: [{ x: 4, y: 128 }]
    },
    cannon: {
        id: "cannon",
        width: 52,
        height: 32,
        tiles: [{ x: 4, y: 160 }, { x: 60, y: 160 }]
    },
    cannonBullet: {
        id: "cannonBullet",
        width: 4,
        height: 28,
        tiles: [{ x: 4, y: 200 }]
    },
    alienBullet: {
        id: "alienBullet",
        width: 12,
        height: 28,
        tiles: [{ x: 12, y: 200 }]
    },
    alienExplosion: {
        id: "alienExplosion",
        width: 52,
        height: 28,
        tiles: [{ x: 32, y: 200 }]
    },
    saucerExplosion: {
        id: "saucerExplosion",
        width: 52,
        height: 28,
        tiles: [{ x: 88, y: 200 }]
    },
    bunkerFull: {
        id: "bunkerFull",
        width: 24,
        height: 24,
        tiles: [{ x: 4, y: 232 }, { x: 32, y: 232 }, { x: 60, y: 232 }, { x: 88, y: 232 }]
    },
    bunkerTopLeft: {
        id: "bunkerTopLeft",
        width: 24,
        height: 24,
        tiles: [{ x: 4, y: 260 }, { x: 32, y: 260 }, { x: 60, y: 260 }, { x: 88, y: 260 }]
    },
    bunkerTopRight: {
        id: "bunkerTopRight",
        width: 24,
        height: 24,
        tiles: [{ x: 4, y: 288 }, { x: 32, y: 288 }, { x: 60, y: 288 }, { x: 88, y: 288 }]
    },
    bunkerBottomLeft: {
        id: "bunkerBottomLeft",
        width: 24,
        height: 24,
        tiles: [{ x: 4, y: 316 }, { x: 32, y: 316 }, { x: 60, y: 316 }, { x: 88, y: 316 }]
    },
    bunkerBottomRight: {
        id: "bunkerBottomRight",
        width: 24,
        height: 24,
        tiles: [{ x: 4, y: 344 }, { x: 32, y: 344 }, { x: 60, y: 344 }, { x: 88, y: 344 }]
    }
};

var sprite = function (e) {
    this.typeOf = "sprite";
    this.sprite = e;
    this.tileId = 0;
    this.x = e.x;
    this.y = e.y;
};

var alien = {

    aliens: null,
    n_aliens: 6,
    speed: 5,

    init: function(){
        this.aliens = [];

        var x_inicial = 100;
        for(var i = 0; i < this.n_aliens; i++){
            var alien = new sprite(sprites.alien_1);
            var espacamento = 20;
            alien.x = x_inicial + (i * (alien.sprite.width + espacamento) );
            alien.y = 10;
            this.aliens.push(alien);
        }
        console.log(this.aliens);

    },

    drawAlien: function (id) {
        var alien = sprites[id];

        ctx.drawImage(
            img,
            alien.tiles[0].x, alien.tiles[0].y,
            alien.width, alien.height,
            300, 300, alien.width, alien.height
        );
    },

    drawAliens: function () {
        for(var i = 0; i < this.n_aliens; i++){
            var alien = this.aliens[i];
            ctx.drawImage(
                img,
                alien.sprite.tiles[0].x, alien.sprite.tiles[0].y,
                alien.sprite.width, alien.sprite.height,
                alien.x, alien.y, alien.sprite.width, alien.sprite.height
            );

            //mover
            alien.x += this.speed;

            if(alien.x > canvas.width - 10 || alien.x < 10)
                this.speed *= -1;

        }

        console.log("canvas w", canvas.width)


    }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// sky background 
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!						
var sky = {
    stars: null,
    starsLayer: 3,
    k_star_number: 30,

    init: function () {
        this.stars = [];
        for (var n = 0; n < this.starsLayer; n++) {
            this.stars.push([]);
            // star params: [0]: x, [1]: y, [2]: random starRadius, [3]: random star transparency, [4]: max star radius, [5]: speed 
            for (var i = 0; i < this.k_star_number; i++) {
                this.stars[n].push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * (n * 2 + 3), Math.random() / 2, (n * 2 + 3), (n * 2 + 3) - 2]);
            }
        }
    },

    //desenha o céu de preto
    draw: function () {
        ctx.fillStyle = 'rgba(0, 0, 0, ' + 1 + ')';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    //desenha estrelas
    drawStars: function (movimentoVertical) {
        var star, x, y, radius, alpha, maxRadius, speed;
        for (var n = 0, nl = this.stars.length; n < nl; n++) {
            for (var i = 0, il = this.stars[n].length; i < il; i++) {
                star = this.stars[n][i];
                x = star[0];
                y = star[1];
                radius = star[2];
                alpha = star[3];
                maxRadius = star[4];
                speed = star[5];

                // draw
                ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fill();

                // recriar estrela aleatoria quando uma estrela sair da tela

                if (!movimentoVertical) {
                    if (x - radius < 0) {
                        star[0] = canvas.width - radius;
                        star[2] = Math.random() * maxRadius;
                        star[1] = Math.random() * canvas.height;
                        star[3] = Math.random() / 2;
                    }
                    // mover
                    else {
                        star[0] -= speed;
                    }
                } else {
                    if (y + radius > canvas.height) {
                        star[0] = Math.random() * canvas.width;
                        star[1] = 0 - radius;
                        star[2] = Math.random() * maxRadius;
                        star[3] = Math.random() / 2;
                    }
                    // mover
                    else {
                        star[1] += speed;
                    }
                }

            }
        }
    }
};

const KEYS = {

    //wasd space
    P1_UP: 119,
    P1_DOWN: 115,
    P1_LEFT: 97,
    P1_RIGHT: 100,
    P1_FIRE: 32,

    //setas
    P2_UP: 53,
    P2_DOWN: 50,
    P2_LEFT: 49,
    P2_RIGHT: 51,
    P2_FIRE: 47//?
}
