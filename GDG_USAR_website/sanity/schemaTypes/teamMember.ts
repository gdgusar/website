export default {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((name) => {
          const nameParts = name.split(" ");
          const capitalizedParts = nameParts.map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          );
          const capitalized = capitalizedParts.join(" ");
          return capitalized === name ? true : "Please capitalize the first letter of each name part.";
        }),
    },
    {
      name: "designation",
      title: "Designation",
      type: "string",
      options: {
        list: [
          { title: "Organizer", value: "organizer" },
          { title: "Lead", value: "lead" },
          { title: "Co-Lead", value: "coLead" },
          { title: "Member", value: "member" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name:"joinedgdgusar",
      title:"YEAR IN WHICH GDG MEMBER JOINED",
      type:"string",
    },
    {
      name: "branch",
      title: "Branch",
      type: "string",
      options: {
        list: [
          { title: "IIoT", value: "iiot" },
          { title: "AIML", value: "aiml" },
          { title: "AI-DS", value: "ai-ds" },
          { title: "AR", value: "ar" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startYear",
      title: "Start Year",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(2000)
          .max(2099)
          .custom((startYear, context) => {
            if (startYear) {
              const endYear = startYear + 4;
              context.document.endYear = endYear;
            }
            return true;
          }),
    },
    {
      name: "endYear",
      title: "End Year",
      type: "number",
      readOnly: true,
      description: "This is calculated based on the Start Year (4-year degree).",
    },
    {
      name: "chapterName",
      title: "Chapter Name",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "webdev" },
          { title: "Data Structures & Algorithms", value: "dsa" },
          { title: "Artificial Intelligence & Machine Learning", value: "aiml" },
          { title: "Cyber Security", value: "cybersec" },
          { title: "Marketing", value: "marketing" },
          { title: "Event Management", value: "eventManagement" },
          { title: "Design Team", value: "designTeam" },
        ],
      },
      hidden: ({ document }) => 
        document.designation === "lead" || document.designation === "organizer",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
    },
    {
      name: "github",
      title: "GitHub",
      type: "url",
    },
  ],
};