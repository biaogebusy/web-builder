import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoJSService {
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

  // aes encode
  AES_CBC_encrypt(message: any, key: any): string {
    const keyHex = CryptoJS.enc.Hex.parse(key); //
    const ivHex = CryptoJS.enc.Utf8.parse('0000000000000000');
    const messageHex = CryptoJS.enc.Utf8.parse(message);
    const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  // aes decode
  decrypt(word: any, keyStr: string): string {
    const keyHex = CryptoJS.enc.Hex.parse(keyStr); //
    const ivHex = CryptoJS.enc.Utf8.parse('0000000000000000');
    const base64 = CryptoJS.enc.Base64.parse(word);
    const src = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(src, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
  }
}
