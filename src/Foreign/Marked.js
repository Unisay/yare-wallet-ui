import { marked } from "marked";

marked.setOptions({ pedantic: false, gfm: true });

export const markedImpl = (str) => marked(str);
