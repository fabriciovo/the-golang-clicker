CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY,
    coins INT DEFAULT 0,
    click_force INT DEFAULT 1,
    cps INT DEFAULT 0,
    level INT DEFAULT 1
);
