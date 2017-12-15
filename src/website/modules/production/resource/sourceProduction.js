import { SourceProductionResource } from './'

export default {
  getProductionMealList: params =>
    SourceProductionResource.get('/V4/finance.product.meal.list', {
      params: {
        ...params
      }
    }),
  getIsPurchasedOfMirror: params =>
    SourceProductionResource.get('/V4/replaceMirror.mirror.isPurchased', {
      params: {
        ...params
      }
    }),
  getEmailResponsePage: params =>
    SourceProductionResource.get('/V4/messagecenter.notice.verifycallback', {
      params: {
        ...params
      }
    })
}
