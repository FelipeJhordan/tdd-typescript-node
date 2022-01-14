import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getColletion('accounts')
    const result = await accountColletion.insertOne(accountData)
    const { insertedId: id } = result

    const accountById = await accountColletion.findOne({ _id: id })
    const account = MongoHelper.map<AccountModel>(accountById)
    return account
  }
}
