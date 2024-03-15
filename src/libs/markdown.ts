/** @format */

import Markdown from 'markdown-it'

const mdOptions: Markdown.Options = {
    typographer: true,
    breaks: true
}

export const md = new Markdown(mdOptions)
