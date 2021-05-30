import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Image from './Image'

export default class Carrossel extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public image1Id: string

  @column()
  public image2Id: string

  @column()
  public image3Id: string

  @belongsTo(() => Image, { foreignKey: 'image1Id' })
  public image1: BelongsTo<typeof Image>

  @belongsTo(() => Image, { foreignKey: 'image2Id' })
  public image2: BelongsTo<typeof Image>

  @belongsTo(() => Image, { foreignKey: 'image3Id' })
  public image3: BelongsTo<typeof Image>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async addUUID(carrossel: Carrossel) {
    carrossel.id = uuid()
  }
}
