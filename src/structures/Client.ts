import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandType } from "../types/Command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandOptions } from "../types/Client";
import { Event } from "./Event";

const globPromise = promisify(glob);
export class BotClient extends Client {
  commands: Collection<string, CommandType> = new Collection();

  constructor() {
    super({ intents: 32767 });
  }

  start() {
    console.log("Bot is starting...");
    this.registerModules();
    this.login(process.env.botToken);
    console.log("Bot is ready!");
  }

  async importFile(filePath: string) {
    const file = await import(filePath);
    return file.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandOptions) {
    if (guildId) {
      const guild = this.guilds.cache.get(guildId);
      if (guild) {
        await guild.commands.set(commands);
        console.log(
          `Successfully registered application commands to ${guildId}`
        );
      } else {
        this.application?.commands.set(commands);
        console.log(`Successfully registered application commands to global`);
      }
    }
  }

  async registerModules() {
    //register commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*{.ts,.js}`
    );
    console.log({ commandFiles });
    for (const filePath of commandFiles) {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) continue;

      this.commands.set(command.name, command);
      slashCommands.push(command);
    }

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.guildId,
      });
    });

    //events handler
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    for (const filePath of eventFiles) {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    }
  }
}
