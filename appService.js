/**********************
 Dependencies
 ***********************/

const svc = require('slingr-services');

/**********************
 Service Hooks Lifecycle
 **********************/

svc.hooks.onSvcStart = () => {
    // the loggers, service properties, data stores, etc. are initialized at this point. the service is ready to be used.
    svc.logger.info('From Hook - Service has started');
    //svc.appLogger.info('From Hook - Service has started')
};
svc.hooks.onSvcStop = (cause) => {
    //The service is about to stop at this point. Use this to release all resources that could cause a memory leak. 
    svc.logger.info('From Hook - Service is stopping.');
    //svc.appLogger.info('From Hook - Service is stopping.', cause);
};

/**********************
 Service Functions
 **********************/

//Functions receive a request parameter which has some info that the platform adds plus.
//the arguments sent to the function
svc.functions.randomNumber = (req) => {

    // this log will be sent to the app and can be seen in the general logs in the app monitor.
    svc.appLogger.info('Request to generate random number received', req);

    //This is how we fetch the arguments sent to the function from the slingr app.
    const params = req.params;

    // generate random number
    let max = 10000;
    if (params.max) {
        if (typeof params.max === 'number') {
            max = params.max;
        } else {
            throw new Error('Parameter "max" is not a valid number');
        }
    }
    let responseToApp = {};
    responseToApp.number = Math.round(Math.random() * max);

    // this is an internal log of the service
    svc.logger.info('Random number generated: ', responseToApp.number);

    //Functions should always return a valid JSON or object
    return responseToApp;
};

svc.functions.findAndSaveDocument = (req) => {
    const document = req.params;
    //Here we search for a doc with the same id. If found, we update it. 
    //If no id is sent, we save it on the dataStore as a new document.
    if (document.id) {
        svc.dataStores.dataStore1.findOne({ _id: document.id }).then((savedDoc) => {
            if (!savedDoc) {
                const updatedDocument = { ...savedDoc, ...document }
                svc.dataStores.dataStore1.update(updatedDocument.id, updatedDocument).then((updatedDoc) => {
                    svc.logger.info('Document [' + document.id + '] updated succesfully', updatedDoc);
                    svc.appLogger.info('Document [' + document.id + '] updated succesfully', updatedDoc);
                });
            } else {
                svc.logger.warn('No document found with id [' + document.id + ']');
                svc.appLogger.warn('No document found with id [' + document.id + ']');
            }
        }).catch((err) => {
            svc.logger.error('error while querying the db.');
            svc.appLogger.error('error while querying the db.', err);
        });
    } else {
        document.createdAt = new Date().getTime()
        svc.dataStores.dataStore1.save(document).then((newDocument) => {
            svc.logger.info('Document saved successfully', newDocument);
            svc.appLogger.info('Document saved successfully', newDocument);
        });
    }

    return { msg: 'ok' };
};

svc.functions.ping = (req) => {

    svc.appLogger.info('Request to ping received', req);

    let data = req.params;

    let res = {};
    //This is how we access the settings of the service
    res.token = svc.settings.token;
    res.ping = 'pong';

    //send 'pong' event. This will cause either the listener, or the callback to be executed sometime in the future.
    svc.events.send('pong', data, req.id);

    svc.logger.info('Pong sent to app');

    return { status: 'ok' };
};

svc.functions.error = (req) => {
    svc.appLogger.warn('Request to generate error received');

    throw new Error('Error generated!');
};

svc.functions.downloadFileFromSvc = (svcRequest) => {
    const file = svcRequest.params;
    svc.files.download(file.id).then(
        (res) => {
            svc.logger.info('File download has completed!');
            //In this case we return res.toString() because we know the file being downloaded is a .txt. Its not recommended to return the plain buffer to the platform.
            svc.events.send('onDownloadComplete', res.toString(), svcRequest.id)
        }
    );
    return { msg: 'File [' + file.id + '] is being downloaded.' }
};

svc.functions.uploadFileFromSvc = (svcRequest) => {
    const fileUrl = 'https://jsoncompare.org/LearningContainer/SampleFiles/PDF/sample-pdf-with-images.pdf'; 
    svc.httpModule.get(fileUrl).then( res => {
                svc.files.upload('somefile.pdf', res.data)
                    .then((fileResponse) => {
                        svc.events.send('onUploadComplete', fileResponse, svcRequest.id);
                    });
        }).catch( error => {
            svc.logger.error('Couldn\'t download the file from ['+fileUrl+'].',error);
        });

    return { msg: 'file is being downloaded' }
};


svc.functions.executeScript = (svcRequest) => {
    const { scriptName, parameters } = svcRequest.params;

    const res = svc.scripts.execute(scriptName, parameters);
    return {msg: 'Script ['+scriptName+'] will be executed shortly in a separate job',response: res};
};

/**********************
 Service Web Services
 **********************/

svc.webServices.webhooks = {
    method: 'POST',
    path: '/',
    handler: function (req, res) {
        let body;
        try {
            body = req.body;
        } catch (err) {
            throw new Error('Body must be valid JSON');
        }

        // send event to app
        svc.events.send('inboundEvent', body);

        // this is what the webhook caller receives as response
        res.send({ status: 'ok' });
    }
}

//Always call this method at the end of the file to run the service
svc.start();
