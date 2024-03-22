const level1 = new Level(
    [
        new Jellyfish(100),
        new Jellyfish(150),
        new Jellyfish(400),
        new Jellyfish(600),
        new Jellyfish(800),
        new Jellyfish(1100),
        new Jellyfish(1150),
        new Jellyfish(1400),
        new Jellyfish(1300),
        new Pufferfish(500, 50),
        new Pufferfish(500, 200),
        new Pufferfish(1200, 75),
        new Pufferfish(1200, 300),
        new Pufferfish(1400, 40),
        new Pufferfish(1400, 120),
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
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
    ],
    [
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison(),
        new Poison()
    ]


)