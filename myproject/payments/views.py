from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe
import json

# stripe.api_key = settings.sk_test_51QFzYyHH43Q0yRB5xize8IyB4kBr1GC5GZjAHlhGm2IW4p7Jdt9obxWl8p92PB5DCJx5y80kVMG7SrUUEnSj7KYW00VtuuYUT9
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            amount = int(float(data['amount']) * 100)  # Convert dollars to cents
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            return JsonResponse({'client_secret': intent.client_secret})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)
