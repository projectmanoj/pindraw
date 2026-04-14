import { ResumeTips } from "@/components/resume-tips";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Resume & Project Tips</h1>
        <ResumeTips />
      </div>
    </main>
  );
}
