// Virtual Meter Service
// Simulates real-time energy meter data with realistic patterns

export class VirtualMeter {
  private baseProduction: number = 5.0; // Base production in kWh
  private baseConsumption: number = 3.0; // Base consumption in kWh
  private batteryCapacity: number = 10.0; // Total battery capacity in kWh
  private batteryLevel: number = 7.5; // Current battery level in kWh
  private lastUpdate: Date = new Date();

  // Simulate time-based solar production variations
  private getSolarFactor(): number {
    const hour = new Date().getHours();
    // Peak production between 10 AM and 2 PM
    if (hour >= 10 && hour <= 14) return 1.0;
    // Moderate production between 7-10 AM and 2-5 PM
    if ((hour >= 7 && hour < 10) || (hour > 14 && hour <= 17)) return 0.6;
    // Low production during early morning and late afternoon
    if ((hour >= 5 && hour < 7) || (hour > 17 && hour <= 19)) return 0.3;
    // No production at night
    return 0.0;
  }

  // Add random variations to simulate real-world fluctuations
  private addNoise(value: number, factor: number = 0.1): number {
    const noise = (Math.random() - 0.5) * 2 * factor * value;
    return Math.max(0, value + noise);
  }

  // Update battery level based on production and consumption
  private updateBatteryLevel(production: number, consumption: number): void {
    const netEnergy = production - consumption;
    this.batteryLevel = Math.max(0, Math.min(this.batteryCapacity, this.batteryLevel + netEnergy * 0.1));
  }

  // Get current meter readings
  public getMeterData() {
    const solarFactor = this.getSolarFactor();
    
    // Calculate production with solar factor and noise
    const production = this.addNoise(this.baseProduction * solarFactor);
    
    // Calculate consumption with time-based and random variations
    const consumption = this.addNoise(this.baseConsumption * (0.7 + Math.random() * 0.6));
    
    // Update battery level
    this.updateBatteryLevel(production, consumption);

    // Calculate grid interaction
    const gridBalance = production - consumption;
    const gridImport = gridBalance < 0 ? Math.abs(gridBalance) : 0;
    const gridExport = gridBalance > 0 ? gridBalance : 0;

    // Calculate carbon impact
    const carbonSaved = production * 0.4; // 0.4 kg CO2 per kWh
    
    const now = new Date();
    const timeDiff = (now.getTime() - this.lastUpdate.getTime()) / 1000; // in seconds
    this.lastUpdate = now;

    return {
      timestamp: now.toISOString(),
      timeSinceLastUpdate: timeDiff,
      production: {
        current: production.toFixed(2),
        trend: ((production - this.baseProduction) / this.baseProduction * 100).toFixed(1),
        solar: (production * 0.8).toFixed(2), // 80% from solar
        wind: (production * 0.2).toFixed(2), // 20% from wind
      },
      consumption: {
        current: consumption.toFixed(2),
        trend: ((consumption - this.baseConsumption) / this.baseConsumption * 100).toFixed(1),
        home: (consumption * 0.7).toFixed(2), // 70% home consumption
        devices: (consumption * 0.3).toFixed(2), // 30% device consumption
      },
      battery: {
        level: (this.batteryLevel / this.batteryCapacity * 100).toFixed(0) + "%",
        inputRate: (Math.max(0, production - consumption) * 0.1).toFixed(2),
        outputRate: (Math.max(0, consumption - production) * 0.1).toFixed(2),
        health: "98%",
        backupTime: (this.batteryLevel / (consumption || 0.1)).toFixed(1) + " hours"
      },
      grid: {
        imported: gridImport.toFixed(2),
        exported: gridExport.toFixed(2),
        balance: (gridExport - gridImport).toFixed(2)
      },
      carbon: {
        saved: carbonSaved.toFixed(1),
        trees: (carbonSaved * 0.0417).toFixed(1), // 1 tree absorbs about 24 kg CO2 per year
        milesSaved: (carbonSaved * 2.98).toFixed(0) // 1 kg CO2 = 2.98 miles not driven
      }
    };
  }
}

// Singleton instance
export const virtualMeter = new VirtualMeter(); 