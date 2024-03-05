<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 "
    id="login-modal">
    <div id="captcha"></div>

    <!-- 模态框 -->
    <div class="bg-white rounded-md shadow-md p-4">
      <a-spin :spinning="logining">

  
      <!-- 头部 -->
      <div class="flex justify-center items-center mb-2" style="position: relative;">
        <h2 class="text-lg font-medium">登录</h2>

        <div v-if="type != 'code'" :data-id="type" class="text-gray-700 hover:text-gray-900 "
          style="position: absolute; right:30px;" @click="changetype('code')">

          <!-- //二维码 svg-->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
          </svg>

        </div>
        <div class="text-gray-700 hover:text-gray-900 " style="position: absolute; right: 0;" @click="hideModal"><svg
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
      </div>
      <!-- 表单手机号 -->
      <form v-if="type == 'phone'" style="width: 310px;">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="phone-number">手机号</label>
          <input v-model="info.phone"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number" type="tel" placeholder="请输入手机号码">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="verification-code">验证码</label>
          <div class="flex items-center justify-between">
            <input v-model="info.code" maxlength="6"
              class="appearance-none border  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-3/5"
              id="verification-code" type="text" placeholder="请输入验证码">
            <button @click="getCode" :disabled="!loginflag"
              class="bg-gray-900  disabled:bg-gray-600  hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-2/5 ml-2"
              :class="loginflag ? '' : 'bg-gray-600 text-mini'" type="button">{{ getCodetitle }}</button>
          </div>
        </div>
        <!-- <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">密码</label>
        <input class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="请输入密码">
      </div> -->
        <div class="flex justify-center items-center mt-7 mb-7 " style="position: relative;">
          <button @click="beforelogin"
            class="bg-gray-900 hover:bg-gray-600 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
            type="button">登录</button>
          <!-- <a class="text-gray-900 hover:text-gray-600" href="#" style="position: absolute;right: 0;">忘记密码？</a> -->
        </div>
        <div class="flex justify-center   items-center mt-9 mb-0  " :data-id="type" @click="changetype('password')">
          <div class="flex    justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              密码登录
            </div>
          </div>


        </div>
      </form>

      <!-- 表单密码 -->
      <form v-if="type == 'password'" class="w-max" style="width: 310px;">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="phone-number">手机号</label>
          <input v-model="info.phone"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone-number" type="tel" placeholder="请输入手机号码">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="verification-code">密码</label>
          <div class="flex items-center justify-between">
            <a-input-password v-model:value="info.password"
              class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="verification-code" type="password" placeholder="请输入密码"/>
    
          </div>
        </div>

        <div class="flex justify-center items-center mt-7 mb-7 " style="position: relative;">
          <button @click="loginByPassword"
            class="bg-gray-900  hover:bg-gray-600 text-white font-bold py-2  px-20 rounded focus:outline-none focus:shadow-outline"
            type="button">登录</button>
          <!-- <a class="text-gray-900 hover:text-gray-600" href="#" style="position: absolute;right: 0;">忘记密码？</a> -->
        </div>
        <div class="flex justify-center   items-center mt-9 mb-0  " :data-id="type" @click="changetype('phone')">
          <div class="flex    justify-center items-center flex-col">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">

              <MobileOutlined />
            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              手机验证码
            </div>
          </div>


        </div>
      </form>


      <!-- 表单二维码 -->

      <form v-if="type == 'code'" style="width: 310px;margin-top: -10px;">

        <div class="mb-2 ">
          <div class=" w-full text-gray-600 mt-5  flex items-center justify-center">使用QQ或微信扫一扫</div>

          <div class="flex items-center justify-center p-4" @click="codeRefresh" style="margin-top: -10px;">

            <Flex gap="middle" wrap="wrap">
              <!-- <QRCode :value='codevalue' status="loading" /> -->
              <QRCode v-if="codesstatus != 'active'" size="220" :value='111231312312321312' :status="codesstatus"
                :onRefresh='codeRefresh' />
              <img v-if="codesstatus == 'active'"
                style="height:200px;filter: grayscale(1) brightness(0.6) contrast(500%) " :src="codevalue"
                @click="codeRefresh" />
              <!-- <QRCode :value='codevalue' status="scanned" /> -->

            </Flex>
          </div>
          <label @click="codeRefresh" style="font-size: 12px;"
            class=" w-full text-gray-600   mb-2 flex items-center justify-center" for="verification-code">点击刷新</label>

        </div>
        <div class="flex justify-center   items-center mt-5 mb-0  " :data-id="type">
          <div class="flex    justify-center items-center flex-col" @click="changetype('password')">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
              </svg>

            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              密码登录
            </div>
          </div>

          <div class="flex  ml-3  justify-center items-center flex-col" @click="changetype('phone')">
            <div class="flex   justify-center items-center bg-gray-100 p-2 rounded-full hover:bg-gray-200 ">

              <MobileOutlined />
            </div>
            <div class="flex mt-2 text-xs justify-center items-center text-gray-700 ">
              手机验证码
            </div>
          </div>
        </div>


      </form>
    </a-spin>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits, onMounted, nextTick } from 'vue';
