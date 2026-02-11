import { DemoSubmissionForm } from "@/components/demo-submission-form"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>
}) {
  const { event } = await searchParams

  return (
    <div className="flex min-h-screen justify-center bg-background px-4 py-12 sm:py-20">
      <main className="w-full max-w-lg">
        {/* Vercel triangle mark */}
        <div className="mb-6">
          <svg
            aria-label="Vercel"
            fill="currentColor"
            viewBox="0 0 75 65"
            className="h-5 text-foreground"
          >
            <path d="M37.59.25l36.95 64H.64L37.59.25z" />
          </svg>
        </div>

        {/* Event badge */}
        {event && (
          <div className="mb-6">
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {event}
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Submit a demo for AI Agents Demo Night
          </h1>
          <p className="text-[13px] text-muted-foreground leading-relaxed">
            {"RSVP in Luma anytime \u2014 you can submit a demo later. Selected demos will be confirmed a few days before the event."}
          </p>
          <p className="text-[13px] text-muted-foreground leading-relaxed mt-1">
            {"We\u2019re looking for thoughtful demos of AI agents or agentic workflows \u2014 from early experiments to production systems. Keep it concise and only a few minutes, focused on what you built, how it works, and what you learned."}
          </p>
        </div>

        {/* Form */}
        <DemoSubmissionForm />

        {/* Footer */}
        <footer className="mt-12 border-t border-border pt-6 pb-8">
          <p className="text-xs text-muted-foreground">
            {"Questions? Contact the organizers."}
          </p>
        </footer>
      </main>
    </div>
  )
}
