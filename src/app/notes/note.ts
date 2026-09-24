export interface NoteDraft {
  title: string;
  text: string;
}

export interface Note extends NoteDraft {
  id: string;
}
