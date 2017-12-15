import { SourceGameResource } from './'

export default {
  getGameByPage: params =>
    SourceGameResource.get('/V4/Game.Package.list', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  getPackageInfo: params =>
    SourceGameResource.get('/V4/Game.Package.get', {
      params: {
        ...params,
        random: Math.random()
      }
    }),
  editAreaSave: params =>
    SourceGameResource.post('/V4/Game.Package.server.save', {
      ...params,
      random: Math.random()
    }),
  modifyConfigurationInformation: params =>
    SourceGameResource.post('/V4/Game.Package.save', params),
  deleteArea: params =>
    SourceGameResource.get('/V4/Game.Package.server.del', {
      params,
      random: Math.random()
    }),
  getTotalIP: params =>
    SourceGameResource.post('/V4/Game.Server.IP.list', {
      ...params,
      random: Math.random()
    }),
  saveSourceIPAndPort: params =>
    SourceGameResource.post('/V4/Game.Package.source.save', {
      ...params,
      random: Math.random()
    }),
  getTotalSourceIPAndPort: params =>
    SourceGameResource.post('/V4/Game.Package.source.list', {
      ...params,
      random: Math.random()
    })
}
