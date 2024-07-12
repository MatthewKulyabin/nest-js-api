import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(entry): Promise<void> {
    const formattedEntry = `${Intl.DateTimeFormat('en-US', { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' }).format(new Date())}\t ${entry}\n`;

    try {
      if (!fs.existsSync(path.join(__dirname, '..', '..', 'logs'))) {
        await fsPromises.mkdir(path.join(__dirname, '..', '..', 'logs'));
      }
      await fsPromises.appendFile(
        path.join(__dirname, '..', '..', 'logs', 'myLogFile.log'),
        formattedEntry,
      );
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  }

  log(message: any, context?: string): void {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);

    super.log(message, context);
  }

  error(message: any, stackOrContext?: string): void {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);

    super.error(message, stackOrContext);
  }
}
