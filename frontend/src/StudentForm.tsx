import { useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

type StudentResult = {
  id: string;
  name: string;
  email: string;
  college: string;
  branch: string;
  year: number;
  skills: string[];
  communication: string | null;
  recommended_domain: string;
  recommended_internship: string;
  skill_gaps: string[];
};

const AVAILABLE_SKILLS = [
  "Python",
  "SQL",
  "Java",
  "Web Development",
  "Data Analysis",
];

const COMMUNICATION_LEVELS = [
  "Beginner",
  "Basic",
  "Good",
  "Excellent",
];

export default function StudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("1");
  const [skills, setSkills] = useState<string[]>([]);
  const [communication, setCommunication] = useState("Good");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState<StudentResult | null>(null);

  const toggleSkill = (skill: string) => {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    );
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setCollege("");
    setBranch("");
    setYear("1");
    setSkills([]);
    setCommunication("Good");
    setError("");
    setSuccess(false);
    setResult(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);
    setResult(null);

    if (skills.length === 0) {
      setError("Please select at least one skill.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          college,
          branch,
          year: Number(year),
          skills,
          communication,
        }),
      });

      const responseText = await response.text();

      let responseData: {
        success?: boolean;
        data?: StudentResult;
        message?: string;
        detail?: string;
      } = {};

      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch {
        throw new Error(
          `Server returned an invalid response (${response.status}).`,
        );
      }

      if (!response.ok) {
        throw new Error(
          responseData.detail ||
            responseData.message ||
            `Failed to create profile (${response.status}).`,
        );
      }

      if (!responseData.data) {
        throw new Error("Profile was created, but no recommendation was returned.");
      }

      setResult(responseData.data);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="student-profile"
      className="w-full bg-slate-50 px-6 py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <Sparkles className="h-4 w-4" />
            AI Career Matching
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Build Your SkillBridge Profile
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Enter your academic details and skills to receive a career-domain
            and internship recommendation.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="college"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  College / University
                </label>

                <input
                  id="college"
                  type="text"
                  required
                  minLength={2}
                  maxLength={180}
                  value={college}
                  onChange={(event) => setCollege(event.target.value)}
                  placeholder="Enter your college"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="branch"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Branch / Department
                </label>

                <input
                  id="branch"
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Current Year
                </label>

                <select
                  id="year"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                  <option value="6">6th Year</option>
                  <option value="7">7th Year</option>
                  <option value="8">8th Year</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="communication"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Communication Level
                </label>

                <select
                  id="communication"
                  value={communication}
                  onChange={(event) => setCommunication(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {COMMUNICATION_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-slate-800">
                  Your Skills
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select all the skills you currently have.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {AVAILABLE_SKILLS.map((skill) => {
                  const selected = skills.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        selected
                          ? "border-blue-600 bg-blue-600 text-white shadow-md"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>

              {skills.length === 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  Choose at least one skill.
                </p>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Profile...
                </>
              ) : (
                <>
                  Create My Profile
                  <Sparkles className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {success && result && (
            <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />

                <div>
                  <h3 className="text-xl font-bold text-emerald-900">
                    Profile created successfully!
                  </h3>

                  <p className="mt-1 text-sm text-emerald-700">
                    SkillBridge has analyzed your skills and generated your
                    initial career recommendation.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Recommended Career Domain
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {result.recommended_domain}
                  </p>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Recommended Internship
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900">
                    {result.recommended_internship}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Skill Gaps
                </p>

                {result.skill_gaps.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.skill_gaps.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm font-medium text-emerald-700">
                    Great! No skill gaps detected from the current skill set.
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Create Another Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
