import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Carrossels extends BaseSchema {
  protected tableName = 'carrossels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().unique().unsigned().notNullable()
      table.uuid('image1_id').unsigned().references('id').inTable('images').onDelete('CASCADE')
      table.uuid('image2_id').unsigned().references('id').inTable('images').onDelete('CASCADE')
      table.uuid('image3_id').unsigned().references('id').inTable('images').onDelete('CASCADE')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
