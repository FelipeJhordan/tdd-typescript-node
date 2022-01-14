import { ConnectionOptions, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopoplogy: true
    } as unknown as ConnectionOptions)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
