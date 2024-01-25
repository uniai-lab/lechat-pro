
import config from "@/common/config";
const URL = config.url;
// export async function chat(url,data={},method='GET' ,header={}, apiKey) {
//   try {
//     const result = await fetch(URL+'/web'+url, {
//       method,
//       // signal: AbortSignal.timeout(8000),
//       // 开启后到达设定时间会中断流式输出
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${apiKey}`,
//         ...header
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         stream: true,
//         messages: messageList,
//         ...data
//       }),
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// }

export const http = async (url, data = {}, method = 'GET', header = {}) => {
  const options =   {
    method,
    // signal: AbortSignal.timeout(8000),
    // 开启后到达设定时间会中断流式输出
    headers: {
      token: localStorage.getItem('token') || '',
      id: localStorage.getItem('id') || 0,
      "app-type": 'web',
      "Content-Type": "application/json",

      ...header
    }
  }
  if (method === 'POST' || method === 'post') {
    options.body = JSON.stringify(data);
  }
  
  try {
    const result = await fetch(URL + '/web/' + url, 
    options
    
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function sse(url, data = {}, header = {}) {
  return await fetch(URL + '/web/' + url, {
    method: 'POST',
    timeout: 15000,
    responseType: 'stream',
    headers: {
      token: localStorage.getItem('token') || '',
      id: localStorage.getItem('id') || 0,
      "Content-Type": "application/json",
      "app-type": 'web',
      ...header

    },
    timeout: 300000,
    body: JSON.stringify(data)
  })
}