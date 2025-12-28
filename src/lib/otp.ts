import crypto from 'crypto';

const SECRET = process.env.OTP_SECRET || 'default-secret-key-change-this';

export function generateOTP(): string {
  // Generate a random 4-digit number
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export function signOTP(email: string, otp: string, expiresInMinutes: number = 10) {
  const expiry = Date.now() + expiresInMinutes * 60 * 1000;
  const data = `${email}.${otp}.${expiry}`;
  const hash = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return { hash, expiry };
}

export function verifyOTP(email: string, otp: string, hash: string, expiry: number): boolean {
  if (Date.now() > expiry) {
    return false;
  }
  const data = `${email}.${otp}.${expiry}`;
  const validHash = crypto.createHmac('sha256', SECRET).update(data).digest('hex');
  return hash === validHash;
}
