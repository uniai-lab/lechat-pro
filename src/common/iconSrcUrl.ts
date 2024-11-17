/** @format */

import type { FileSrcMap, SrcMap } from '@/types/interfaces'

export const srcMap: SrcMap = {
    openai: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201019.png',
    iflytek: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201021.png',
    baidu: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/baidu.png',
    glm: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201022.png',
    google: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/google.png'
}

export const fileSrcMap: FileSrcMap = {
    // .pdf,.pdfx,.docx,.doc,.exc,.ppt,.pptx,.xls,.xlsx...
    pdf: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fpdf.png',
    wps: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fdox.png',
    doc: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fdox.png',
    docx: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fdox.png',
    ppt: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fppt.png',
    pptx: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fppt.png',
    xls: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fexl.png',
    xlsx: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fexl.png',
    et: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fexl.png',
    csv: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/fileicon%2Fexl.png',
    txt: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/txt%E6%96%87%E4%BB%B6(1).png',
    md: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/markdown(2).png',
    json: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/txt.png',
    jpg: null,
    png: null,
    jpeg: null,
    webp: null
}
export const fileError: string = 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/file-unknown-fill(1).png'
