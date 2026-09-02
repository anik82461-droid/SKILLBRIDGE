import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Network,
  Radar,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { HeroIllustration } from "@/components/HeroIllustration";
import { RoleCard } from "@/components/RoleCard";
import { SectionLabel } from "@/components/SectionLabel";
import { FeatureIcon } from "@/components/FeatureIcon";
import StudentForm from "@/StudentForm";
import StudentLogin from "@/StudentLogin";

const roles = [
  {
    role: "Student",
    description:
      "Build skills, discover opportunities and get matched with internships and placements.",
    icon: GraduationCap,
    accent: "bg-orange-400",
    iconClass: "bg-orange-100 text-orange-600",
  },
  {
    role: "Academia",
    description:
      "Understand industry skill demands and align curriculum with emerging workforce requirements.",
    icon: UsersRound,
    accent: "bg-teal-500",
    iconClass: "bg-teal-100 text-teal-700",
  },
  {
    role: "Industry",
    description:
      "Share skill requirements and discover verified, job-ready student talent.",
    icon: BriefcaseBusiness,
    accent: "bg-blue-500",
    iconClass: "bg-blue-100 text-blue-700",
  },
];

const steps = [
  { label: "Industry demand", icon: BarChart3 },
  { label: "Skill gap analysis", icon: Radar },
  { label: "Skill development", icon: GraduationCap },
  { label: "Skill verification", icon: CheckCircle2 },
  { label: "Internship", icon: BriefcaseBusiness },
  { label: "Placement", icon: Network },
];

const features: {
  name: Parameters<typeof FeatureIcon>[0]["name"];
  title: string;
  description: string;
}[] = [
  {
    name: "map",
    title: "Intelligent skill mapping",
    description:
      "See the skills that matter now and the ones worth building next.",
  },
  {
    name: "demand",
    title: "Industry skill demand",
    description:
      "Turn real employer signals into a shared source of truth.",
  },
  {
    name: "curriculum",
    title: "Curriculum gap analysis",
    description:
      "Help institutions stay relevant as the world of work evolves.",
  },
  {
    name: "credentials",
    title: "Verified skills & credentials",
    description:
      "Make progress visible, trusted and ready to share.",
  },
  {
    name: "portal",
    title: "Internship & placement portal",
    description:
      "Move from learning to meaningful opportunity in one place.",
  },
  {
    name: "match",
    title: "Intelligent candidate matching",
    description:
      "Create better-fit connections for people and organisations.",
  },
  {
    name: "analytics",
    title: "Placement analytics",
    description:
      "Make outcomes visible and use data to keep improving.",
  },
];

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  const scrollToJoin = () => {
    setShowLogin(false);

    setTimeout(() => {
      document
        .getElementById("student-profile")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div
      id="top"
      className="min-h-screen overflow-hidden bg-[#f5f8fc] text-slate-700"
    >
      <Navbar
        onLogin={() => setShowLogin(true)}
        onJoin={scrollToJoin}
      />

      <main>
        <section className="relative isolate">
          <div className="absolute -left-36 -top-36 -z-10 h-[430px] w-[430px] rounded-full bg-teal-100/50 blur-3xl" />
          <div className="absolute right-0 top-0 -z-10 h-[560px] w-[560px] rounded-full bg-orange-50 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-32 sm:pb-20 md:grid-cols-[0.9fr_1.1fr] md:gap-0 md:px-8 md:pt-40">
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/70 px-3 py-1.5 text-xs font-semibold text-teal-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Building India&apos;s career-ready workforce
              </div>

              <h1 className="font-display text-[3.45rem] font-bold leading-[0.98] tracking-[-0.055em] text-[#102a43] sm:text-6xl lg:text-[4.6rem]">
                Bridge the gap between{" "}
                <span className="text-primary">academia</span> and industry.
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
                Empowering students with industry-driven skills, internships
                and placement opportunities through intelligent
                academic–industry collaboration.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" onClick={scrollToJoin}>
                  Join the platform
                  <ArrowRight className="ml-2" size={18} />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Explore how it works
                  <ChevronRight className="ml-1" size={18} />
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-3 text-xs font-medium text-slate-400">
                <span className="flex -space-x-2">
                  <span className="h-7 w-7 rounded-full border-2 border-[#f5f8fc] bg-orange-200" />
                  <span className="h-7 w-7 rounded-full border-2 border-[#f5f8fc] bg-teal-200" />
                  <span className="h-7 w-7 rounded-full border-2 border-[#f5f8fc] bg-blue-200" />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#f5f8fc] bg-[#102a43] text-[9px] text-white">
                    +
                  </span>
                </span>

                Designed for students, institutions & employers
              </div>
            </div>

            <HeroIllustration />
          </div>
        </section>

        <section
          id="about"
          className="bg-white px-5 py-20 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <SectionLabel>One ecosystem, three perspectives</SectionLabel>

              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#102a43] sm:text-4xl">
                Everyone moves forward, together.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-500">
                SkillBridge gives each part of the ecosystem the clarity and
                connections they need to shape a better future of work.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {roles.map((role) => (
                <RoleCard key={role.role} {...role} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#102a43] px-5 py-20 text-white sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <SectionLabel light>How it works</SectionLabel>

                <h2 className="mt-4 max-w-md font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  From industry signal to career momentum.
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                  A simple, connected pathway that turns insight into
                  action—and action into opportunity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-7">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.label} className="relative">
                      {index < steps.length - 1 && index !== 2 && (
                        <div className="absolute left-[42px] top-5 hidden h-px w-[calc(100%+1.75rem)] bg-slate-600 sm:block" />
                      )}

                      <div className="relative flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300 ring-1 ring-inset ring-teal-300/20">
                          <Icon size={18} />
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-orange-300">
                            0{index + 1}
                          </span>

                          <p className="mt-1 text-xs font-semibold leading-5 text-slate-100">
                            {step.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-[#f5f8fc] px-5 py-20 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="max-w-xl">
                <SectionLabel>Built for real progress</SectionLabel>

                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#102a43] sm:text-4xl">
                  A stronger bridge starts with better signals.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-slate-500">
                Everything you need to understand demand, build capability and
                connect talent with the right opportunity.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-teal-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                    <FeatureIcon name={feature.name} />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold text-[#102a43]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StudentForm />

        <section className="px-5 pb-16 pt-2 sm:pb-20 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[2rem] bg-orange-100 px-7 py-10 sm:flex-row sm:items-center sm:px-12 sm:py-12">
            <div>
              <p className="font-display text-2xl font-bold text-[#102a43] sm:text-3xl">
                Ready to build what&apos;s next?
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Join the SkillBridge ecosystem and turn potential into
                progress.
              </p>
            </div>

            <Button variant="dark" size="lg" onClick={scrollToJoin}>
              Join the platform
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <Logo />

          <p className="text-xs text-slate-400">
            Academic–industry collaboration for a more capable India.
          </p>

          <p className="text-xs text-slate-400">© 2026 SkillBridge</p>
        </div>
      </footer>

      {showLogin && (
        <StudentLogin
          onClose={() => setShowLogin(false)}
          onJoin={scrollToJoin}
        />
      )}
    </div>
  );
}