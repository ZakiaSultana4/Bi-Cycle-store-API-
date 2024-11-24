// Interface for the Bicycle product
// Enum for bicycle types
export enum BicycleType {
    Mountain = 'Mountain',
    Road = 'Road',
    Hybrid = 'Hybrid',
    BMX = 'BMX',
    Electric = 'Electric',
  }
  
export interface IBicycle  {
    name: string;
    brand: string;
    price: number;
    type: BicycleType;
    description: string;
    quantity: number;
    inStock: boolean;
  }
  