import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import client from '../../utils/sanityClient';

async function fetchOurTeam() {
    const query = `
    *[_type == "teamMember" && (designation == "lead" || designation == "coLead" || designation == "organizer")] {
        name,
        "imageUrl": image.asset->url,
        designation,
        "orderValue": select(
            designation == "organizer" => 3,
            designation == "lead" => 2,
            designation == "coLead" => 1
        )
    } | order(orderValue desc)`;
    
    const data = await client.fetch(query);
    return data;
}

export default function OurTeam() {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        async function getData() {
            const data = await fetchOurTeam();
            setTeamMembers(data);
        }
        getData();
    }, []);

    return (
        <div className="container mx-auto py-8 justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Our Team</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                    <div 
                        key={index} 
                        className="rounded-lg shadow-lg p-6 text-center"
                        style={{ 
                            transform: `translateY(${index % 3 === 0 ? '0' : index % 3 === 1 ? '35px' : '40px'})`
                        }}
                    >
                        <Image 
                            src={member.imageUrl} 
                            alt={member.name} 
                            width={150} 
                            height={150} 
                            className="rounded-full" 
                        />
                        <h2 className="text-2xl font-bold text-white">{member.name}</h2>
                        <p className="text-lg text-gray-200">{member.designation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
