export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface IDonateConfig {
  price: null | number,
  title: null | string,
  actionText: null | string,
  commentInputPlaceholder: null | string,
  donationText: null | string,
  textarea: boolean,
  private: boolean,
}
