import { BotClient} from "./structures/Client";

require("dotenv").config();

export const client = new BotClient();

client.start();