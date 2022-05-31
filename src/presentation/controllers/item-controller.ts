export class ItemController {
  handle (httpRequest: any): any {
    if (!httpRequest.body.title) {
      return {
        statusCode: 400,
        body: new Error('Missing param: title')
      }
    }
    if (!httpRequest.body.image) {
      return {
        statusCode: 400,
        body: new Error('Missing param: image')
      }
    }
  }
}
