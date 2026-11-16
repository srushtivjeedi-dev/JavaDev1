-- Sample schema used to seed a shadow database

CREATE TABLE orders (
    id            SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    status        VARCHAR(20)  NOT NULL DEFAULT 'NEW',
    created_at    TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE TABLE order_details (
    id           SERIAL PRIMARY KEY,
    order_id     INT           NOT NULL REFERENCES orders(id),
    product_name VARCHAR(100)  NOT NULL,
    quantity     INT           NOT NULL,
    unit_price   NUMERIC(10,2) NOT NULL
);

INSERT INTO orders (customer_name, status)
SELECT 'Customer ' || g,
       CASE WHEN g % 3 = 0 THEN 'SHIPPED' ELSE 'NEW' END
FROM generate_series(1, 200) AS g;

INSERT INTO order_details (order_id, product_name, quantity, unit_price)
SELECT o.id, 'Product ' || (o.id % 10 + 1), (o.id % 5) + 1, 9.99 + (o.id % 10)
FROM orders o;