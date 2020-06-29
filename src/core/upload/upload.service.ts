import { Injectable, Inject } from '@nestjs/common';
import { ReadStream } from 'fs-capacitor';
import * as fs from 'fs';
import * as path from 'path';
import * as OSS from 'ali-oss';
import * as moment from 'moment';
import { FileUpload } from 'graphql-upload';
import { OSS_INTERCEPTOR } from './upload.constant';

@Injectable()
export class UploadService {
  private localDir = 'static';

  constructor(@Inject(OSS_INTERCEPTOR) private readonly oss: OSS) {}

  async aliyunUpload(file: FileUpload): Promise<string> {
    const prefix = 'test';
    const now = Date.now();
    const year = moment(now).get('year');
    const month = moment(now).get('month') + 1;
    const day = moment(now).get('date');
    const filename = `${prefix}/${year}/${month}/${day}/${now}`;
    const stream = file.createReadStream();
    const { mimetype } = file;
    const result = await this.oss.put(filename, stream, { mime: mimetype });
    return result.url;
  }

  // TODO
  async localUpload(filename: string, file: ReadStream): Promise<void> {
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
}
