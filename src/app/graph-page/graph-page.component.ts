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
  watchlistImproveColor = 'rgb(207, 52, 235)';
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
      if(priceHistory?.length > 0)
        this.cryptoName = priceHistory[priceHistory.length-1].displayName + " | " + this.cryptoName
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
            yAxisID: "watchlistImprove%", label: "Watchlist Improve%", data: this.historyData!.map(item => item.watchlistImprovePercentage), 
            borderColor: this.watchlistImproveColor, pointStyle: 'line'
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
          watchlistImprove: { position: 'left', ticks: { color: this.watchlistImproveColor } },
          priceBtc: { position: 'right', ticks: { color: this.priceColor, callback: (value) => this.tickFormat.format(Number(value)) } },
          rank: { position: 'right', reverse: true, ticks: { color: this.rankColor, stepSize: 1, callback: (value) => Math.round(Number(value)) } }
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
                    index: i,
                    hidden: false
                  };
                });
              },
            },
            onClick: (e, legendItem) => {
              //To show/hide datasets on click in the legend
              const index = legendItem.index;
              const meta = this.chart!.getDatasetMeta(index!);
              meta.hidden = !meta.hidden;
              this.chart!.update();
            }
          }
        }
      }
    });
  }   
}
