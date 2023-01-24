import { Command } from "../structures/Command";

export default new Command({
  name: "sofabot",
  description: "Say Hi",
  run: async ({ interaction }) => {
    await interaction.followUp(
        "\"A wild SoFa bot appeared!\"\n\nHi, my name is Sofabot - I'm a bot created by a member of the Software Factory community. I'm here to help you with your onboarding and to help you find the right resources to learn more about coding. If you have any questions, feel free to ask me! You can find the list of commands by typing /help'\n\n\"SoFa bot disappeared!\" ");
  },
});

// import { Command } from "../../structures/Command";
//
// export default new Command({
//     name: "hi!",
//     description: "say hi",
//     run: async ({ interaction }) => {
//         await interaction.followUp("A wile SoFa bot appeared!")
//     }
// });
