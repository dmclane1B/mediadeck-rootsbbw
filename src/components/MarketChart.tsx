import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const MarketChart = () => {
  const marketData = [
    {
      category: 'RF Communication Advantage',
      value: 85,
      percentage: 85,
      description: 'Sports/Industrial sectors where RF outperforms Bluetooth/Wi-Fi',
      color: 'bg-accent'
    },
    {
      category: 'Market Growth Rate',
      value: 35,
      percentage: 35,
      description: 'Annual growth in mission-critical wearables',
      color: 'bg-primary'
    },
    {
      category: 'Capture Opportunity',
      value: 12,
      percentage: 12,
      description: 'Realistic market share in 3-5 years',
      color: 'bg-success'
    }
  ];

  return (
    <div className="space-y-8">
      {marketData.map((item, index) => (
        <Card key={index} className="p-6 border-l-4 border-l-accent bg-card/50 backdrop-blur-sm animate-fade-in" 
              style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground">{item.category}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">{item.value.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">{item.percentage}%</div>
            </div>
          </div>
          <Progress value={item.percentage} className="h-2" />
        </Card>
      ))}
    </div>
  );
};

export default MarketChart;