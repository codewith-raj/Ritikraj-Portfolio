import { NextResponse } from 'next/server';
import { generateOTP, signOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and Name are required' }, 
        { status: 400 }
      );
    }

    const otp = generateOTP();
    // 10 minutes expiry
    const { hash, expiry } = signOTP(email, otp, 10);

    await sendOTPEmail(email, otp);

    return NextResponse.json({ 
      hash, 
      expiry, 
      message: 'OTP sent successfully' 
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP. Please try again.' }, 
      { status: 500 }
    );
  }
}
