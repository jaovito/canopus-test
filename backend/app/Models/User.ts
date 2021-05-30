import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Adm from './Adm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(() => Adm)
  public adm: HasOne<typeof Adm>

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(users: User) {
    if (users.$dirty.password) {
      users.password = await Hash.make(users.password)
    }
  }

  @beforeCreate()
  public static async addUUID(user: User) {
    user.id = uuid()
  }
}
