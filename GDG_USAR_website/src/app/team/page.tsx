'use client';

import React, { useState, useEffect } from 'react';
import client from '../../utils/sanityClient';
import { AnimatePresence, motion } from 'framer-motion';

const Page = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const query = `
      *[_type == "teamMember"] {
        name,
        "imageUrl": image.asset->url,
        designation,
        team
      }`;
      const data = await client.fetch(query);
      setTeamMembers(data);
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl text-white font-bold text-center mb-8">Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {teamMembers.map((member) => (
            <motion.div 
              key={member._id} 
              className="rounded-lg shadow-lg p-6 text-center bg-gray-800"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
            >
              <img src={member.imageUrl} alt={member.name} className="w-24 h-24 rounded-full mb-4" />
              <h2 className="text-2xl font-bold text-white">{member.name}</h2>
              <p className="text-lg text-white">{member.designation}</p>
              <p className="text-sm text-white">{member.team}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;