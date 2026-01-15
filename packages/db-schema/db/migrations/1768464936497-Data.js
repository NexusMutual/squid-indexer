module.exports = class Data1768464936497 {
  name = 'Data1768464936497';

  async up(db) {
    await db.query(
      `CREATE TABLE "deposit_request" ("id" character varying NOT NULL, "sender" text NOT NULL, "member_id" numeric NOT NULL, "assets" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_0a98eb3dce48bdbd881be8e0dfe" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_263c5a6ae266738f2cbff4f156" ON "deposit_request" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "deposit_canceled" ("id" character varying NOT NULL, "sender" text NOT NULL, "member_id" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_dac87558e42e22fb2df409e1879" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_4eba9206560db7edf00a3ae544" ON "deposit_canceled" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "deposit_fulfilled" ("id" character varying NOT NULL, "member_address" text NOT NULL, "member_id" numeric NOT NULL, "assets" numeric NOT NULL, "shares" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_4bb24a648eb0687b31a045731ed" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_72d38c350d780f9b9dbb2a49eb" ON "deposit_fulfilled" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "redeem_request" ("id" character varying NOT NULL, "sender" text NOT NULL, "member_id" numeric NOT NULL, "shares" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_cfc413a4a56777d07b29de675fa" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_c5589650c78fdd763027180958" ON "redeem_request" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "redeem_request_canceled" ("id" character varying NOT NULL, "sender" text NOT NULL, "member_id" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_7b69439b8bb6c9c7a89ee30a89c" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_037b3a3146ed80ea2c81e4efed" ON "redeem_request_canceled" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "redeem_fulfilled" ("id" character varying NOT NULL, "request_id" numeric NOT NULL, "member_address" text NOT NULL, "member_id" numeric NOT NULL, "assets" numeric NOT NULL, "shares" numeric NOT NULL, "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "block_number" integer NOT NULL, "tx_hash" text NOT NULL, CONSTRAINT "PK_86badde8b7c7658fd6df4068e23" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_05e39729140612b0f265aa23b1" ON "redeem_fulfilled" ("request_id") `,
    );
    await db.query(
      `CREATE INDEX "IDX_1182c8bf747fab90126660a652" ON "redeem_fulfilled" ("member_id") `,
    );
    await db.query(
      `CREATE TABLE "member_locks" ("id" character varying NOT NULL, "member_id" numeric NOT NULL, "lock_id" numeric NOT NULL, "shares" numeric NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "period" numeric NOT NULL, "withdrawn_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bc58c58d92722dfd622bfc44c16" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE INDEX "IDX_f1eca4c03fbed7b4d30ee6d6dd" ON "member_locks" ("member_id") `,
    );
  }

  async down(db) {
    await db.query(`DROP TABLE "deposit_request"`);
    await db.query(`DROP INDEX "public"."IDX_263c5a6ae266738f2cbff4f156"`);
    await db.query(`DROP TABLE "deposit_canceled"`);
    await db.query(`DROP INDEX "public"."IDX_4eba9206560db7edf00a3ae544"`);
    await db.query(`DROP TABLE "deposit_fulfilled"`);
    await db.query(`DROP INDEX "public"."IDX_72d38c350d780f9b9dbb2a49eb"`);
    await db.query(`DROP TABLE "redeem_request"`);
    await db.query(`DROP INDEX "public"."IDX_c5589650c78fdd763027180958"`);
    await db.query(`DROP TABLE "redeem_request_canceled"`);
    await db.query(`DROP INDEX "public"."IDX_037b3a3146ed80ea2c81e4efed"`);
    await db.query(`DROP TABLE "redeem_fulfilled"`);
    await db.query(`DROP INDEX "public"."IDX_05e39729140612b0f265aa23b1"`);
    await db.query(`DROP INDEX "public"."IDX_1182c8bf747fab90126660a652"`);
    await db.query(`DROP TABLE "member_locks"`);
    await db.query(`DROP INDEX "public"."IDX_f1eca4c03fbed7b4d30ee6d6dd"`);
  }
};
