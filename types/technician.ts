export interface TechnicianOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  device: string;
  deviceProblem: string;
  address: string;
  scheduledAt: string;
  status: string;
  estimatedPrice: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderType: "technician" | "customer";
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface EarningsRecord {
  id: string;
  orderId: string;
  customerName: string;
  serviceType: string;
  amount: number;
  status: "completed" | "pending" | "paid";
  completedAt: string;
}

export interface ServiceReport {
  id: string;
  orderId: string;
  actualDamage: string;
  actionsTaken: string;
  partsReplaced: Array<{
    name: string;
    quantity: number;
    price: number;
    photoUrl?: string;
  }>;
  additionalCost: number;
  totalCost: number;
  createdAt: string;
}
