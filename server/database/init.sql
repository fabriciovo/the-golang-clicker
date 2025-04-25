CREATE TABLE
    IF NOT EXISTS players (
        id UUID PRIMARY KEY,
        coins INT DEFAULT 0,
        click_force INT DEFAULT 1,
        cps INT DEFAULT 0,
        level INT DEFAULT 1
    );

CREATE TABLE
    IF NOT EXISTS upgrades (
        id UUID PRIMARY KEY,
        name VARCHAR(255) DEFAULT '0',
        textureName VARCHAR(255) DEFAULT '0',
        cost INT DEFAULT 0,
        price INT DEFAULT 0,
        cps INT DEFAULT 0
    );


CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO
    upgrades (id, name, textureName, cost, price, cps)
VALUES
    (
        gen_random_uuid (),
        'Double Click',
        'double_click',
        100,
        150,
        1
    ),
    (
        gen_random_uuid (),
        'Auto Clicker',
        'auto_clicker',
        200,
        300,
        2
    ),
    (
        gen_random_uuid (),
        'Mega Click',
        'mega_click',
        500,
        750,
        3
    ),
    (
        gen_random_uuid (),
        'Coin Magnet',
        'coin_magnet',
        800,
        1200,
        4
    ),
    (
        gen_random_uuid (),
        'Turbo Touch',
        'turbo_touch',
        1500,
        2000,
        5
    ),
    (
        gen_random_uuid (),
        'Golden Click',
        'golden_click',
        3000,
        3500,
        100
    ),
    (
        gen_random_uuid (),
        'Laser Tap',
        'laser_tap',
        4500,
        5000,
        20
    ),
    (
        gen_random_uuid (),
        'Quantum Fingers',
        'quantum_fingers',
        6000,
        7500,
        1
    ),
    (
        gen_random_uuid (),
        'Atomic Touch',
        'atomic_touch',
        8000,
        9500,
        1
    ),
    (
        gen_random_uuid (),
        'Divine Power',
        'divine_power',
        10000,
        12000,
        1
    );

\! echo "HERE YOUR DEBUG MSG!"