CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_users_updated_at ON users(updated_at);

CREATE TABLE IF NOT EXISTS watermarks (
    id SERIAL PRIMARY KEY,
    consumer_id VARCHAR(255) UNIQUE NOT NULL,
    last_exported_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

DO $$
BEGIN
    IF (SELECT COUNT(*) FROM users) < 100000 THEN
        INSERT INTO users (name, email, created_at, updated_at, is_deleted)
        SELECT
            'User ' || i,
            'user' || i || '@mail.com',
            NOW() - (random() * interval '30 days'),
            NOW() - (random() * interval '30 days'),
            (random() < 0.01)
        FROM generate_series(1,100000) i;
    END IF;
END $$;