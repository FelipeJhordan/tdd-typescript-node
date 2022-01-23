import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { AddSurveyRepository } from '@/data/usecases/surveys/add-survey/db-add-survey-protocols'
import { LoadSurveyByIdRepository } from '@/data/usecases/surveys/load-survey-by-id/db-load-survey-by-id-protocols'
import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { ObjectId } from 'mongodb'
import { QueryBuilder } from '../helpers'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async loadAll (accountId: string) {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveysResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async add (surveyData: AddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getColletion('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.getObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
