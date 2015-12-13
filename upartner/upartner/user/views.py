from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login

def login_view(request):
    def post_login_data ():
        user = authenticate(
            username = request.POST['username'],
            password = request.POST['password']
        )

        if user is None or not(user.is_active):
            return get_login_page('Invalid username or password')

        login(request, user)

        return redirect(request.GET.get('next', 'index'))

    def get_login_page(error = None):
        return render(request, 'login_view.html', {
            'has_error': error is None,
            'error': error
        })

    if request.method == "POST":
        return post_login_data()
    else:
        return get_login_page()