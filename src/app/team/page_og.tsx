"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Page() {
  const { team, isLoading, isError } = { team: [], isLoading: false, isError: null };
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  if (isLoading) return <div className="p-6 text-center">Loading...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load team members.
      </div>
    );
  if (!team || team.length === 0)
    return <div className="p-6 text-center">No team members found.</div>;

  // Group by year and chapter
  type Member = (typeof team)[0];
  type TeamsByYear = {
    [year: string]: {
      [chapter: string]: Member[];
    };
  };

  const designationOrder: Record<string, number> = {
    organizer: 1,
    lead: 2,
    coLead: 3,
    member: 4,
  };
  const grouped: TeamsByYear = {};

  // Sort and group
  [...team]
    .sort(
      (a, b) =>
        (designationOrder[a.designation] || 99) -
        (designationOrder[b.designation] || 99)
    )
    .forEach((member: Member) => {
      const year = member.joinedgdgusar || member.startYear || "Unknown";
      const chapter = member.chapterName || "LEADS";
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][chapter]) grouped[year][chapter] = [];
      grouped[year][chapter].push(member);
    });

  const years = Object.keys(grouped).sort();
  const activeYear = years[activeYearIndex];
  const activeChapters = grouped[activeYear];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-200">
        GDG USAR Team
      </h1>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => setActiveYearIndex((prev) => Math.max(0, prev - 1))}
          disabled={activeYearIndex === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 group hover:border-purple-400 border-2"
        >
          <div className="flex items-center transition-transform duration-200 group-hover:-translate-x-1">
            <ArrowLeft className="text-white" />
            <span className="ml-2 ">Previous</span>
          </div>
        </button>
        <span className="text-xl font-semibold text-gray-300">
          {activeYear}
        </span>
        <button
          onClick={() =>
            setActiveYearIndex((prev) => Math.min(years.length - 1, prev + 1))
          }
          disabled={activeYearIndex === years.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50 group hover:border-purple-400 border-2"
        >
          <div className="flex items-center transition-transform duration-200 group-hover:translate-x-1">
            <span className="mr-2 ">Next</span>
            <ArrowRight className="text-white" />
          </div>
        </button>
      </div>
      {/* Display Team Members for the Active Year */}
      {Object.entries(activeChapters).map(([chapter, members]) => (
        <div key={chapter} className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">
            {chapter} Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members?.map((member) => (
              <div
                key={member.$id || member.name}
                className={clsx(
                  "relative flex flex-col items-center justify-center p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-lg",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_40px_10px_rgba(168,85,247,0.4)] hover:border-purple-400 hover:scale-105"
                )}
                style={{ boxShadow: "0 0 40px 10px rgba(168,85,247,0.2)" }}
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-white/30 shadow-lg mb-4  hover:scale-110 transition-transform duration-300"
                  />
                  <h3 className="text-2xl font-bold text-white text-center mb-1 drop-shadow-lg">
                    {member.name}
                  </h3>
                  <p className="text-lg text-purple-200 text-center mb-4 font-medium drop-shadow">
                    {member.designation}
                  </p>

                  {/* Social icons */}
                  <div className="flex justify-center gap-4">
                    {member.linkedin && (
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin
                          size={36}
                          className="hover:text-sky-400 transition-transform duration-300 hover:scale-110"
                        />
                      </Link>
                    )}
                    {member.github && (
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub
                          size={36}
                          className="hover:text-slate-200 transition-transform duration-300 hover:scale-110"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
