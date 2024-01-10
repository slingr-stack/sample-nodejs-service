<table class="table" style="margin-top: 10px">
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Sample Node Service</td>
        <td>January 8, 2024</td>
        <td>Detailed description of the API of the Sample Node Service.</td>
    </tr>
    </tbody>
</table>

# Overview

This is a sample of a service that you can check to learn how the Node.js framework for Slingr works.
It has the basic structure of a service with some samples of some common use cases.

# Javascript API

The JavaScript API of the Sample Node Service has the example function:

- **HTTP requests**

## HTTP requests

**Label:** Random number generator  
**Name:** randomNumber  
**Description:** Generates a random integer

```
var res = svc.samplenode.randomNumber({});
log('res: '+JSON.stringify(res));
```

You can find more information about how to adjust it here:

[Services Node SDK](https://slingr-stack.github.io/platform/extensions_node_sdk.html)

To have a high level overview of how services are developed, go to this page:

[Create your own services](https://slingr-stack.github.io/platform/extensions_create_your_own_services.html)


To have a high level overview of how services are developed, go to this page:
[Create your own services](https://platform-docs.slingr.io/extensions_create_your_own_services.html)

# About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development,
with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
