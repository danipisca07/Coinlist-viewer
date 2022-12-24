import { Component } from '@angular/core';
import { CoinData } from '../models/CoinData';
import { CoinList } from '../models/CoinList';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  title = 'coinlist-viewer';
  list?: CoinList = undefined;
  topPerformers?: string[] = undefined;
  constructor (private apiService: ApiService){
    this.loadList()
  }

  loadList() {
    console.log("hey")
    this.apiService.getList().subscribe( (data) => { 
      this.list = data;
      this.topPerformers = this.list.improvements
        .slice().sort((a, b) => b.watchlistImprovePercentage - a.watchlistImprovePercentage)
        .map(x => x.coin)
        .slice(0, 20);
      console.log(data)
    })
  }

  isTopPerformer(coinData: CoinData) {
    return this.topPerformers?.includes(coinData.coin)
  }

}
