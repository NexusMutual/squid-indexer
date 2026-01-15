module.exports = class Data1764863225263 {
  name = 'Data1764863225263';

  async up(db) {
    await db.query(
      `CREATE TABLE "product_type" ("id" character varying NOT NULL, "name" text NOT NULL, "claim_method" numeric NOT NULL, "grace_period" numeric NOT NULL, "assessment_cooldown_period" numeric NOT NULL, "payout_redemption_period" numeric NOT NULL, "metadata" text NOT NULL, CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE TABLE "product" ("id" character varying NOT NULL, "product_type" numeric NOT NULL, "name" text NOT NULL, "min_price" numeric NOT NULL, "cover_assets" numeric NOT NULL, "initial_price_ratio" numeric NOT NULL, "capacity_reduction_ratio" numeric NOT NULL, "is_deprecated" boolean NOT NULL, "use_fixed_price" boolean NOT NULL, "metadata" text, "allowed_pools" integer array NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await db.query(
      `CREATE TABLE "attribute" ("id" character varying NOT NULL, "kind" character varying(12) NOT NULL, "target_id" text NOT NULL, "key" text NOT NULL, "value" text NOT NULL, CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`,
    );
  }

  async down(db) {
    await db.query(`DROP TABLE "product_type"`);
    await db.query(`DROP TABLE "product"`);
    await db.query(`DROP TABLE "attribute"`);
  }
};
