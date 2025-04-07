
import React from 'react';
import { motion } from 'framer-motion';
import LowStockItemsCard from '../alerts/LowStockItemsCard';
import ExpiringItemsCard from '../alerts/ExpiringItemsCard';
import SystemNotificationsCard from '../alerts/SystemNotificationsCard';
import { SystemNotification } from '@/types/dashboard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const lowStockItems = [
  { id: 1, name: 'Premium Dog Food', category: 'Dog Food', stock: 23, threshold: 50 },
  { id: 2, name: 'Senior Cat Formula', category: 'Cat Food', stock: 18, threshold: 30 },
  { id: 3, name: 'Grain-Free Puppy Mix', category: 'Dog Food', stock: 12, threshold: 40 },
  { id: 4, name: 'Tropical Fish Flakes', category: 'Fish Food', stock: 8, threshold: 15 },
];

const expiringItems = [
  { id: 1, name: 'Organic Cat Treats', category: 'Cat Food', expiresIn: 5 },
  { id: 2, name: 'Fresh Meat Rolls', category: 'Dog Food', expiresIn: 7 },
  { id: 3, name: 'Premium Wet Food', category: 'Cat Food', expiresIn: 10 },
  { id: 4, name: 'Special Diet Mix', category: 'Bird Food', expiresIn: 12 },
];

const systemNotifications: SystemNotification[] = [
  { message: 'Inventory adjustment required for SKU-2345', time: '2 hours ago', type: 'warning' },
  { message: 'Order #12456 successfully processed', time: '4 hours ago', type: 'success' },
  { message: 'Batch #789 quality check completed', time: '1 day ago', type: 'info' },
  { message: 'System maintenance scheduled for May 20, 02:00 AM', time: '2 days ago', type: 'info' },
];

const AlertsTab = () => {
  return (
    <motion.div variants={containerVariants} className="grid gap-6 lg:grid-cols-2">
      <LowStockItemsCard items={lowStockItems} />
      <ExpiringItemsCard items={expiringItems} />
      <SystemNotificationsCard notifications={systemNotifications} />
    </motion.div>
  );
};

export default AlertsTab;
