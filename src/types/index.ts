export interface RecommendCardType {
  id: number,
  age: number,
  company: string,
  distance: number,
  height: number,
  introduction: string,
  job: string,
  location: string,
  name: string,
  pictures: string[]
}


export interface RecommendQueryType {
  data: RecommendCardType[],
  meta: {
    next: {
      id: number,
      method: 'get',
      url: string
    }
  }
}
