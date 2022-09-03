import { Component } from 'react'
import ApexCharts from 'react-apexcharts'

export default class Apps extends Component {
  constructor(props) {
    super(props);

    this.state = {
          
      series: [{

        data: [{
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
          },
         
        ]
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 350
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left'
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      },
    
    
    };
  }

  render() {
    return (
      <div id="chart">
        <ApexCharts options={this.state.options} series={this.state.series} type="candlestick" height={350} />
      </div>
    );
  }
}