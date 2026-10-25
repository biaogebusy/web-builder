import { Injectable } from '@angular/core';
// Submodule imports, not `import * as CryptoJS from 'crypto-js'`: crypto-js is
// CommonJS and cannot be tree-shaken, so the barrel pulls every algorithm
// (blowfish, tripledes, sha*, rabbit…) into the eager bundle. Only AES + Utf8
// are used here. See the performance doc in ../xinshi-docs.
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

@Injectable({
  providedIn: 'root',
})
export class CryptoJSService {
  private secretKey = 'xinshi';
  constructor() {}

  // Generate 32-bit random string
  randomString(len: number): string {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    const maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  encrypt(value: string): string {
    return AES.encrypt(value, this.secretKey.trim()).toString();
  }

  /**
   * Decrypt an AES ciphertext produced by {@link encrypt}.
   *
   * Never throws: crypto-js derives a random salt for inputs without the
   * "Salted__" prefix, so garbage input decrypts to random bytes whose UTF-8
   * decoding would otherwise throw.
   */
  decrypt(textToDecrypt: string): string {
    try {
      return AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(Utf8);
    } catch {
      return '';
    }
  }
}
