import { AddAccount } from './../../../../domain/usecases/add-account'
import { DbAddAccount } from './../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const mongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, mongoRepository, mongoRepository)
}
