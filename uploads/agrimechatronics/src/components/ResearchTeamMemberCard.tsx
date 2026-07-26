import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowLeft, GraduationCap, Award, Calendar, Layers } from "lucide-react";

export default function ResearchTeamMemberCard({ member }: {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    education?: string;
    keyFocus?: string;
    joined?: string;
    projects?: string[];
  };
  key?: any;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    // Prevent event propagation if nested, but it looks clean of any side effects
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-[480px] relative font-body select-none">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full relative cursor-pointer"
        onClick={handleFlip}
      >
        {/* ==================== FRONT OF CARD ==================== */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 w-full h-full rounded-[2.25rem] overflow-hidden border border-white/10 shadow-lg bg-black/60 flex flex-col justify-end"
        >
          {/* Full-bleed Portrait image */}
          <img
            src={member.image}
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 hover:scale-103"
          />

          {/* Gradient bottom overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

          {/* Liquid glass text overlay sitting nicely at the bottom of the card */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-xl border border-white/15 rounded-[1.75rem] p-5 pt-6 text-left shadow-2xl z-20">
            
            {/* Curved action arrow in top right - triggers the flip */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="absolute -top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
              title="Flip to View Bio Details"
            >
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </div>

            {/* Member Details */}
            <h4 className="font-heading italic text-2xl text-white tracking-wide leading-tight mb-0.5">
              {member.name}
            </h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#a855f7] mb-3">
              {member.role}
            </p>
            <p className="text-xs text-white/80 font-light leading-relaxed mb-4 line-clamp-3">
              {member.bio}
            </p>

            {/* Micro Social Circle Tag buttons */}
            <div className="flex items-center gap-2 pt-1.5 border-t border-white/5">
              <span
                className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-400 text-white/70 hover:text-white flex items-center justify-center transition-all text-[11px] font-bold cursor-pointer font-mono"
                title="LinkedIn"
              >
                in
              </span>
              <span
                className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-400 text-white/70 hover:text-white flex items-center justify-center transition-all text-[11px] font-bold cursor-pointer font-mono"
                title="ResearchGate"
              >
                rg
              </span>
              <span
                className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600 hover:border-purple-400 text-white/70 hover:text-white flex items-center justify-center transition-all text-[11px] font-bold cursor-pointer font-mono"
                title="Scholar"
              >
                sc
              </span>
            </div>

          </div>
        </div>

        {/* ==================== BACK OF CARD ==================== */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 w-full h-full rounded-[2.25rem] border border-white/15 bg-gradient-to-br from-[#12081c]/90 via-[#0a0510]/95 to-black/90 backdrop-blur-2xl p-6 text-left flex flex-col justify-between overflow-hidden shadow-2xl"
        >
          {/* Faint ambient purple background glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#a855f7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#a855f7]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Back top bar */}
          <div className="flex justify-between items-start z-10">
            <div>
              <h4 className="font-heading italic text-xl text-white tracking-wide leading-tight mb-0.5">
                {member.name}
              </h4>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#a855f7]">
                {member.role}
              </p>
            </div>

            {/* Back button flip to front */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/85 flex items-center justify-center hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              title="Return to Front"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
            </div>
          </div>

          {/* Quick detailed profile sections */}
          <div className="flex-1 my-5 overflow-y-auto space-y-4.5 pr-1.5 scrollbar-thin scrollbar-white/5 z-10 text-left">
            <p className="text-[11px] text-white/70 font-light leading-relaxed">
              {member.bio}
            </p>

            {/* Academic Credential */}
            {member.education && (
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <GraduationCap size={12} className="text-[#a855f7]" /> Education
                </span>
                <p className="text-xs text-white/95 font-medium pl-4.5">
                  {member.education}
                </p>
              </div>
            )}

            {/* Key Focus Area */}
            {member.keyFocus && (
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <Award size={12} className="text-[#a855f7]" /> Research Specialty
                </span>
                <p className="text-xs text-white/90 pl-4.5 line-clamp-2">
                  {member.keyFocus}
                </p>
              </div>
            )}

            {/* Date Joined */}
            {member.joined && (
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <Calendar size={11} className="text-[#a855f7]" /> Lab Appointment
                </span>
                <p className="text-xs text-white/95 pl-4.5">
                  Joined {member.joined}
                </p>
              </div>
            )}

            {/* Core projects list */}
            {member.projects && member.projects.length > 0 && (
              <div className="space-y-1.5">
                <span className="flex items-center gap-1.5 text-[9px] text-white/40 uppercase tracking-wider font-mono">
                  <Layers size={11} className="text-[#a855f7]" /> Active Projects
                </span>
                <div className="flex flex-wrap gap-1.5 pl-4.5">
                  {member.projects.map((proj, pIdx) => (
                    <span
                      key={pIdx}
                      className="text-[9px] text-purple-200/90 bg-purple-500/10 border border-purple-500/20 rounded-md px-2 py-0.5"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social footer at exact bottom */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-left z-10">
            <span className="text-[10px] text-white/30 font-mono">LAB INTERNAL STAFF</span>
            <div className="flex gap-2 text-xs">
              <span className="text-white hover:text-[#a855f7] cursor-pointer transition-colors">LinkedIn</span>
              <span className="text-white/40">•</span>
              <span className="text-white hover:text-[#a855f7] cursor-pointer transition-colors">Scholar</span>
            </div>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
}
