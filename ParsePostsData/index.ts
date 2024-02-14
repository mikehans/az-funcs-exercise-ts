import { HttpRequest, InvocationContext, HttpResponseInit, app, output } from "@azure/functions";

const blobInput = input.storageBlob({
    connection: 'AzureWebJobsStorage',
    path: 'posts-data/posts.json'
});

export async function GetPostsData (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("Getting Posts Data");


    return { jsonBody: json };
};

app.http('getPosts', {
    methods: ['GET'],
    authLevel: "anonymous",
    handler: GetPostsData,
    extraOutputs: [blobOutput]
});
