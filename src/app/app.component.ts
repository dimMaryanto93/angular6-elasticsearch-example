import {Component, OnInit} from '@angular/core';
import {ElasticsearchService} from './service/elasticsearch.service';
import {Product} from './service/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-elasticsearch';

  products: Product[] = [];

  constructor(private _serviceElasticsearch: ElasticsearchService) {
  }

  ngOnInit(): void {
    this._serviceElasticsearch.getClient.ping({
      requestTimeout: Infinity,
      body: 'hello JavaSampleApproach!'
    });

    this._serviceElasticsearch.getClient.search({
      'index': 'products',
      'q': '*'
    }).then(reponse => {
      const hits: any[] = reponse.hits.hits;
      for (let hit of hits) {
        const data = hit._source;
        this.products.push(data);
      }
    });
  }

}
