const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola desde la Universidad Tecnológica de Xicotepec de Juárez. Esta aplicación fue creada por Motilin';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué quieres preguntarme?')
            .getResponse();
    }
};

const ConocemeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ConocemeIntent';
    },
    handle(handlerInput) {
        const pregunta = handlerInput.requestEnvelope.request.intent.slots.pregunta.value;
        let speechText = '';

        switch (pregunta.toLowerCase()) {
            case '¿cuál es tu nombre?':
            case 'cuál es tu nombre':
                speechText = 'Mi nombre es Diego Mota';
                break;

            case '¿qué carrera estudias?':
            case 'qué carrera estudias':
                speechText = 'Estudio Ingeniería en Desarrollo y Gestión de Software';
                break;

            case '¿cuál es tu color favorito?':
            case 'cuál es tu color favorito':
                speechText = 'Mi color favorito es el verde.';
                break;

            case '¿cuál es tu grupo o cantante favorito?':
            case 'cuál es tu grupo o cantante favorito':
                speechText = 'Mi cantante favorito es BTS.';
                break;

            default:
                speechText = 'Lo siento, no entendí tu pregunta.';
        }

        speechText += ' ¿Quieres preguntarme algo más?';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('¿Quieres preguntarme otra cosa?')
            .getResponse();
    }
};

const DespedidaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DespedidaIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¡Ok! Fue un gusto hablar contigo. Hasta luego 😄';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Puedes preguntarme cosas personales como mi nombre, color favorito o qué carrera estudio. ¿Qué te gustaría saber?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué quieres preguntarme?')
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '¡Adiós! Cuídate mucho.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'No entendí eso. Puedes preguntarme cosas como cuál es mi color favorito o qué carrera estudio.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Qué más quieres saber?')
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Sesión terminada: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Acabas de activar el intent: ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Perdón, ocurrió un error. Inténtalo de nuevo.';
        console.log(`Error manejado: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('¿Puedes repetirlo, por favor?')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ConocemeIntentHandler,
        DespedidaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/hello-david/v1.0')
    .lambda();