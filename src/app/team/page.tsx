import { TeamCard } from "@/components/team-section/team-card";
import { Member } from "@/utils/types";
import { getTeamMembersServer } from "@/hooks/useTeamMembers";



export default async function TeamPage() {
  // Call server helper and use destructuring similar to the client hook
  const { data, loading, error } = await getTeamMembersServer();

  // Render using names the client hook uses: data, loading, error
  if (loading) return (
    <section>
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-24 md:pb-16">
        <div className="text-center">Loading team…</div>
      </div>
    </section>
  );

  if (error) return (
    <section>
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-24 md:pb-16">
        <div className="text-center text-red-500">Error loading team: {error}</div>
      </div>
    </section>
  );

  if (!data || data.length === 0) return (
    <section>
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-24 md:pb-16">
        <div className="text-center">No team members found.</div>
      </div>
    </section>
  );

  return (
    <section>
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-24 md:pb-16 h-screen">
        <div className="text-black text-center">
          <h3 className="font-semibold text-3xl lg:text-6xl">Our Team</h3>
        </div>

        <div className="flex flex-wrap place-items-center justify-center gap-12 mt-12 pb-12 md:gap-14 md:mt-16 md:pb-12">
          {data.map((member: Member, index: number) => {
            const name = member.name || member.fullName || "Unnamed";
            const role = member.designation || member.role || "Member";
            const image = member.imageUrl || member.image || "/assets/images/event-placeholder-small.webp";
            const link = member.linkedin || member.github || member.link || "#";

            return (
              <TeamCard
                key={member.$id || name}
                name={name}
                role={role}
                image={image}
                link={link}
                color={["red-300", "blue-300", "green-300", "yellow-300"][index % 4]}
                priority={index === 0}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
