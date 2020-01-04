import defaultSettings from '@/settings'

const title = defaultSettings.title || '家政服务中心'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
