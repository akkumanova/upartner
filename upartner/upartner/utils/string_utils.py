class StringUtils:
    @staticmethod
    def get_int(s):
        try:
            return int(s)
        except ValueError:
            return None