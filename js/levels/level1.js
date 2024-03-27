let level1 = {};
function loadLevel() {
    level1 = new Level(
        [
            new JellyfishLila(400),
            new JellyfishLila(480),
            new JellyfishYellow(700),
            new JellyfishYellow(600),
            new JellyfishLila(800),
            new JellyfishYellow(1100),
            new JellyfishLila(1150),
            new JellyfishYellow(1200),
            new JellyfishYellow(1400),
            new JellyfishYellow(1300),
            new JellyfishYellow(1500),
            new JellyfishYellow(1550),
            new JellyfishYellow(1700),
            new JellyfishYellow(1750),
            new JellyfishYellow(1800),
            new PufferfishGreen(800, 50),
            new PufferfishRed(800, 125),
            new PufferfishOrange(1500, 75),
            new PufferfishGreen(1500, 150),
            new PufferfishGreen(1500, 225),
            new PufferfishRed(1900, 150),
            new PufferfishRed(1900, 225),
            new PufferfishRed(1900, 300),
            new PufferfishGreen(2400, 50),
            new PufferfishRed(2400, 225),
            new PufferfishGreen(2900, 325),
            new PufferfishOrange(2900, 400),
            new Endboss()
        ],
        [
            new Background('img/3. Background/Layers/5. Water/D.png', -1440),
            new Background('img/3. Background/Layers/3.Fondo 1/D.png', -1440),
            new Background('img/3. Background/Layers/2. Floor/D.png', -1440),
            new Background('img/3. Background/Layers/1. Light/COMPLETO.png', -1440),
    
            new Background('img/3. Background/Layers/5. Water/D.png', 0),
            new Background('img/3. Background/Layers/3.Fondo 1/D.png', 0),
            new Background('img/3. Background/Layers/2. Floor/D.png', 0),
            new Background('img/3. Background/Layers/1. Light/COMPLETO.png', 0),
    
            new Background('img/3. Background/Layers/5. Water/D.png', 1440),
            new Background('img/3. Background/Layers/3.Fondo 1/D.png', 1440),
            new Background('img/3. Background/Layers/2. Floor/D.png', 1440),
            new Background('img/3. Background/Layers/1. Light/COMPLETO.png', 1440)
        ],
        [
            new Coin(350),
            new Coin(600),
            new Coin(650),
            new Coin(850),
            new Coin(900),
            new Coin(1100),
            new Coin(1250),
            new Coin(1450),
            new Coin(1500),
            new Coin(1700),
            new Coin(1750),
        ],
        [
            new Poison(300),
            new Poison(400),
            new Poison(600),
            new Poison(725),
            new Poison(850),
            new Poison(1050),
            new Poison(1300),
            new Poison(1350),
            new Poison(1500),
            new Poison(1575),
            new Poison(1650),
            new Poison(1800),
        ]
    )
}

 