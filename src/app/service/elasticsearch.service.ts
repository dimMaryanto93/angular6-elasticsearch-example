import {Injectable} from '@angular/core';
import {Client} from 'elasticsearch-browser';
import {environment} from '../../environments/environment';

@Injectable()
export class ElasticsearchService {

  private client: Client;

  constructor() {
  }

  get getClient(): Client {
    return this.client = new Client({
      host: environment.elasticsearchHost,
      log: 'trace'
    });
  }
}
