import { Injectable } from '@angular/core';
import * as jose from 'jose';
import { HttpClient } from '@angular/common/http';

export interface HighScoreEntry {
  name: string;
  points: number;
}

export interface ScanEvent {
  groupName: string;
  qrId: number;
  points: number;
}

export interface QRCode {
  id: number;
  description: string;
  points: number;
}

export interface ScanResult {
  qrCodeFound: QRCode | null;
  scannedFirst: boolean;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  // used during development, in production the app will need a real backend
  localScanEvents: ScanEvent[] = [];
  localCodes: QRCode[] = [];

  constructor(private http: HttpClient) {
    if ('local-codes' in localStorage) {
      this.localCodes = JSON.parse(localStorage['local-codes']);
    }
    if ('local-scan-events' in localStorage) {
      this.localScanEvents = JSON.parse(localStorage['local-scan-events']);
    }
  }

  storeLocalData() {
    localStorage['local-codes'] = JSON.stringify(this.localCodes);
    localStorage['local-scan-events'] = JSON.stringify(this.localScanEvents);
  }

  isStackBlitzEnvironment() {
    return window.location.href.indexOf('stackblitz') !== -1;
  }

  isLocalhostEnvironment() {
    return (
      window.location.href.indexOf('localhost') !== -1 ||
      window.location.href.indexOf('127.0.0.1') !== -1
    );
  }

  getServerHost() {
    if (this.isLocalhostEnvironment()) {
      return 'http://127.0.0.1:3010';
    } else {
      return '';
    }
  }

  async getHighscores(): Promise<HighScoreEntry[]> {
    if (!this.isStackBlitzEnvironment()) {
      const callResult = await this.http
        .get(this.getServerHost() + '/api/highscores', {
          responseType: 'text',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .toPromise();
      return JSON.parse(callResult);
    } else {
      // TODO

      return [];
    }
  }

  async addPoints(jwtScanned: string, groupName: string): Promise<ScanResult> {
    if (!this.isStackBlitzEnvironment()) {
      const callResult = await this.http
        .post(
          this.getServerHost() + '/api/add-points',
          JSON.stringify({ jwtScanned, groupName }),
          {
            responseType: 'text',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();

      return JSON.parse(callResult);
    } else {
      const result: ScanResult = {
        qrCodeFound: null,
        scannedFirst: false,
      };

      // TODO

      this.storeLocalData();
      return result;
    }
  }

  async createQRCode(description: string, points: number, key: string) {
    if (!this.isStackBlitzEnvironment()) {
      const callResult = await this.http
        .post(
          this.getServerHost() + '/api/create-qr-code',
          JSON.stringify({
            description,
            points,
            key,
          }),
          {
            responseType: 'text',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .toPromise();

      return JSON.parse(callResult);
    } else {
      const id = 42; // TODO

      const jwt = await new jose.SignJWT({
        jti: id + '',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(key));

      this.storeLocalData();

      return jwt;
    }
  }
}
