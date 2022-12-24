import { Component } from '@angular/core';
import { CoinData } from './models/CoinData';
import { CoinList } from './models/CoinList';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coinlist-viewer';
  list?: CoinList = undefined;
  topPerformers?: string[] = undefined;
  constructor (private apiService: ApiService){

  }

  onList($event: MouseEvent) {
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
