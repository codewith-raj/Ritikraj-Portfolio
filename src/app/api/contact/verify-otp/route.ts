import { NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/otp';
import { sendContactMessage } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const { email, otp, hash, expiry, name, message } = await request.json();
    
    if (!email || !otp || !hash || !expiry || !name || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    const isValid = verifyOTP(email, otp, hash, expiry);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' }, 
        { status: 400 }
      );
    }

    await sendContactMessage(name, email, message);

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send message' }, 
      { status: 500 }
    );
  }
}
