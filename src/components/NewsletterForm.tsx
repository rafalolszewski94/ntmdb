'use client';

import { useState, useTransition } from 'react';
import { subscribeToNewsletter, unsubscribeFromNewsletter } from '@/lib/newsletter-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, CheckCircle, XCircle, Loader2 } from 'lucide-react';

type NewsletterFormProps = {
  variant?: 'inline' | 'card';
  className?: string;
  initialMode?: 'subscribe' | 'unsubscribe';
};

const NewsletterForm = ({ variant = 'card', className, initialMode = 'subscribe' }: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [mode, setMode] = useState<'subscribe' | 'unsubscribe'>(initialMode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    setMessage(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('email', email.trim());

        const result = mode === 'subscribe'
          ? await subscribeToNewsletter(formData)
          : await unsubscribeFromNewsletter(formData);

        setMessage({
          type: result.success ? 'success' : 'error',
          text: result.message
        });

        if (result.success) {
          setEmail('');
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: 'Something went wrong. Please try again.'
        });
      }
    });
  };

  const toggleMode = () => {
    setMode(mode === 'subscribe' ? 'unsubscribe' : 'subscribe');
    setMessage(null);
    setEmail('');
  };

  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder={mode === 'subscribe' ? "Enter your email" : "Enter email to unsubscribe"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            aria-label={mode === 'subscribe' ? "Email for newsletter subscription" : "Email for newsletter unsubscription"}
            required
          />
          <Button
            type="submit"
            disabled={isPending}
            size="sm"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Mail className="h-4 w-4" />
            )}
            {mode === 'subscribe' ? 'Subscribe' : 'Unsubscribe'}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-2 ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertDescription className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <button
          type="button"
          onClick={toggleMode}
          className="mt-2 text-sm text-muted-foreground hover:text-foreground underline"
        >
          {mode === 'subscribe' ? 'Want to unsubscribe?' : 'Want to subscribe?'}
        </button>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {mode === 'subscribe' ? 'Stay Updated' : 'Unsubscribe'}
        </CardTitle>
        <CardDescription>
          {mode === 'subscribe'
            ? 'Get the latest movie recommendations and updates delivered to your inbox.'
            : 'Enter your email to unsubscribe from our newsletter.'
          }
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            aria-label="Email address"
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'subscribe' ? 'Subscribing...' : 'Unsubscribing...'}
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {mode === 'subscribe' ? 'Subscribe to Newsletter' : 'Unsubscribe'}
              </>
            )}
          </Button>
        </form>

        {message && (
          <Alert className={`mt-4 ${message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <AlertDescription className="flex items-center gap-2">
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              {message.text}
            </AlertDescription>
          </Alert>
        )}

        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
        >
          {mode === 'subscribe' ? 'Already subscribed? Unsubscribe here' : 'Want to subscribe instead?'}
        </button>
      </CardContent>
    </Card>
  );
};

export default NewsletterForm;