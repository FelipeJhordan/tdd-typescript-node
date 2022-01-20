import { SaveSurveyResultModel, SaveSurveyResultRepository, SurveyResultModel } from '@/data/usecases/save-survey-result/db-save-survey-results-protocols'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save ({ surveyId, answer, accountId, date }: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const res = await surveyCollection.findOneAndUpdate({
      surveyId: surveyId,
      accountId: accountId
    }, {
      $set: {
        answer: answer,
        date: date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    })
    return res.value && MongoHelper.map(res.value)
  }
}
