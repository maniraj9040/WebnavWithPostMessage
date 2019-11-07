const express = require('express')
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const cors = require('cors')

const app = express()
app.use(cors())
const port = 7005


const projectId = 'webpage-reload-qtyuhu';
const sessionId = uuid.v4();
//const sessionId = '981dbc33-7c54-5419-2cce-edf90efd2170';
const languageCode = 'en-US';

app.get('/', async function(req, res) {

    const query = req.query.msg;

    // Instantiate a DialogFlow client using credentials in .json file

    let privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDlHxQWnPUO9ofw\nR6DlPv2Gfjdk/sE5p1nabQbdbbOzDOWmoTR+8uY9DDR6Ybzr1z4Nm15XhgetTtAR\nN7QkYf6wfQtTKASmYuSbwmvJpngsx7sv9CER37DkRzDBFnfgfu+X2hgh01B+e3rf\ngtxTipyhnB8CWZTkJ1sBOLX+k+drm/lUwDriSxx0apMZsoXw/NJbrxgO212qp1zD\nl2woS04tVKlasiI6DtxcxB7muuF/AMq8UJ4z0esvbTfQMkYc73ghgF0Vxg4jrZXo\nlluMcNijTL2VJLs9ho2lIpH9Assk/rWfq9AN8hDpn40BwBEzQX+ewTz5hap6annq\n05iMkSr/AgMBAAECggEAOZczPG/dZRJwnuPSPG012o11LQyf0vcOrcmD1TqS1amj\nO9v/Tv2NA8FCm5RfoUQsE81+zC8jVNufjwRaYl7DXuc/ZnqDmLL41XHsF/ag9FiL\n44TQnyaD1w1R4ubb4PDnFls6f54W+IPfIblJ2jHYJwMQBE4yD5sY09jGXiQdIj3L\njTXQAMfm8IkiITMzF+RicPESxX9IE+juS01z8pyDo2qMxUndnnfgIfDKRUAUVvC0\nAI8Ih1eHrGTnpyit4OSiNChnj6k4eUDr90wt8KykH9HaW5OAS6QHuqOUV/IiLN6t\nYOi+DuuxpAGFDV/Nk/32TpxTakgI7pbYbD87Ym78mQKBgQD1yVkFx7nqzIoNRq9D\n9Tc+eYdC3vkiVcXPveayrjg0wzEce8fCiRzShmb+j06yMPwG0DIdQwOxbDtmxXKR\noH67vmqgEGNY1qnJNr3blgkrVP6WbegzNWxckEmh3q6m59FEwQXEy+e30z4BNBv1\n+Nk2JL4RKQcMOyrVCKmt0ejTfQKBgQDupHLr9eiNSrHQHl0ny9JYywXxdkgfVwqD\nPlrvxk88yTqQHwqnLDSmzNKz/e86thPjH66oIM88S/lLdEOk2+H2iwu8Dnb0mxWm\n/WbZDxcGRL+IxcSjRadLYZj5I67JsxIV6sivN2IoutQ4GnXbu4aSKqMFa3VSUlX9\nwjO+iXNJKwKBgQDSWXeu0rfykwqzQgNNjdexyCBSwrFFCVM577Q4x5Gi1kp5rhXQ\nD7hzFEOhKNSY/AM1cYjyMiA+//n2gpUCvPC5jMWEJ4JezZiRdCAYhddjFmKsK3PG\nH7qVnYbm2cVvYoZe6TMescOmN0uhjA9B+68p/1gLJ6m4dgq6N6e/8x3noQKBgQCb\ndLz4QSTQhcv3SxBcEEZiWT7x4J9y6vyKKmCKuaB8dImVwOLrq7xQvDS108G3eUzT\nM5xPIbBeEw++u2olRqeYN1PZmYKcLTqZoZER7OaOytIKguppgcJNNLK1+Syvb9tk\nM6GvomBrL+l28qW8EhjDtsqjiTDQA5rIx211vYxAKQKBgQDyjvNE876RBI1R9cuI\nIv2pHYlnI16EPhJrNzwIBfXEeCu1QLI0MJKFGSW1TfP5SX6qkr0MUo7B8zcnMGVo\nGtn3yAVxCaodQ2AjLG3sijVqGo+AOpv2uT/R2vXUUoZWNP9SqB6FIon4h93myfnd\n4Tl5XclIeKN0HD+eP71PIjJndg==\n-----END PRIVATE KEY-----\n';
    let clientEmail = "dialogflow-hpvyjc@webpage-reload-qtyuhu.iam.gserviceaccount.com";

    let config = {
        credentials: {
            private_key: privateKey,
            client_email: clientEmail
        }
    }

    // Initiate new session
    const sessionClient = new dialogflow.SessionsClient(config);

    // Define session path
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    await sessionClient.detectIntent(request)
        .then(responses => {
            console.log('Detected intent');
            const result = responses[0].queryResult;
            //console.log(result);
            console.log(`  Query: ${result.queryText}`);
            console.log(`  Response: ${result.fulfillmentText}`);
            console.log(`  Fullfillment Messages: ${result.fulfillmentMessages}`);
            //console.log('Messages length:',result.fulfillmentMessages.length);

            if (result.fulfillmentText == "") {

                if (result.fulfillmentMessages.length > 1) {

                    reply = { "text": result.fulfillmentMessages };
                    console.log(reply);
                    res.setHeader('Content-Type', ['text/plain', 'text/html', 'application/javascript', 'application/json; charset=utf-8']);
                    res.send(reply);

                }

            } else {
                reply = { "text": `${result.fulfillmentText}` };
                console.log('  Reply:', reply);
                res.setHeader('Content-Type', ['text/plain', 'application/javascript', 'application/json; charset=utf-8']);
                res.send(reply);
                if (result.intent) {
                    console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                    console.log(`  No intent matched.`);
                }
            }

        })
        .catch(err => {
            console.error('ERROR:', err);
        });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))