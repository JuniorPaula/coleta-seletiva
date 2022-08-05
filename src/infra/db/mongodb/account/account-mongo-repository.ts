import { AddAccountRepository } from '@/data/protocols/account/add-account-repository'
import { AccountModel } from '@/domain/model/account'
import { AddAccountModel } from '@/domain/usecases/account/create-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')
    const queryResult = await accountColletion.insertOne(account)
    const accountModel = await accountColletion.findOne({ _id: queryResult.insertedId })
    return MongoHelper.map(accountModel)
  }
}
