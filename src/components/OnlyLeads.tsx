import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);

  return (
    <div className="container mx-auto py-8 justify-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white">Our Team</h1>
      {teamMembers.length === 0 ? (
        <p className="mt-4 text-gray-300">No core team members found yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="rounded-lg shadow-lg p-6 text-center"
              style={{
                transform: `translateY(${index % 3 === 0 ? "0" : index % 3 === 1 ? "40px" : "40px"})`,
              }}
            >
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-half"
              />
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              <p className="text-lg text-gray-200">{member.designation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
