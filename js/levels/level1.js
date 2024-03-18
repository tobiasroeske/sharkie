const level1 = new Level(
    [
        new Jellyfish(),
        new Jellyfish(),
        new Jellyfish(),
        new Pufferfish(),
        new Pufferfish(),
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
    ]
)