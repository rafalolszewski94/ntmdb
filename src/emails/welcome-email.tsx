import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail = ({ email }: WelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to NTMDB Newsletter!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to NTMDB!</Heading>

        <Text style={text}>
          Thank you for subscribing to our newsletter. You'll receive updates about the latest movies, reviews, and exclusive content.
        </Text>

        <Section style={buttonContainer}>
          <Button style={button} href="https://ntmdb.vercel.app">
            Explore Movies
          </Button>
        </Section>

        <Text style={text}>
          Stay tuned for our next newsletter!
        </Text>

        <Section style={footer}>
          <Text style={footerText}>
            If you didn't subscribe to this newsletter, you can safely ignore this email.
          </Text>
          <Text style={footerText}>
            Want to unsubscribe?{' '}
            <Link
              href={`https://ntmdb.vercel.app/newsletter/unsubscribe?email=${encodeURIComponent(email)}`}
              style={link}
            >
              Click here
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '40px 0',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '24px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const footer = {
  borderTop: '1px solid #e5e7eb',
  marginTop: '32px',
  paddingTop: '32px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const link = {
  color: '#2563eb',
  textDecoration: 'underline',
};