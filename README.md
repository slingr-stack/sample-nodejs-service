---
title: Sample Node Service
keywords: 
last_updated: January 8, 2024
tags: []
summary: "Detailed description of Sample Node Service."
---

# Overview

This is a sample of an that you can check to learn how the NodeJs framework for Slingr works. It has the basic structure of an service with some samples of some common use cases.


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

To have a high level overview of how endpoitns are developed, go to this page:

[Create your own services](https://slingr-stack.github.io/platform/extensions_create_your_own_services.html)


To have a high level overview of how endpoitns are developed, go to this page:
[Create your own services](https://platform-docs.slingr.io/extensions_create_your_own_services.html)
