import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs-capacitor';
import * as fs from 'fs';
import * as path from 'path';
import * as OSS from 'ali-oss';

@Injectable()
export class UploadService {
  private localDir = 'static';

  async localUpload(filename: string, file: ReadStream) {
    if (!fs.existsSync(this.localDir)) {
      fs.mkdirSync(this.localDir);
    }
    const fileAddress = path.join(this.localDir, filename);
    await new Promise((resolve, reject) =>
      file
        .on('error', error => {
          fs.unlinkSync(fileAddress);
          reject(error);
        })
        .pipe(fs.createWriteStream(fileAddress))
        .on('error', error => reject(error))
        .on('finish', () => resolve(filename)),
    );
  }

  async aliyunUpload(filename: string, file: ReadStream) {
    const client = new OSS({
      region: 'oss-cn-shenzhen',
      accessKeyId: 'LTAI4GHbBQaAuG8odUV34171',
      accessKeySecret: 'iH9on2ffnfKeHAWZHQX4N27o0asWyd',
      bucket: 'miss-files',
    });
  }
}
