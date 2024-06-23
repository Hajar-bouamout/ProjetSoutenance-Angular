import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptographService {

  constructor(private http: HttpClient) { }

  // Générer une paire de clés RSA
  generateKeyPair(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/crypto/generate-keypair');
  }

  // Crypter les données avec la clé publique
  encryptData(data: string, publicKey: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/crypto/encrypt', { data, publicKey });
  }

  // Décrypter les données avec la clé privée
  decryptData(encryptedData: string, privateKey: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/crypto/decrypt', { encryptedData, privateKey });
  }

}