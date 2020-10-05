import * as crypto from 'crypto';

interface IHash {
  iv: string;
  content: string;
}
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const algorithm = 'aes-256-ctr';
// const iv = crypto.randomBytes(16);
const iv = '189ee7729d164183565f0a88d52b06b4';

export default class CustomCrypto {
  encrypt(text: string): IHash {
    const cipher = crypto.createCipheriv(
      algorithm,
      secretKey,
      Buffer.from(iv, 'hex'),
    );
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
      iv,
      content: encrypted.toString('hex'),
    };
  }

  decrypt(hash: IHash): string {
    const decipher = crypto.createDecipheriv(
      algorithm,
      secretKey,
      Buffer.from(hash.iv, 'hex'),
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, 'hex')),
      decipher.final(),
    ]);
    return decrpyted.toString();
  }
}