import { http } from '@/common/request.js';
import { ClothesGloves, DocFail } from '@icon-park/vue-next';
import { MessageApi } from 'vue3-dxui'
import { Flex, QRCode } from 'ant-design-vue';
import { MobileOutlined } from '@ant-design/icons-vue'
const tisShow = ref(false);
const lefttime = ref(0);
const codevalue = ref('');
const tisContent = '对话次数每7天重置，可通过完成任务获取额外的对话次数，额外对话次数不会被重置。';
const userinfo = reactive({});
const config = reactive({});
const label = [];
const showTooltip = ref(false);
const hideScreenCove = ref(true);
const getCodetitle = ref('获取验证码');
const codesstatus = ref('loading');
const qrcodetocken = ref('')
const globalTimer = ref()
const options = ref()
const logining = ref(false)
//suo
const clock = ref(false)
const info = reactive({
  phone: '',
  code: '',
  password:''
});
const errorType = 'border-bottom';
const tips = '';
const value = '';
const loginflag = ref(true);
const rules = reactive({
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: ['change', 'blur']
    },
    {
      validator: (rule, value, callback) => {
        return uni.$u.test.mobile(value);
      },
      message: '手机号码不正确',
      trigger: ['change', 'blur']
    }
  ],
  code: [
    {
      required: true,
      message: '请输入验证码',
      trigger: ['change', 'blur']
    },
    {
      len: 6,
      message: '请输入正确的验证码',
      trigger: ['change', 'blur']
    }
  ]
});

const captchaObj = reactive({});

const emit = defineEmits(['hideModal', 'customEvent'])
const porps = defineProps({ visible: { type: Boolean } });
const visible = porps.visible
// console.log(porps.visible)

const type = ref('code')

function back() {
  type.value = 'phone'
}
function changetype(e) {
  // console.log(e)

  type.value = e
}
// function changetype() {
// type.value='password'
// }
const hideModal = () => {
  globalTimer.value(true)
  emit('hideModal');
};

onMounted(
  async () => {
    globalTimer.value = requestVerifyQRCode()
    var script = document.createElement('script');
    script.src = "https://static.geetest.com/v4/gt4.js";
    document.body.appendChild(script);
    script.onload = script.onreadystatechange = () => {
      initGeetest4({
        captchaId: 'b0a78ab0191bd4361905eba5b2209be5',
        product: 'bind'
      }, (captcha) => {
        captcha.appendTo("#captcha"); // 调用appendTo将验证码插入到页的某一个元素中，这个元素用户可以自定义

        captchaObj.value = captcha
        captcha.onSuccess(async () => { // web端的回调
          var result = await captcha.getValidate();
          aftersuccess(result)
        });
      });
    };
    await getqrcode()




  }


)

// 组件卸载周期钩子函数
//  beforeUnmount(
//   async()=>{
//     clearInterval(timer)
//     clearTimeout(refrshQRcode);
//     console.log(123);
//   }
//  ) 
function changelefttime() {
  // while (
  //   lefttime.value > 0
  // ){
  let timer = 0
  return () => {
    timer = setInterval(() => {
      lefttime.value -= 1
      getCodetitle.value = lefttime.value + 'S后重试'

      if (lefttime.value <= 0) {
        getCodetitle.value = '重新发送'
        loginflag.value = true

        clearInterval(timer)
      }
    }, 1000);
  }
}
function getCode() {
  // if (this.$refs.uCode.canGetCode) {
  //   this.$refs.uForm.validateField('phone', flag => {
  //     if (flag.length) uni.$u.toast(flag[0].message)
  //     else 
  //   })
  // } else {
  //   uni.$u.toast('倒计时结束后再发送');
  // }


  if (validatePhone(info.phone)) {

    captchaObj.value.showCaptcha();


  } else {
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '手机号格式错误'
    })
  }
}
function validatePhone(phone) {
  // console.log(phone)
  const regex = /^1[3456789]\d{9}$/; // 手机号正则表达式
  return regex.test(phone);
}
async function aftersuccess(result) {
  const header = {}
  for (let i of Object.keys(result)) {
    header[i.replace('_', '-')] = result[i]
  }


  try {
    // uni.showLoading({
    //   title: '正在获取验证码'
    // })
    // console.log('正在获取验证码')

    await http('get-sms-code', {
      phone: info.phone
    }, 'POST', header)
    MessageApi.open({
      type: 'success',
      duration: 3000,
      content: '验证码已发送'
    })
    // getCodetitle.value = '发送成功'
    loginflag.value = false
    lefttime.value = 46
    changelefttime()()

  } catch (error) {

    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '验证码发送失败'
    })
  } finally {

  }


}
async function submit() {
  logining.value = true

  try {


    const data = await http('login', {
      phone: info.phone,
      code: info.code,

    }, 'POST')
    const res = await data.json()

    if (res.status == 1) {
      // localStorage.setItem('userinfo', res.data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('id', res.data.id)
      // localStorage.setItem('name', res.data.name)
      // localStorage.setItem('username', res.data.username)

      emit('customEvent', '参数1', '参数2');
      hideModal()

    }
    else {

      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: res.msg
      })
    }




  } catch (error) {

    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '登录失败'
    })
  } finally {

    logining.value = false

  }
}
async function beforelogin() {
  let flag = false
  if (validatePhone(info.phone)) {
    await submit()

  } else {
    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '手机号格式错误'
    })
  }



}


