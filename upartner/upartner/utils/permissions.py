from rest_framework import permissions

class IsStaffPermission(permissions.BasePermission):
    """
    Permission check for staff users.
    """

    def has_permission(self, request, view):
        return request.user.is_staff