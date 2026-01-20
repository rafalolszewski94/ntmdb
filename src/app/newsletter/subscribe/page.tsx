import NewsletterForm from '@/components/NewsletterForm';

export default function NewsletterSubscribePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Subscribe to NTMDB Newsletter</h1>
          <p className="text-muted-foreground">
            Get the latest movie recommendations and updates delivered to your inbox.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </div>
  );
}