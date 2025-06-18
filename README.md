# Voice Redirect Discord Bot

Moves users from one voice channel to another automatically based on YAML config rules.

https://github.com/user-attachments/assets/5706decc-c12b-47a2-8186-86a2f8e725c7


## Setup

1. **Install [Bun](https://bun.sh/)**

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
      - from: 'VOICE_CHANNEL_ID_A'
        to: 'VOICE_CHANNEL_ID_B'
      - from: 'VOICE_CHANNEL_ID_C'
        to: 'VOICE_CHANNEL_ID_D'
    ```

5. **Start bot:**
    ```sh
    bun run index.ts
    ```

## Permissions

- Move Members 
- Enable "Server Members Intent" in bot settings

## License

[MIT](./LICENSE)
