import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { CoinHistoryItem } from '../models/CoinHistoryItem';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent {
  cryptoName?: string;
  historyData?: CoinHistoryItem[];
  chart?: Chart;
  chartData?: any[];
  chartOptions?: any;
  chartLabels?: any[];
  chartColors?: any[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cryptoName = this.route.snapshot.paramMap.get('name') || "";
    this.apiService.getHistory(this.cryptoName).subscribe(priceHistory => {
      this.historyData = priceHistory;
      this.chartLabels = this.historyData.map(item => item.partitionDate);
      this.chartData = [
        { label: "Watchlist", data: this.historyData.map(item => item.watchlist), backgroundColor: 'green' },
        //{ label: "Price(BTC)", data: this.historyData.map(item => item.btcPrice), backgroundColor: 'red' }
      ];
      this.chartOptions = {
        scales: {
          yAxes: [{ ticks: { suggestedMin: 0 } }],
        },
      };
      this.chartColors = [{ backgroundColor: 'rgba(255, 99, 132, 0.2)' }];
      this.createChart();
    });
  }

  createChart() {
    const ctx : any = document.getElementById('chart');
    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: this.chartData!,
      },
      options: this.chartOptions,
    });
  }
}
