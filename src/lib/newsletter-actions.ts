'use server';

import { NewsletterService } from './newsletter';
import { revalidatePath } from 'next/cache';

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, message: 'Email is required' };
  }

  const result = await NewsletterService.subscribe(email);

  if (result.success) {
    revalidatePath('/');
  }

  return result;
}

export async function unsubscribeFromNewsletter(formData: FormData) {
  const email = formData.get('email') as string;

  if (!email) {
    return { success: false, message: 'Email is required' };
  }

  const result = await NewsletterService.unsubscribe(email);

  if (result.success) {
    revalidatePath('/');
  }

  return result;
}