//账号密码登录
async function loginByPassword() {
  let flag = false
  console.log(info.password);

  logining.value = true

  if (validatePhone(info.phone)) {
    const qes = await http('login', {
      phone: info.phone,
      password: info.password,
    }, 'POST'
    )
    const res = await qes.json()
    logining.value = false

    if (res.status == 1) {
      // localStorage.setItem('userinfo', res.data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('id', res.data.id)
      // localStorage.setItem('name', res.data.name)
      // localStorage.setItem('username', res.data.username)

      emit('customEvent', '参数1', '参数2');
      hideModal()

    }else if(res.status == 0){
      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: '密码错误'
      }
      )
    }
    
    else {
      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: '登录失败'
      }
      )
    }
    // await submit()
    console.log(info.value);



  } else {


    MessageApi.open({
      type: 'error',
      duration: 3000,
      content: '手机号格式错误'
    })
  }



}
var refrshQRcode = null
const getqrcode = async () => {


  if (clock.value == false) {
    clock.value = true
    try {
      // uni.showLoading({
      //   title: '正在获取验证码'
      // })
      // console.log('正在获取验证码')

      const res = await http('get-qr-code', 'GET')

      const qes = await res.json()
      // getCodetitle.value = '发送成功'
      if (qes.status == 1) {
        // console.log(qes.data.token);
        qrcodetocken.value = qes.data.token
        const qrcode = qes.data.code
        // console.log(qrcode);
        codevalue.value = qrcode
        codesstatus.value = 'active'
        // window.setTimeout = function () {
        //   // 不执行任何操作
        // };
        globalTimer.value()

      }else{
        MessageApi.open({
        type: 'error',
        duration: 3000,
        content: '获取频繁，请十分钟后再试'
      })
      }

    } catch (error) {
      console.log(error);
      MessageApi.open({
        type: 'error',
        duration: 3000,
        content: '二维码获取失败'
      })
    } finally {
      clock.value = false
      clearTimeout(refrshQRcode)

      refrshQRcode = setTimeout(() => {
        // console.log(123123123123);

        codesstatus.value = 'expired';
        globalTimer.value(true)
      }, 45000);




    }

  }



}



const codeRefresh = async () => {

  codesstatus.value = 'loading'
  await getqrcode()



}

// const getUserInfo = async () => {
//   try {

//     const data = await http('userinfo', {}, 'GET')
//     const res = await data.json()
//     console.log(res)
//     if (res.status == 1) {
//       userinfo.value = res.data
//       localStorage.setItem('userinfo', JSON.stringify(res.data))

//       options.value = res.data.models

//       console.log('kkkkkk',options.value);
//       if (res.data.avatar) imageUrl.value = res.data.avatar

//       if (res.data.name) form.name = res.data.name

//       if (res.data.phone) form.phone = res.data.phone

//       emit('customEvent', options.value, '参数2');

//     }
//     else {


//     }

//   } catch (e) {


//   }


// }
const requestVerifyQRCode = () => {
  let timer = 0
  return function (close = false) {
    if (close) {
      // console.log('删除成功');
      clearInterval(timer)
      timer = 0
      return
    }
    if (!timer) {
      timer = setInterval(async () => {

        // 发起请求到 verify-qr-code 接口
        try {



          const res = await http(`verify-qr-code?token=${qrcodetocken.value}`, { token: qrcodetocken.value }, 'GET')
          const qes = await res.json()
          // console.log('持续监听');


          // console.log(qes);
          if (qes.status == 1) {
            // console.log(qes.data.token);
            if (qes.data != null) {
              localStorage.setItem('id', qes.data.id)
              localStorage.setItem('token', qes.data.token)
              emit('customEvent', options.value, '参数2');

              hideModal()
              clearInterval(timer)
              timer = 0

            }

          } else {
            clearInterval(timer)
            timer = 0
          }


        } catch (error) {

          console.log(error);
        } finally {

        }
      }, 3000);
      // console.log(timer);
    }
  }


}
</script>

<style scoped>
/* 样式代码 */
</style>
