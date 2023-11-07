export interface ChartInterface {
  animationEnabled: boolean;
  title: {
    text: string;
  };
  data: [
    {
      type: string;
      startAngle: number;
      indexLabel: string;
      yValueFormatString: string;
      dataPoints: DataPointInterface[];
    }
  ];
}

export interface DataPointInterface {
  name: string;
  totalTimestamp?: number;
  length?: number;
  y: number;
}
