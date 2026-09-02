import { useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Loader2,
  X,
} from "lucide-react";

type Student = {
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

type StudentLoginProps = {
  onClose: () => void;
  onJoin: () => void;
};

export default function StudentLogin({
  onClose,
  onJoin,
}: StudentLoginProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("1");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [student, setStudent] = useState<Student | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setStudent(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students`);

      if (!response.ok) {
        throw new Error("Unable to connect to SkillBridge.");
      }

      const responseData = await response.json();
      const students: Student[] = responseData.data || [];

      const matchedStudent = students.find(
        (item) =>
          item.name.trim().toLowerCase() === name.trim().toLowerCase() &&
          item.email.trim().toLowerCase() === email.trim().toLowerCase() &&
          item.college.trim().toLowerCase() ===
            college.trim().toLowerCase() &&
          item.branch.trim().toLowerCase() ===
            branch.trim().toLowerCase() &&
          item.year === Number(year),
      );

      if (!matchedStudent) {
        throw new Error(
          "No matching SkillBridge profile found. Please check your details or join the platform first.",
        );
      }

      setStudent(matchedStudent);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <GraduationCap className="h-4 w-4" />
              Student Login
            </div>

            <h2 className="text-2xl font-bold text-[#102a43] sm:text-3xl">
              Welcome back to SkillBridge
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your profile details to view your saved career and
              internship recommendations.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close login"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!student ? (
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="login-name"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Name
                </label>

                <input
                  id="login-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Gmail / Email
                </label>

                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="login-college"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  College
                </label>

                <input
                  id="login-college"
                  type="text"
                  required
                  value={college}
                  onChange={(event) => setCollege(event.target.value)}
                  placeholder="Your college"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="login-branch"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Course / Branch
                </label>

                <input
                  id="login-branch"
                  type="text"
                  required
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-year"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Current Year
              </label>

              <select
                id="login-year"
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

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
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
                  Checking Profile...
                </>
              ) : (
                <>
                  View My Career Profile
                  <GraduationCap className="h-5 w-5" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-500">
              New to SkillBridge?{" "}
              <button
                type="button"
                onClick={onJoin}
                className="font-bold text-blue-600 hover:text-blue-700"
              >
                Join the platform
              </button>
            </p>
          </form>
        ) : (
          <div className="mt-8">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />

                <div>
                  <h3 className="font-bold text-emerald-900">
                    Welcome back, {student.name}!
                  </h3>

                  <p className="text-sm text-emerald-700">
                    Your SkillBridge profile has been found.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <GraduationCap className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Career Domain
                    </p>

                    <p className="mt-1 font-bold text-[#102a43]">
                      {student.recommended_domain}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Recommended Internship
                    </p>

                    <p className="mt-1 font-bold text-[#102a43]">
                      {student.recommended_internship}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Your Skills
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {student.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Skill Gaps
              </p>

              {student.skill_gaps.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {student.skill_gaps.map((skill) => (
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
                  No skill gaps detected.
                </p>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStudent(null)}
                className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}