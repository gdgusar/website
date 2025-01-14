export default {
    name: "teamMember",
    title: "Team Member",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
      },
      {
        name: "designation",
        title: "Designation",
        type: "string", // e.g., Lead, Co-Lead, Member
      },
      {
        name: "branch",
        title: "Branch",
        type: "string", // e.g., CSE 2024
      },
      {
        name: "year",
        title: "Year",
        type: "number", // e.g., 2024
      },
      {
        name: "team",
        title: "Team",
        type: "string", // e.g., USS or USDI
      },
      // {
      //   name: "appwriteImageUrl",
      //   title: "Appwrite Image URL",
      //   type: "url",
      // },
    ],
  };
  