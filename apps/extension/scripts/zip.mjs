/* global process */
import AdmZip from 'adm-zip';
import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.development' });

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL; // eslint-disable-line
const DIST_DIR = path.resolve('dist');
const OUT_DIR = path.resolve('out');
const ZIP_NAME = 'pinback-ext-dev.zip';
const ZIP_PATH = path.join(OUT_DIR, ZIP_NAME);

const getTimestamp = () =>
  new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

const createTemplate = (type, details) => {
  const { time, fileName, error } = details;
  const divider = '━━━━━━━━━━━━━━━━━━━━';

  if (type === 'success') {
    return `📦 **Pinback 확장 프로그램 빌드 완료**\n${divider}\n **빌드 시간:** ${time}\n **파일명:** \`${fileName}\`\n\n 최신 빌드 파일이 도착했습니다. 압축을 풀고 사용하세요!`;
  }
  return `🚨 **Pinback 빌드 공유 실패**\n${divider}\n❌ **에러 내용:** ${error}\n🕒 **발생 시간:** ${time}\n⚠️ 터미널 로그를 확인해 주세요.`;
};

const archiveDist = () => {
  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('dist 폴더가 존재하지 않습니다. 빌드를 먼저 실행해주세요.');
  }

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  if (fs.existsSync(ZIP_PATH)) fs.unlinkSync(ZIP_PATH);

  const zip = new AdmZip();
  zip.addLocalFolder(DIST_DIR);
  zip.writeZip(ZIP_PATH);

  console.log(`✅ 압축 완료: ${ZIP_PATH}`);
};

const uploadToDiscord = async (content, fileStream = null) => {
  if (!WEBHOOK_URL)
    throw new Error('DISCORD_WEBHOOK_URL이 설정되지 않았습니다.');

  const form = new FormData();
  form.append('content', content);
  if (fileStream) form.append('file', fileStream);

  await axios.post(WEBHOOK_URL, form, { headers: form.getHeaders() });
};

async function run() {
  try {
    console.log('📦 dist 폴더를 압축하는 중...');
    archiveDist();

    console.log('📤 디스코드로 전송 중...');
    const message = createTemplate('success', {
      time: getTimestamp(),
      fileName: ZIP_NAME,
    });
    await uploadToDiscord(message, fs.createReadStream(ZIP_PATH));

    console.log('✅ 모든 작업 성공!');
  } catch (err) {
    const isPayloadTooLarge = err.response?.status === 413;
    const errorMsg = isPayloadTooLarge
      ? '파일 용량이 너무 큽니다 (25MB 제한).'
      : err.message;

    const failMessage = createTemplate('fail', {
      time: getTimestamp(),
      error: errorMsg,
    });

    await uploadToDiscord(failMessage).catch((e) =>
      console.error('❌ 에러 알림 전송 실패:', e.message)
    );

    console.error('❌ 작업 실패:', errorMsg);
    process.exitCode = 1;
  }
}

run();
