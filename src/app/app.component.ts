import {Component, OnInit} from '@angular/core';
import {ElasticsearchService} from './service/elasticsearch.service';
import {Product} from './service/product.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-elasticsearch';
  products: Product[] = [];
  formGroup: FormGroup;

  constructor(
    private _serviceElasticsearch: ElasticsearchService,
    private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      'name': this._formBuilder.control('')
    });
    this.searchCriteria();
  }

  doSearch() {
    const formValue = this.formGroup.value;
    this.searchCriteria(formValue.name);
  }

  searchCriteria(name?: string) {
    let params: string;
    if (name) {
      params = `name:${name}`;
    } else {
      params = '*';
    }

    this._serviceElasticsearch.getClient.search({
      'index': 'products',
      'q': params
    }).then(reponse => {
      this.products = [];
      const hits: any[] = reponse.hits.hits;
      for (let hit of hits) {
        const data = hit._source;
        this.products.push(data);
      }
    });
  }
}
