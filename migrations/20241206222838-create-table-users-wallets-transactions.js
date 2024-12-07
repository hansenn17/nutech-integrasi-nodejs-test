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
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE wallets (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        amount BIGINT NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
      
      CREATE TABLE transactions (
        invoice_number VARCHAR(255) PRIMARY KEY,
        wallet_id UUID NOT NULL,
        service_code VARCHAR(50) NOT NULL,
        service_name VARCHAR(50) NOT NULL,
        transaction_type VARCHAR(50) NOT NULL,
        description VARCHAR(255),
        total_amount BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_wallet FOREIGN KEY (wallet_id) REFERENCES wallets (id) ON DELETE CASCADE
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
    `,
    callback
  );
};

exports._meta = {
  version: 1,
};
