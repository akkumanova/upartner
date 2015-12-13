from rest_framework.views import APIView
from rest_framework.response import Response

class CurrUserData(APIView):

    def get(self, request):
        result = {
            'username': request.user.username,
            'firstName': request.user.first_name,
            'lastName': request.user.last_name
        }

        return Response(result)