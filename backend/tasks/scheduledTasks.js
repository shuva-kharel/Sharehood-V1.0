// tasks/scheduledTasks.js
import cron from 'node-cron';
import { User } from '../models/user.model.js';

// Schedule a task to run every minute
cron.schedule('* * * * *', async () => {
  const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);

  try {
    const result = await User.deleteMany({
      isVerified: false,
      createdAt: { $lt: oneMinuteAgo },
    });

    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} unverified user(s)`);
    }
  } catch (error) {
    console.error('Error deleting unverified users:', error);
  }
});
