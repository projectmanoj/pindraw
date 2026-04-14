"use client";

import React from "react";
import { CheckCircle2, Code2, Briefcase, Sparkles, GraduationCap, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const Section = ({ title, icon: Icon, children, className }: SectionProps) => (
  <div className={cn("bg-white border border-neutral-200 rounded-xl p-6 shadow-sm mb-8", className)}>
    <div className="flex items-center gap-2 mb-6 border-b border-neutral-100 pb-4">
      <div className="bg-neutral-900 p-2 rounded-lg">
        <Icon className="size-5 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-neutral-900 uppercase tracking-tight font-serif">{title}</h2>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const TipList = ({ items }: { items: string[] | { title: string; content: string }[] }) => (
  <ul className="space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex gap-3 text-sm text-neutral-600 leading-relaxed">
        <span className="shrink-0 mt-1 flex h-1.5 w-1.5 rounded-full bg-neutral-400" />
        {typeof item === "string" ? (
          item
        ) : (
          <span>
            <strong className="text-neutral-900">{item.title}:</strong> {item.content}
          </span>
        )}
      </li>
    ))}
  </ul>
);

const ProjectCard = ({ title, highlights }: { title: string; highlights: string[] }) => (
  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
    <h3 className="font-bold text-neutral-900 mb-2 flex items-center gap-2">
      <Code2 className="size-4 text-neutral-500" />
      {title}
    </h3>
    <ul className="space-y-2">
      {highlights.map((h, i) => (
        <li key={i} className="flex gap-2 text-xs text-neutral-600">
          <span className="text-neutral-400">•</span>
          {h}
        </li>
      ))}
    </ul>
  </div>
);

const ExperienceCard = ({ role, company, period, highlights }: { role: string; company: string; period: string; highlights: string[] }) => (
  <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
    <div className="flex justify-between items-start mb-2 gap-4 flex-wrap">
      <div>
        <h3 className="font-bold text-neutral-900">{role}</h3>
        <p className="text-xs text-neutral-500 font-medium">{company}</p>
      </div>
      <span className="text-[10px] font-medium bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full uppercase italic">
        {period}
      </span>
    </div>
    <ul className="space-y-2">
      {highlights.map((h, i) => (
        <li key={i} className="flex gap-2 text-xs text-neutral-600">
          <span className="text-neutral-400">•</span>
          {h}
        </li>
      ))}
    </ul>
  </div>
);

export function ResumeTips() {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <Section title="Key Tips for Adding Projects" icon={Laptop}>
        <TipList
          items={[
            { title: "Project Title & Brief Description", content: "Clearly state the name and purpose of the project." },
            { title: "Technologies Used", content: "Mention the stack/tools you worked with (e.g., React, MongoDB, Next.js)." },
            { title: "Impact and Value", content: 'Quantify results (e.g., "Improved page load time by 30%" or "Attracted 1,000+ users in 2 weeks").' },
            { title: "Showcase Problem-Solving", content: "Highlight challenges solved or innovative features you added." },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <ProjectCard
            title="IGNOU Developer Student Club (Q&A Platform)"
            highlights={[
              "Developed a full-stack Q&A platform using Next.js, TypeScript, and MongoDB, enabling 500+ students to ask and answer questions.",
              "Implemented voting, bookmarking, and medal systems, increasing user engagement by 35%.",
              "Integrated ChatGPT API for AI-powered auto-generated answers, improving user response time by 50%.",
              "Optimized UI/UX using Tailwind CSS and Shadcn/ui, ensuring responsiveness across devices.",
            ]}
          />
          <ProjectCard
            title="Portfolio Website with Blog Integration"
            highlights={[
              "Built a personal portfolio using Next.js, MDX, and Tailwind CSS to showcase projects and blogs.",
              "Integrated GitHub API to dynamically fetch and render blog posts from markdown files, saving manual updates by 100%.",
              "Used Framer Motion for smooth animations, improving user engagement and site aesthetics.",
              "Attracted 300+ views within the first two weeks of deployment.",
            ]}
          />
        </div>
      </Section>

      <Section title="Key Tips for Adding Experience" icon={Briefcase}>
        <TipList
          items={[
            "Company/Platform Name: List where you worked (e.g., Upwork, internship company).",
            "Position Title: Specify your role (e.g., Frontend Developer Intern, Freelance Web Developer).",
            "Duties/Contributions: Focus on achievements rather than generic tasks.",
            'Quantify Results: Use numbers to show the impact (e.g., "Increased site traffic by 25%" or "Delivered 5+ websites ahead of deadlines").',
          ]}
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <ExperienceCard
            role="Freelance Web Developer"
            company="Upwork"
            period="Jan 2024 – Present"
            highlights={[
              "Delivered 5+ responsive and dynamic websites using React.js, Next.js, and Node.js, ensuring on-time delivery with a 100% client satisfaction rate.",
              "Improved client website performance by 40% on average by optimizing assets, implementing lazy loading, and using Lighthouse tools.",
              "Collaborated with international clients to customize features, resulting in 15% repeat project requests.",
            ]}
          />
          <ExperienceCard
            role="Frontend Developer Intern"
            company="TechSphere Solutions"
            period="May 2023 – Dec 2023"
            highlights={[
              "Developed a dashboard for tracking employee performance using React.js and Chart.js, reducing manual reporting time by 60%.",
              "Contributed to redesigning the company's website with Tailwind CSS, increasing web traffic by 25%.",
              "Worked closely with the backend team to integrate RESTful APIs, ensuring seamless data flow and improving page load speed by 30%.",
            ]}
          />
        </div>
      </Section>

      <Section title="Final Tips for a Polished Resume" icon={Sparkles}>
        <div className="grid md:grid-cols-2 gap-8">
          <TipList
            items={[
              'Action Verbs: Use strong words like "Developed," "Optimized," "Designed," etc.',
              "Proofread: Avoid typos and grammatical errors. Consider tools like Grammarly.",
              "Tailor for the Role: Highlight skills and experiences relevant to the specific job you're applying for.",
              "Use Metrics: Always quantify your impact (%, $, or numbers).",
            ]}
          />
          <div className="bg-neutral-900 rounded-xl p-6 text-neutral-100 flex flex-col justify-center border border-neutral-800">
            <GraduationCap className="size-8 text-neutral-400 mb-4" />
            <p className="text-sm italic leading-relaxed text-neutral-300">
              "By structuring your resume with quantified impact and clear value additions, you'll stand out as a strong candidate, even as a beginner. Let me know if you'd like a tailored resume template or further advice!"
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
