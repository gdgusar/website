import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import client from '../../utils/sanityClient';
import { urlFor } from '../../utils/sanityClient';

const OurTeam = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        client
            .fetch(
                `*[_type == "teamMember" && (designation == "lead" || designation == "coLead" || designation == "organizer")]{
                    _id,
                    name,
                    "imageUrl": image.asset->url,
                    designation,
                    "orderValue": select(
                        designation == "organizer" => 3,
                        designation == "lead" => 2,
                        designation == "coLead" => 1
                    )
                } | order(orderValue desc)`
            )
            .then((data) => setTeamMembers(data))
            .catch(console.error);
    }, []);

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <div key={member._id} className="shadow-md rounded-lg overflow-hidden">
                        <div className="relative w-full h-48 overflow-hidden">
                            <Image
                                src={urlFor(member.imageUrl).url()}
                                alt={member.name}
                                fill
                                className="object-cover"
                            />
                            <Image
                                src="/assets/svgs/frame.svg"
                                alt="frame"
                                fill
                                className="absolute inset-0"
                            />
                        </div>
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                            <p className="text-gray-600">{member.designation}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OurTeam;