import threading

from django.core.mail import EmailMessage

class EmailThread(threading.Thread):
    def __init__(self, to_email, subject, content, **kwargs):
        self.to_email = to_email
        self.subject = subject
        self.content = content
        super(EmailThread, self).__init__(**kwargs)

    def run(self):
        msg = EmailMessage(self.subject, self.content, to=[self.to_email],)
        msg.content_subtype = 'html'
        msg.send()
