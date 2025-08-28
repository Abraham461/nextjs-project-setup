import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { policyId, amount, cardNumber, expiryDate, cvv, cardholderName, paymentMethod } = body;
    
    if (!policyId || !amount || !cardNumber || !expiryDate || !cvv || !cardholderName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate card number (basic validation)
    if (cardNumber.replace(/\s/g, '').length < 13) {
      return NextResponse.json(
        { error: 'Invalid card number' },
        { status: 400 }
      );
    }

    // Validate CVV
    if (cvv.length < 3 || cvv.length > 4) {
      return NextResponse.json(
        { error: 'Invalid CVV' },
        { status: 400 }
      );
    }

    // Validate amount
    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock payment processing - simulate success/failure
    const isSuccess = Math.random() > 0.1; // 90% success rate for demo

    if (!isSuccess) {
      return NextResponse.json(
        { error: 'Payment processing failed. Please try again.' },
        { status: 402 }
      );
    }

    // Generate mock payment response
    const paymentResponse = {
      success: true,
      paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      transactionId: `TXN_${Date.now()}`,
      amount: paymentAmount,
      currency: 'USD',
      policyId: policyId,
      paymentMethod: paymentMethod,
      status: 'completed',
      processedAt: new Date().toISOString(),
      receiptUrl: `/receipts/receipt-${Date.now()}.pdf`,
      message: 'Payment processed successfully'
    };

    return NextResponse.json(paymentResponse, { status: 200 });

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error during payment processing' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Payment API endpoint. Use POST to process payments.' },
    { status: 200 }
  );
}
