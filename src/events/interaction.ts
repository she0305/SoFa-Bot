import { Event } from "../structures/Event";
import { client } from "../App";
import { CommandInteractionOptionResolver } from "discord.js";
import {ExtendedInteraction} from "../types/Command";
export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply();
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.followUp("Sorry I haven't learned this command yet!");

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    });
  }
});
