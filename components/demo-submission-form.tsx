"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"

export function DemoSubmissionForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [charCount, setCharCount] = useState(0)


  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const formData = new FormData(e.currentTarget)

    const actionUrl = "https://formspree.io/f/meelekpb"

    if (!actionUrl) {
      setStatus("error")
      setErrorMessage("Form action URL is not configured. Please set NEXT_PUBLIC_FORM_ACTION.")
      return
    }

    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`)
      }

      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      )
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="flex items-center justify-center rounded-full border border-border p-3">
          <CheckCircle2 className="size-6 text-foreground" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Demo submitted
        </h2>
        <p className="max-w-sm text-[13px] text-muted-foreground leading-relaxed">
          {"Thanks for submitting. We'll review your demo and follow up a few days before the event."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Full name */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="full_name" className="text-[13px]">
          Full name <span className="text-muted-foreground">*</span>
        </Label>
        <Input
          id="full_name"
          name="full_name"
          required
          placeholder="Jane Smith"
          autoComplete="name"
          className="h-10 bg-[#0a0a0a]"
        />
      </fieldset>

      {/* Email */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="email" className="text-[13px]">
          Email <span className="text-muted-foreground">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="jane@company.com"
          autoComplete="email"
          className="h-10 bg-[#0a0a0a]"
        />
      </fieldset>

      {/* Company / team */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="company" className="text-[13px]">Company / team</Label>
        <Input
          id="company"
          name="company"
          placeholder="Acme Inc."
          autoComplete="organization"
          className="h-10 bg-[#0a0a0a]"
        />
      </fieldset>

      {/* Project name */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="project_name" className="text-[13px]">
          Project name <span className="text-muted-foreground">*</span>
        </Label>
        <Input
          id="project_name"
          name="project_name"
          required
          placeholder="AgentKit"
          className="h-10 bg-[#0a0a0a]"
        />
      </fieldset>

      {/* What does your agent do? */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="description" className="text-[13px]">
          What does your agent do? <span className="text-muted-foreground">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          required
          maxLength={500}
          placeholder="Describe your agent, what problem it solves, and how it works..."
          className="min-h-28 bg-[#0a0a0a]"
          onChange={(e) => setCharCount(e.target.value.length)}
        />
        <p className="text-xs text-muted-foreground text-right tabular-nums">
          {charCount}/500
        </p>
      </fieldset>

      {/* Link */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="link" className="text-[13px]">Link</Label>
        <Input
          id="link"
          name="link"
          type="url"
          placeholder="https://github.com/..."
          className="h-10 bg-[#0a0a0a]"
        />
        <p className="text-xs text-muted-foreground">
          GitHub, live demo, or documentation
        </p>
      </fieldset>

      {/* Anything else */}
      <fieldset className="flex flex-col gap-1.5">
        <Label htmlFor="notes" className="text-[13px]">Anything else we should know?</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Special requirements, AV needs, etc."
          className="min-h-20 bg-[#0a0a0a]"
        />
      </fieldset>

      {/* Error message */}
      {status === "error" && (
        <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full h-10"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit demo"
        )}
      </Button>
    </form>
  )
}
