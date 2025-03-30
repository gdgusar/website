"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../utils/sanityClient";

export default function Page() {
  const [teamsByYear, setTeamsByYear] = useState({});
  const [years, setYears] = useState([]);
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  useEffect(() => {
    async function fetchTeam() {
      const query = `
        *[_type == "teamMember"] | order(joinedgdgusar asc, startYear asc) {
          name,
          designation,
          branch,
          chapterName,
          startYear,
          endYear,
          joinedgdgusar,
          "imageUrl": image.asset->url,
          linkedin,
          github
        }
      `;

      const data = await client.fetch(query);

      // Sorting by role: Organizer > Lead > CoLead > Member
      const designationOrder = { organizer: 1, lead: 2, coLead: 3, member: 4 };
      data.sort(
        (a, b) =>
          (designationOrder[a.designation] || 99) -
          (designationOrder[b.designation] || 99)
      );

      // Grouping members by YEAR -> CHAPTER
      const grouped = data.reduce((acc, member) => {
        const year = member.joinedgdgusar || member.startYear;
        const chapter = member.chapterName || "LEADS";
        if (!acc[year]) acc[year] = {};
        if (!acc[year][chapter]) acc[year][chapter] = [];
        acc[year][chapter].push(member);
        return acc;
      }, {});

      const sortedYears = Object.keys(grouped).sort();

      setTeamsByYear(grouped);
      setYears(sortedYears);
    }

    fetchTeam();
  }, []);

  if (years.length === 0) return <div className="p-6 text-center">Loading...</div>;

  const activeYear = years[activeYearIndex];
  const activeChapters = teamsByYear[activeYear];

  return (
    // MODIFY CODE FROM HERE TO ADD PAGINATION CONTROLS for YEAR WISE AND OTHER UI STUFF TO DISPLAY TEAM MEMBERS
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">GDG USAR Team</h1>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => setActiveYearIndex((prev) => Math.max(0, prev - 1))}
          disabled={activeYearIndex === 0}
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-xl font-semibold">{activeYear}</span>
        <button
          onClick={() => setActiveYearIndex((prev) => Math.min(years.length - 1, prev + 1))}
          disabled={activeYearIndex === years.length - 1}
          className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
        >
          Next →
        </button>
      </div>

      {/* Display Team Members for the Active Year */}
      {Object.entries(activeChapters).map(([chapter, members]) => (
        <div key={chapter} className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-blue-600">{chapter} Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.name} className="p-4 border rounded-lg shadow-md bg-white">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-lg font-bold text-center mt-2">{member.name}</h3>
                <p className="text-center font-medium text-gray-700">{member.designation}</p>
                <p className="text-center text-gray-500">{member.branch}</p>
                <p className="text-center">
                  Start Year: {member.startYear} - End Year: {member.endYear}
                </p>
                <div className="flex justify-center gap-4 mt-2">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <img src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer">
                      <img src="/github.svg" alt="GitHub" width={24} height={24} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}