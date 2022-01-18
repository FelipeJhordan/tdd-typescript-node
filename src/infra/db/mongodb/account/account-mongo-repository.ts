import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountColletion = await MongoHelper.getColletion('accounts')
    const result = await accountColletion.insertOne(accountData)
    const { insertedId: id } = result

    const accountById = await accountColletion.findOne({ _id: id })
    const account = MongoHelper.map<AccountModel>(accountById)
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountColletion = await MongoHelper.getColletion('accounts')
    const account = await accountColletion.findOne({ email })

    return account && MongoHelper.map<AccountModel>(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountColletion = await MongoHelper.getColletion('accounts')

    await accountColletion.updateOne({ _id: MongoHelper.getObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }
}
