class DebugMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(f"\n=== Incoming Request ===")
        print(f"Path: {request.path}")
        print(f"Method: {request.method}")
        print(f"Headers: {dict(request.headers)}")
        print("=====================\n")
        response = self.get_response(request)
        print(f"\n=== Response ===")
        print(f"Status: {response.status_code}")
        print("================\n")
        return response