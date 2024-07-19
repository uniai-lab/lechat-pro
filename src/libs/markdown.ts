/** @format */

import Markdown, { type Options } from 'markdown-it'

const mdOptions: Options = {
    typographer: true,
    breaks: true
}

export const md = new Markdown(mdOptions)
