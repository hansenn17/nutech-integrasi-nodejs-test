const { v4 } = require("uuid");

let dbm;
let type;
let seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(
    `
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_on TIMESTAMP DEFAULT NOW(),
        updated_on TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE wallets (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        balance BIGINT NOT NULL DEFAULT 0,
        created_on TIMESTAMP DEFAULT NOW(),
        updated_on TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      CREATE TABLE services (
        service_code VARCHAR(50) PRIMARY KEY,
        service_name VARCHAR(50) NOT NULL,
        amount BIGINT NOT NULL,
        description VARCHAR(255)
      );
      
      CREATE TABLE transactions (
        invoice_number VARCHAR(255) PRIMARY KEY,
        wallet_id UUID NOT NULL,
        service_code VARCHAR(50) NOT NULL,
        transaction_type VARCHAR(50) NOT NULL,
        total_amount BIGINT NOT NULL,
        created_on TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES wallets (id) ON DELETE CASCADE,
        CONSTRAINT fk_service FOREIGN KEY (service_code) REFERENCES services (service_code)
      );

      CREATE UNIQUE INDEX idx_users_email ON users (email);
      CREATE INDEX idx_transactions_created_on ON transactions (created_on);

      INSERT INTO services (service_code, service_name, amount, description) VALUES (
        'PLN_PRABAYAR', 'PLN Prabayar', 100000, 'PLN Prabayar'
      ),
      (
        'PLN_PASCABAYAR', 'PLN Pascabayar', 100000, 'PLN Pascabayar'
      ),
      (
        'PULSA', 'Pulsa', 50000, 'Pulsa'
      ),
      (
        'TOPUP', 'Top Up', 0, 'Top Up'
      );
    `,
    callback
  );
};

exports.down = function (db, callback) {
  db.runSql(
    `
      DROP TABLE transactions;
      DROP TABLE wallets;
      DROP TABLE users;
      DROP TABLE services;
    `,
    callback
  );
};

exports._meta = {
  version: 1,
};
