import {Component, OnInit} from '@angular/core';
import {ElasticsearchService} from './service/elasticsearch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-elasticsearch';

  constructor(private _serviceElasticsearch: ElasticsearchService) {
  }

  ngOnInit(): void {
    this._serviceElasticsearch.getClient.ping({
      requestTimeout: Infinity,
      body: 'hello JavaSampleApproach!'
    });
  }

}
