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
    const prefix = 'miss';
    const now = Date.now();
    const year = moment(now).get('year');
    const month = moment(now).get('month') + 1;
    const day = moment(now).get('date');
    const filename = `${prefix}/${year}/${month}/${day}/${now}`;
    const stream = file.createReadStream();
    const result = await this.oss.put(filename, stream, {
      timeout: 1000 * 60 * 60,
      mime: file.mimetype,
    });
    console.log('upload result: ', result);
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

  streamToBuffer(stream: ReadStream): Promise<Buffer | undefined> {
    return new Promise((resolve, reject) => {
      const buffers = [];
      stream.on('error', reject);
      stream.on('data', data => buffers.push(data));
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
  }
}
