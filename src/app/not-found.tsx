import { PageShell } from "@/components/page/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <section style={{ padding: "220px 24px 100px", textAlign: "center" }}>
        <h1 style={{ fontSize: 48, fontWeight: 700 }}>Page not found</h1>
        <p style={{ margin: "16px 0 32px" }}>The page you are looking for does not exist or has moved.</p>
        <Button href="/">Back to Home</Button>
      </section>
    </PageShell>
  );
}
