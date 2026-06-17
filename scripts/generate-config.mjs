import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const defaults = {
  snowflakeColor: '#ffffff',
  snowflakeDuration: 12,
  snowflakeSize: '1.5rem',
  balloonColor: '#ff4d69',
  balloonDuration: 10,
  balloonSpacing: 800
};

const config = {
  snowflakeColor: process.env.SNOW_COLOR ?? defaults.snowflakeColor,
  snowflakeDuration: Number(process.env.SNOW_DURATION ?? defaults.snowflakeDuration),
  snowflakeSize: process.env.SNOW_SIZE ?? defaults.snowflakeSize,
  balloonColor: process.env.BALLOON_COLOR ?? defaults.balloonColor,
  balloonDuration: Number(process.env.BALLOON_DURATION ?? defaults.balloonDuration),
  balloonSpacing: Number(process.env.BALLOON_SPACING ?? defaults.balloonSpacing)
};

const outputPath = resolve('public', 'config.json');
await writeFile(outputPath, JSON.stringify(config, null, 2), 'utf-8');
console.log(`Generated config at ${outputPath}`);
