class CheckResultChoice:
    CLEAN = 'cl'
    DOCS_DISCREPANCY = 'dd'
    FAKE_DOCS = 'fd'

    @classmethod
    def get_values(cls):
        return (
            (cls.CLEAN           , 'Clean'              ),
            (cls.DOCS_DISCREPANCY, 'Discrepancy in docs'),
            (cls.FAKE_DOCS       , 'Fake documents'     ),
        )