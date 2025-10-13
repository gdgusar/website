import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { FaLinkedin } from 'react-icons/fa';
import { getTeamMembersServer } from '@/hooks/useTeamMembers';

export default async function TeamList() {
  const { data: team, loading, error } = await getTeamMembersServer();

  if (loading) {
    return <div>Loading team members...</div>;
  }

  if (error) {
    return <div>Failed to load team members.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px' , paddingBottom:'48px', justifyContent: 'center' }}>
      {team && team.map((member: any) => (
        <Card key={member.$id} className="w-full max-w-[240px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,241,0.5)] hover:scale-105 bg-white/5 border border-white/10 backdrop-blur-lg rounded-3xl p-4 group">
          <CardContent className="flex flex-col items-center text-center relative">
            <div className="relative mb-4">
              {member.imageUrl && (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={160}
                  height={160}
                  style={{ borderRadius: '50%' }}
                  className="transition-all duration-300 group-hover:blur-sm"
                />
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FaLinkedin className="text-white text-2xl w-16 h-16" />
                </a>
              )}
            </div>
            <h3 className='text-2xl font-semibold text-gray-200 mb-1'>{member.name}</h3>
            <p className='text-gray-400'>{member.designation}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
