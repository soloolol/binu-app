import fs from "fs-extra";
import { fileURLToPath } from "url";
import path from "path";

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 경로 설정
const src = path.resolve(__dirname, "../../../packages/assets/");
const dest = path.resolve(__dirname, "../public/");

// 복사 실행
await fs.ensureDir(dest);
await fs.copy(src, dest);

console.log(`✅ Copied images from ${src} to ${dest}`);
