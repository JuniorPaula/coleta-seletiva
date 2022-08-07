import { AddAccountRepository } from '@/data/protocols/account/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/account/load-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/account/update-access-token-repository'
import { AccountModel } from '@/domain/model/account'
import { AddAccountModel } from '@/domain/usecases/account/create-account'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements
AddAccountRepository,
LoadAccountByEmailRepository,
UpdateAccessTokenRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')
    const queryResult = await accountColletion.insertOne(account)
    const accountModel = await accountColletion.findOne({ _id: queryResult.insertedId })
    return MongoHelper.map(accountModel)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountColletion = MongoHelper.getCollection('accounts')
    const account = await accountColletion.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountColletion = MongoHelper.getCollection('accounts')
    await accountColletion.updateOne({
      _id: new ObjectId(id)
    },
    {
      $set: { access_token: token }
    })
  }
}
