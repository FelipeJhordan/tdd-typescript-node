import { Collection, ConnectionOptions, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url, {
    } as unknown as ConnectionOptions)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getColletion (name: string): Promise<Collection> {
    if (this.client === null) { await this.connect(this.url) }
    return this.client.db().collection(name)
  },

  map: <T>(collection: any): T => {
    const { _id, ...accountWithoutId } = collection

    return Object.assign(
      {},
      accountWithoutId,
      { id: _id.toHexString() }
    )
  },

  mapCollection: (collection: any[]): any[] => {
    return collection.map(c => MongoHelper.map(c))
  },

  getObjectId: (value: string): ObjectId => new ObjectId(value)

}
