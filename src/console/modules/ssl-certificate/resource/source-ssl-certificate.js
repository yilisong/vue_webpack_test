import { SourceCertificateResource } from './'

export default {
  getCertificateByPage: params =>
    SourceCertificateResource.get('/V4/Web.ca.self.list', {
      params: {
        ...params
      }
    }),
  delCertificate: params =>
    SourceCertificateResource.delete('/V4/Web.ca.self.del', {
      params: {
        ...params
      }
    }),
  // 传入 formData(),解构不能
  addCertificate: params =>
    SourceCertificateResource.post('/V4/Web.ca.self.add', params),
  editCertificate: params =>
    SourceCertificateResource.post('/V4/Web.ca.self.editcaname', {
      ...params
    })
}
