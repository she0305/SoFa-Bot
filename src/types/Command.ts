import { BotClient } from "../structures/Client";
import {
  CommandInteraction,
  CommandInteractionOptionResolver,
  ChatInputApplicationCommandData,
  PermissionResolvable, GuildMember,
} from "discord.js";

/**
 * Command Structure
 * name: command name
 * description: command description
 * args: async({interaction}) => {}
 * **/

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember
}
interface RunOptions {
  client: BotClient;
  interaction: CommandInteraction;
  args: CommandInteractionOptionResolver;
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
  userPermissions?: PermissionResolvable[];
  run: RunFunction;
} & ChatInputApplicationCommandData
