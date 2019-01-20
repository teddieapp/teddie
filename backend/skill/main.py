import logging

from ask_sdk_core.skill_builder import SkillBuilder
from ask_sdk_core.dispatch_components import AbstractRequestHandler
from ask_sdk_core.dispatch_components import AbstractExceptionHandler
from ask_sdk_core.utils import is_request_type, is_intent_name
from ask_sdk_core.handler_input import HandlerInput

from ask_sdk_model.ui import SimpleCard
from ask_sdk_model import Response

SKILL_NAME = "Teddy Bear"


class LaunchRequestHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_request_type("LaunchRequest")(handler_input)

    def handle(self, handler_input):
        speech_text = "I'm listening"
        handler_input.response_builder.speak(speech_text).set_card(
            SimpleCard(SKILL_NAME, speech_text)).set_should_end_session(False)
        return handler_input.response_builder.response


class MainIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("MainIntentHandler")(handler_input)

    def handle(self, handler_input):
        speech_text = "Hello world"
        handler_input.response_builder.speak(speech_text).set_card(
            SimpleCard(SKILL_NAME, speech_text)).set_should_end_session(True)
        return handler_input.response_builder.response


class HelpIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        speech_text = "You can say anything to me!"
        handler_input.response_builder.speak(speech_text).ask(speech_text).set_card(
            SimpleCard(SKILL_NAME, speech_text))
        return handler_input.response_builder.response


class CancelAndStopIntentHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_intent_name("AMAZON.CancelIntent")(handler_input) \
               or is_intent_name("AMAZON.StopIntent")(handler_input)

    def handle(self, handler_input):
        speech_text = "Goodbay!"
        handler_input.response_builder.speak(speech_text).set_card(
            SimpleCard(SKILL_NAME, speech_text))
        return handler_input.response_builder.response


class SessionEndedRequestHandler(AbstractRequestHandler):
    def can_handle(self, handler_input):
        return is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # Clean up mess
        return handler_input.response_builder.response


class AllExceptionHandler(AbstractExceptionHandler):
    def can_handle(self, handler_input, exception):
        return True

    def handle(self, handler_input, exception):
        print(exception)
        speech_text = "Sorry, I didn't get it. Can you please say it again"
        handler_input.response_builder.speak(speech_text).ask(speech_text)
        return handler_input.response_builder.response


def start():
    sb = SkillBuilder()
    sb.add_request_handler(LaunchRequestHandler())
    sb.add_request_handler(MainIntentHandler())
    sb.add_request_handler(CancelAndStopIntentHandler())
    sb.add_request_handler(SessionEndedRequestHandler())

    sb.add_exception_handler(AllExceptionHandler())

    handler = sb.lambda_handler()


if __name__ == '__main__':
    print("starting")
    start()