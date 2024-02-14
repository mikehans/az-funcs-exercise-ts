import { HttpRequest, InvocationContext, HttpResponseInit, app, output } from "@azure/functions";
//import { IncomingMessage } from "node:http";
//import { get } from "node:https";
import { request as rq } from "undici";

const blobOutput = output.storageBlob({
    connection: 'AzureWebJobsStorage',
    path: 'posts-data/posts.json'
});

export async function GetPostsData (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("Getting Posts Data");

    //let rawData = '';
    //let parsed = "{test: 'me'}";

    // This section doesn't work as the function has completed before the GET request returns.
/*
 *    get('https://jsonplaceholder.typicode.com/posts', (res: IncomingMessage) => {
 *        if(res.statusCode == 200){
 *            res.setEncoding('utf8');
 *            res.on('data', (chunk) => {
 *                //console.log(chunk);
 *                rawData = rawData + chunk;
 *            });
 *
 *            res.on('end', () => {
 *                parsed = JSON.parse(rawData);
 *                console.log(parsed)
 *                //context.extraOutputs.set(blobOutput, parsed);
 *            }); 
 *        } else {
 *            console.error(new Error("ARGH!"))
 *        }
 *    });
 */

    let json = {};
    const res = await rq('https://jsonplaceholder.typicode.com/posts');
    if (res.statusCode == 200) {
        context.log(res.statusCode);
        context.log(res);
        json = await res.body.json();
        context.log(json);
        context.extraOutputs.set(blobOutput, json);
    } else {
        context.error(new Error(`Remote request returned with statusCode ${res.statusCode}`));
    }

    return { jsonBody: json };
};

app.http('getPosts', {
    methods: ['GET'],
    authLevel: "anonymous",
    handler: GetPostsData,
    extraOutputs: [blobOutput]
});
