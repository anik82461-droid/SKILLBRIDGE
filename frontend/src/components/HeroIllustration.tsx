import { ArrowUpRight, BriefcaseBusiness, Check, GraduationCap, Sparkles, UsersRound } from "lucide-react";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[530px] sm:h-[490px]" aria-label="A connected ecosystem of students, academia and industry">
      <div className="absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-teal-200/80 sm:h-[350px] sm:w-[350px]" />
      <div className="absolute left-1/2 top-1/2 h-[188px] w-[188px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-200/80 sm:h-[228px] sm:w-[228px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 530 490" fill="none" aria-hidden="true">
        <path d="M265 244 C207 197 171 153 153 104" stroke="#9ed9d1" strokeDasharray="5 8" strokeWidth="2" />
        <path d="M265 244 C318 193 358 158 394 110" stroke="#9ed9d1" strokeDasharray="5 8" strokeWidth="2" />
        <path d="M265 244 C331 285 359 328 379 375" stroke="#9ed9d1" strokeDasharray="5 8" strokeWidth="2" />
        <circle cx="265" cy="244" r="7" fill="#f2a65a" />
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2.25rem] bg-[#102a43] text-center text-white shadow-float sm:h-[176px] sm:w-[176px]">
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-400/20 text-teal-200">
          <Sparkles size={22} />
        </div>
        <span className="font-display text-base font-bold sm:text-lg">SkillBridge</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-300">One connected future</span>
      </div>
      <div className="absolute left-[3%] top-[8%] flex w-[165px] items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-soft backdrop-blur sm:left-[7%] sm:top-[12%]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600"><GraduationCap size={21} /></div>
        <div><p className="text-xs font-bold text-[#102a43]">Students</p><p className="text-[10px] text-slate-500">Ready to grow</p></div>
        <Check className="ml-auto text-teal-600" size={15} strokeWidth={3} />
      </div>
      <div className="absolute right-[1%] top-[11%] flex w-[170px] items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-soft backdrop-blur sm:right-[6%] sm:top-[15%]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700"><BriefcaseBusiness size={19} /></div>
        <div><p className="text-xs font-bold text-[#102a43]">Industry</p><p className="text-[10px] text-slate-500">Hiring smarter</p></div>
        <ArrowUpRight className="ml-auto text-orange-500" size={16} strokeWidth={2.5} />
      </div>
      <div className="absolute bottom-[8%] right-[9%] flex w-[174px] items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-soft backdrop-blur sm:bottom-[11%] sm:right-[14%]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"><UsersRound size={19} /></div>
        <div><p className="text-xs font-bold text-[#102a43]">Academia</p><p className="text-[10px] text-slate-500">Aligned for impact</p></div>
        <Check className="ml-auto text-teal-600" size={15} strokeWidth={3} />
      </div>
      <div className="absolute bottom-[7%] left-[5%] rounded-2xl border border-teal-100 bg-white/80 px-3 py-2 shadow-soft backdrop-blur sm:bottom-[13%] sm:left-[10%]">
        <p className="text-[10px] font-semibold text-slate-500">Connection strength</p>
        <div className="mt-1 flex items-center gap-1.5"><span className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"><span className="block h-full w-[88%] rounded-full bg-teal-500" /></span><span className="text-xs font-bold text-teal-700">88%</span></div>
      </div>
    </div>
  );
}