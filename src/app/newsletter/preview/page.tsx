import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome-email';
import UnsubscribeEmail from '@/emails/unsubscribe-email';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function NewsletterPreviewPage() {
  // Render email templates to HTML for preview
  const welcomeHtml = await render(WelcomeEmail({ email: 'user@example.com' }));
  const unsubscribeHtml = await render(UnsubscribeEmail({ email: 'user@example.com' }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Newsletter Email Previews</h1>
          <p className="text-muted-foreground">
            Preview how your newsletter emails will look to subscribers.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Welcome Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Welcome Email</CardTitle>
              <CardDescription>
                Sent when users subscribe to the newsletter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <strong>Subject:</strong> Welcome to NTMDB Newsletter!
                </div>
                <div className="text-sm">
                  <strong>From:</strong> NTMDB &lt;newsletter@mail.botox.boo&gt;
                </div>
                <Separator />
                <div
                  className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto text-sm"
                  dangerouslySetInnerHTML={{ __html: welcomeHtml }}
                />
                <Link href="/newsletter/subscribe">
                  <Button variant="outline" className="w-full">
                    Test Subscribe
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Unsubscribe Email Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Unsubscribe Email</CardTitle>
              <CardDescription>
                Sent when users unsubscribe from the newsletter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm">
                  <strong>Subject:</strong> Unsubscribed from NTMDB Newsletter
                </div>
                <div className="text-sm">
                  <strong>From:</strong> NTMDB &lt;newsletter@mail.botox.boo&gt;
                </div>
                <Separator />
                <div
                  className="border rounded-lg p-4 bg-white max-h-96 overflow-y-auto text-sm"
                  dangerouslySetInnerHTML={{ __html: unsubscribeHtml }}
                />
                <Link href="/newsletter/unsubscribe">
                  <Button variant="outline" className="w-full">
                    Test Unsubscribe
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}