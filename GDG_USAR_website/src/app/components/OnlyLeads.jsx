import React, { useEffect, useState } from "react";
import Image from "next/image";
import client from "../../utils/sanityClient";
import { useRouter } from "next/navigation";

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
    const router = useRouter(); // Added useRouter

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                    <div 
                        key={index} 
                        className="rounded-lg shadow-lg p-6 text-center"
                        style={{ 
                            transform: `translateY(${index % 3 === 0 ? '0' : '40px'})`
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
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => router.push("/team")} // Added redirection
            >
                Meet the Team
            </button>
        </div>
    );
}
