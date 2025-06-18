/**
 * @fileoverview Discord bot that moves users from one voice channel to another upon joining.
 * @see https://discord.js.org/#/docs/discord.js/main/general/welcome
 *
 * Setup:
 * 1. Create a Discord bot at https://discord.com/developers/applications
 * 2. Enable "Server Members Intent" in the bot settings
 * 3. Invite the bot with "Move Members" and "Connect" permissions
 * 4. Configure from-to channel pairs in `config.yaml`
 * 5. Run the bot using: `bun run index.ts`
 */

import { Client, GatewayIntentBits, VoiceState } from 'discord.js'
import { readFileSync } from 'fs'
import { config as loadEnv } from 'dotenv'
import { load as loadYaml } from 'js-yaml'

loadEnv()

type RedirectEntry = { from: string; to: string }
const rawConfig = readFileSync('./config.yaml', 'utf8')
const parsedConfig = loadYaml(rawConfig) as { voiceRedirects: RedirectEntry[] }

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
})

client.once('ready', () => {
  console.log(`[INFO] Bot ready: ${client.user?.tag}`)
})

client.on('voiceStateUpdate', async (oldState: VoiceState, newState: VoiceState) => {
  const user = newState.member
  const newChannelId = newState.channelId

  console.log(`[INFO] Voice state update: user=${user?.user.tag ?? 'unknown'}, channelId=${newChannelId}`)

  if (!user || !newChannelId) return

  const match = parsedConfig.voiceRedirects.find(pair => pair.from === newChannelId)
  if (!match) {
    console.log(`[INFO] No redirect match for channelId=${newChannelId}`)
    return
  }

  console.log(`[INFO] Match found: from=${match.from}, to=${match.to}`)

  const destination = newState.guild.channels.cache.get(match.to)

  if (!destination) {
    console.log(`[WARN] Destination channel not found: id=${match.to}`)
    return
  }

  console.log(`[INFO] Destination channel resolved: name=${destination.name}, joinable=${destination.joinable}`)

  if (
    destination.isVoiceBased() &&
    destination.joinable &&
    user.voice.channelId === newChannelId
  ) {
    try {
      await user.voice.setChannel(destination)
      console.log(`[INFO] Moved ${user.user.tag} from ${match.from} to ${match.to}`)
    } catch (error) {
      console.error(`[ERROR] Failed to move ${user.user.tag}:`, error)
    }
  } else {
    console.log(`[INFO] Skipped move: channel not joinable or already moved`)
  }
})

client.login(process.env.BOT_TOKEN)
