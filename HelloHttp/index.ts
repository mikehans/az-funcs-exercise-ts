import { HttpRequest, InvocationContext, HttpResponseInit, app } from "@azure/functions";

export async function HttpFunction (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("Processing HTTP Trigger");

    return { body: `Hello world!` };
}

app.http('httpDemo', {
    methods: ['GET'],
    authLevel: "anonymous",
    handler: HttpFunction
});
