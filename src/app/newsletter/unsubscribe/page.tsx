import NewsletterForm from '@/components/NewsletterForm';

export default function NewsletterUnsubscribePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Unsubscribe from NTMDB Newsletter</h1>
          <p className="text-muted-foreground">
            Enter your email address to unsubscribe from our newsletter.
          </p>
        </div>
        <NewsletterForm variant="card" />
      </div>
    </div>
  );
}