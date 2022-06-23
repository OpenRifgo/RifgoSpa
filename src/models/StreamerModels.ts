export interface IStreamer {
  id: number,
  slug: string,
  name: string,
  title: string,
  avatarUrl: string,
  smm: {insta: string, fb: string},
  buttons: Array<{label: string, url: Location}>,
  achievements: string
}
