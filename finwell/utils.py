from rest_framework.authtoken.models import Token

def get_user_token(user):
    """
    Retrieve the authentication token for a given user.

    Args:
        user: User instance for whom to retrieve the token.

    Returns:
        Token instance if the token exists, else None.
    """
    try:
        token = Token.objects.get(user=user)
        return token
    except Token.DoesNotExist:
        # Handle the case where the token does not exist for the user
        return None
