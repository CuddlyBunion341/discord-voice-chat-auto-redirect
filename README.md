# Voice Redirect Discord Bot

Moves users from one voice channel to another automatically based on YAML config rules.

## Setup

1. **Install Bun**

2. **Run:**
    ```sh
    bun install
    ```

3. **Add `.env`:**
    ```
    BOT_TOKEN=your_discord_bot_token
    ```

4. **Edit `config.yaml` with voice channel ID pairs:**
    ```yaml
    voiceRedirects:
      from: 'CHANNEL_ID_A'
      to: 'CHANNEL_ID_B'
    ```

5. **Start bot:**
    ```sh
    bun run index.ts
    ```

## Permissions

- Move Members  
- Connect  
- View Channels  
- Enable "Server Members Intent" in bot settings

## License

MIT
