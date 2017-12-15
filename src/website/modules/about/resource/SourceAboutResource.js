import { SourceAboutResource } from './'

export default {
  getLink: params =>
    SourceAboutResource.get('/V4/site.friendlink', {
      params: {
        ...params
      }
    })
}
