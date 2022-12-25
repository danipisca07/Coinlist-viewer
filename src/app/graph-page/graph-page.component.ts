import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartDataset } from 'chart.js';
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

  priceColor = 'rgb(66, 245, 84)';
  watchlistColor = 'rgb(245, 72, 66)';
  rankColor = 'rgb(38, 0, 255)';

  tickFormat = new Intl.NumberFormat('en-US', {
    useGrouping: false, maximumFractionDigits: 8
  });

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cryptoName = this.route.snapshot.paramMap.get('name') || "";
    this.apiService.getHistory(this.cryptoName).subscribe(priceHistory => {
      this.historyData = priceHistory;
       this.createChart();
    });
  }

  createChart() {
    const ctx : any = document.getElementById('chart');
    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.historyData!.map(item => item.partitionDate),
        datasets: [
          { 
            yAxisID: "watchlist", label: "Watchlist", data: this.historyData!.map(item => item.watchlist), 
            borderColor: this.watchlistColor, pointStyle: 'line'
          },
          { 
            yAxisID: "priceBtc", label: "Price(BTC)", data: this.historyData!.map(item => item.btcPrice),
            borderColor: this.priceColor, pointStyle: 'line'
          },
          { 
            yAxisID: "rank", label: "Rank", data: this.historyData!.map(item => item.rank),
            borderColor: this.rankColor, pointStyle: 'line'
          }
        ],
      },
      options: {
        scales: {
          watchlist: { position: 'left', ticks: { color: this.watchlistColor } },
          priceBtc: { position: 'right', ticks: { color: this.priceColor, callback: (value) => this.tickFormat.format(Number(value)) } },
          rank: { position: 'right', ticks: { color: this.rankColor } }
        },
        elements: { point: {radius: 1}},
        plugins: {
          legend: {
            position: 'top',
            labels: {
              generateLabels: chart => {
                return chart.data.datasets.map((dataset, i) => {
                  return {
                    text: dataset.label || "",
                    pointStyle: 'circle',
                    fillStyle: dataset.borderColor?.toString(),
                    strokeStyle: dataset.borderColor?.toString(),
                  };
                });
              },
            }
          }
        }
      }
    });
  }   
}
