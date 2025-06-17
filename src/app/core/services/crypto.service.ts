import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ReplaySubject } from "rxjs";

export interface StorageChange {
  key: string;
  value: string;
  storageArea: "localStorage" | "sessionStorage";
}

@Injectable()
export class CryptoService {

  public storageChange$: ReplaySubject<StorageChange> = new ReplaySubject();

  private key = CryptoJS.enc.Utf8.parse('Cl2iv0ZFIbkA8Suy');
  private iv = CryptoJS.enc.Utf8.parse('Cl2iv0ZFIbkA8Suy');

  constructor() { }

  // Methods for the encrypt and decrypt Using AES

  encryptUsingAES256( key: string ): string {

    var encrypted = CryptoJS.AES
                            .encrypt(CryptoJS.enc.Utf8.parse(key as string), 
                                     this.key, {
        keySize: 128 / 8,
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
    
  }

  decryptUsingAES256(encryptedData: CryptoJS.lib.CipherParams | string): string {

    var decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, {
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedText;

  }

  decryptFromJavaAES(encriptedString: string) {

    var encryptedBase64Key = "Q2wyaXYwWkZJYmtBOFN1eQ==";
    var parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);

    var decryptedData = CryptoJS.AES.decrypt( encriptedString, parsedBase64Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
    } );
    // console.log( “DecryptedData = “ + decryptedData );

    // this is the decrypted data as a string
    var decryptedText = decryptedData.toString( CryptoJS.enc.Utf8 );
    return Number(decryptedText);

  }
  
}
