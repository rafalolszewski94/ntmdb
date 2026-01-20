import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import { z } from 'zod';
import WelcomeEmail from '@/emails/welcome-email';
import UnsubscribeEmail from '@/emails/unsubscribe-email';

// Initialize Redis and Resend clients
const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schemas
export const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const unsubscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Redis keys
const SUBSCRIBERS_KEY = 'newsletter:subscribers';
const UNSUBSCRIBERS_KEY = 'newsletter:unsubscribers';

// Newsletter utility functions
export class NewsletterService {
  /**
   * Subscribe an email to the newsletter
   */
  static async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate email
      const validatedData = subscribeSchema.parse({ email });
      const normalizedEmail = validatedData.email.toLowerCase().trim();

      // Check if already subscribed
      const isSubscribed = await redis.sismember(SUBSCRIBERS_KEY, normalizedEmail);
      if (isSubscribed) {
        return { success: false, message: 'You are already subscribed to our newsletter.' };
      }

      // Check if previously unsubscribed and remove from unsubscribers
      await redis.srem(UNSUBSCRIBERS_KEY, normalizedEmail);

      // Add to subscribers
      await redis.sadd(SUBSCRIBERS_KEY, normalizedEmail);

      // Send welcome email
      await this.sendWelcomeEmail(normalizedEmail);

      return { success: true, message: 'Successfully subscribed! Check your email for a welcome message.' };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      if (error instanceof z.ZodError) {
        return { success: false, message: 'Please enter a valid email address' };
      }
      return { success: false, message: 'Failed to subscribe. Please try again.' };
    }
  }

  /**
   * Unsubscribe an email from the newsletter
   */
  static async unsubscribe(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Validate email
      const validatedData = unsubscribeSchema.parse({ email });
      const normalizedEmail = validatedData.email.toLowerCase().trim();

      // Check if subscribed
      const isSubscribed = await redis.sismember(SUBSCRIBERS_KEY, normalizedEmail);
      if (!isSubscribed) {
        return { success: false, message: 'This email is not subscribed to our newsletter.' };
      }

      // Remove from subscribers
      await redis.srem(SUBSCRIBERS_KEY, normalizedEmail);

      // Add to unsubscribers to prevent re-subscription
      await redis.sadd(UNSUBSCRIBERS_KEY, normalizedEmail);

      // Send unsubscribe confirmation email
      await this.sendUnsubscribeEmail(normalizedEmail);

      return { success: true, message: 'Successfully unsubscribed. Check your email for confirmation.' };
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      if (error instanceof z.ZodError) {
        return { success: false, message: 'Please enter a valid email address' };
      }
      return { success: false, message: 'Failed to unsubscribe. Please try again.' };
    }
  }

  /**
   * Get subscriber count (for admin purposes)
   */
  static async getSubscriberCount(): Promise<number> {
    try {
      return await redis.scard(SUBSCRIBERS_KEY);
    } catch (error) {
      console.error('Error getting subscriber count:', error);
      return 0;
    }
  }

  /**
   * Send welcome email to new subscriber
   */
  private static async sendWelcomeEmail(email: string): Promise<void> {
    try {
      const html = await render(WelcomeEmail({ email }));

      await resend.emails.send({
        from: 'NTMDB <newsletter@mail.botox.boo>',
        to: email,
        subject: 'Welcome to NTMDB Newsletter!',
        html,
      });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // Don't throw - subscription should still work even if email fails
    }
  }

  /**
   * Send unsubscribe confirmation email
   */
  private static async sendUnsubscribeEmail(email: string): Promise<void> {
    try {
      const html = await render(UnsubscribeEmail({ email }));

      await resend.emails.send({
        from: 'NTMDB <newsletter@mail.botox.boo>',
        to: email,
        subject: 'Unsubscribed from NTMDB Newsletter',
        html,
      });
    } catch (error) {
      console.error('Error sending unsubscribe email:', error);
      // Don't throw - unsubscription should still work even if email fails
    }
  }
}