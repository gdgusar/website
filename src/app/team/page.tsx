import { TeamCard } from "@/components/team-section/team-card"; 
import { teamMembers } from "../../../public/team/sim_data";

const TeamPage = () => {
  const colors = ["blue-300", "red-300", "green-300", "yellow-300"];

  return (
    <section>
      <div className="max-w-4xl lg:max-w-6xl mx-auto pt-24 md:pb-16">
        <div className="text-black text-center">
          <h3 className="font-semibold text-3xl lg:text-6xl">Our Team</h3>
        </div>
        <div className="flex flex-wrap place-items-center justify-center gap-12 mt-12 pb-12 md:gap-14 md:mt-16 md:pb-12">
          {teamMembers.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              link={member.link}
              color={colors[index % colors.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPage;
