const configUrl = new URL('../config.json', import.meta.url);
const animationArea = document.getElementById('animation-area');
const snowButton = document.getElementById('btn-snow');
const balloonButton = document.getElementById('btn-balloons');
const root = document.documentElement;

const defaultConfig = {
  snowflakeColor: '#ffffff',
  snowflakeDuration: 12,
  snowflakeSize: '1.5rem',
  balloonColor: '#ff4d69',
  balloonDuration: 10,
  balloonSpacing: 800
};

let activeEffect = 'none';
let snowflakeTimer = null;
let balloonTimer = null;
let effectElements = new Set();

const statusAnnouncement = document.createElement('p');
statusAnnouncement.className = 'placeholder';
statusAnnouncement.innerText = 'Choose an effect to begin the animation.';

const announceStatus = (message) => {
  animationArea.setAttribute('aria-label', message);
  statusAnnouncement.innerText = message;
};

const clearAnimationArea = () => {
  effectElements.forEach((el) => el.remove());
  effectElements.clear();
};

const applyConfig = (config) => {
  root.style.setProperty('--snowflake-color', config.snowflakeColor);
  root.style.setProperty('--snowflake-dur', `${config.snowflakeDuration}s`);
  root.style.setProperty('--snowflake-size', config.snowflakeSize);
  root.style.setProperty('--balloon-color', config.balloonColor);
  root.style.setProperty('--balloon-duration', `${config.balloonDuration}s`);
  root.style.setProperty('--balloon-spacing', `${config.balloonSpacing}ms`);
};

const createSnowflake = (config) => {
  const snowflake = document.createElement('span');
  snowflake.className = 'snowflake';
  snowflake.innerText = '❄';
  const horizontalPosition = Math.random() * 100;
  snowflake.style.left = `${horizontalPosition}%`;
  snowflake.style.animationDuration = `${config.snowflakeDuration + Math.random() * 2}s`;
  snowflake.style.fontSize = config.snowflakeSize;
  snowflake.style.opacity = `${0.5 + Math.random() * 0.5}`;
  animationArea.appendChild(snowflake);
  effectElements.add(snowflake);
  setTimeout(() => {
    effectElements.delete(snowflake);
    snowflake.remove();
  }, (config.snowflakeDuration + 2) * 1000);
};

const startSnowflakes = (config) => {
  stopBalloons();
  clearAnimationArea();
  animationArea.appendChild(statusAnnouncement);
  activeEffect = 'snow';
  announceStatus('Snowflakes are falling.');
  snowButton.classList.add('active');
  balloonButton.classList.remove('active');
  snowflakeTimer = setInterval(() => createSnowflake(config), 250);
};

const createBalloon = (config) => {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const horizontalPosition = 10 + Math.random() * 80;
  balloon.style.left = `${horizontalPosition}%`;
  balloon.style.animationDuration = `${config.balloonDuration + Math.random() * 3}s`;
  balloon.style.background = config.balloonColor;
  balloon.style.setProperty('--balloon-color', config.balloonColor);
  animationArea.appendChild(balloon);
  effectElements.add(balloon);
  setTimeout(() => {
    effectElements.delete(balloon);
    balloon.remove();
  }, (config.balloonDuration + 3) * 1000);
};

const startBalloons = (config) => {
  stopSnowflakes();
  clearAnimationArea();
  animationArea.appendChild(statusAnnouncement);
  activeEffect = 'balloon';
  announceStatus('Balloons are floating upward.');
  balloonButton.classList.add('active');
  snowButton.classList.remove('active');
  createBalloon(config);
  balloonTimer = setInterval(() => createBalloon(config), config.balloonSpacing);
};

const stopSnowflakes = () => {
  if (snowflakeTimer) {
    clearInterval(snowflakeTimer);
    snowflakeTimer = null;
  }
};

const stopBalloons = () => {
  if (balloonTimer) {
    clearInterval(balloonTimer);
    balloonTimer = null;
  }
};

const stopAllEffects = () => {
  stopSnowflakes();
  stopBalloons();
  clearAnimationArea();
  animationArea.appendChild(statusAnnouncement);
  announceStatus('Choose an effect to begin the animation.');
  activeEffect = 'none';
  snowButton.classList.remove('active');
  balloonButton.classList.remove('active');
};

const handleSnowClick = (config) => () => {
  if (activeEffect === 'snow') return;
  startSnowflakes(config);
};

const handleBalloonClick = (config) => () => {
  if (activeEffect === 'balloon') return;
  startBalloons(config);
};

const init = async () => {
  animationArea.appendChild(statusAnnouncement);
  try {
    const response = await fetch(configUrl);
    const config = await response.json();
    const mergedConfig = { ...defaultConfig, ...config };
    applyConfig(mergedConfig);
    snowButton.addEventListener('click', handleSnowClick(mergedConfig));
    balloonButton.addEventListener('click', handleBalloonClick(mergedConfig));
  } catch (error) {
    console.error('Failed to load configuration:', error);
    const mergedConfig = { ...defaultConfig };
    applyConfig(mergedConfig);
    snowButton.addEventListener('click', handleSnowClick(mergedConfig));
    balloonButton.addEventListener('click', handleBalloonClick(mergedConfig));
  }
};

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    stopAllEffects();
  }
});