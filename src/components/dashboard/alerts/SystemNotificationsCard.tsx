
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SystemNotification } from '@/types/dashboard';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface SystemNotificationsCardProps {
  notifications: SystemNotification[];
}

const SystemNotificationsCard = ({ notifications }: SystemNotificationsCardProps) => {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 ${
                  notification.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                  notification.type === 'success' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <p className={`font-medium ${
                      notification.type === 'warning' ? 'text-amber-800' :
                      notification.type === 'success' ? 'text-green-800' :
                      'text-blue-800'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SystemNotificationsCard;
