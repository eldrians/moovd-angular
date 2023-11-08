import {
  ChartInterface,
  DataPointInterface,
} from '../../../app/core/interfaces';

describe('ChartInterface', () => {
  it('should define the Chart Interface', () => {
    const chart: ChartInterface = {
      animationEnabled: true,
      title: {
        text: 'Result',
      },
      data: [
        {
          type: 'pie',
          startAngle: 0,
          indexLabel: 'label',
          yValueFormatString: '#,###',
          dataPoints: [
            {
              name: 'L1',
              y: 20,
            },
            {
              name: 'L2',
              y: 80,
            },
          ],
        },
      ],
    };

    expect(chart).toBeDefined();
    expect(chart.animationEnabled).toBe(true);
    expect(chart.title.text).toBe('Result');
    expect(chart.data.length).toBe(1);
    expect(chart.data[0].type).toBe('pie');
    expect(chart.data[0].dataPoints.length).toBe(2);
  });
});

describe('DataPointInterface', () => {
  it('should define the DataPoint Interface', () => {
    const dataPoint: DataPointInterface = {
      name: 'L1',
      y: 80,
    };

    expect(dataPoint).toBeDefined();
    expect(dataPoint.name).toBe('L1');
    expect(dataPoint.y).toBe(80);
  });
});
