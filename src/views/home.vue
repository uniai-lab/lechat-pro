<!-- @format -->

<template>
  <div
       ref="dropzoneRef"
       @dragenter.prevent="handleOver"
       @dragleave.prevent="handleLeave"
       @drop="handleDrop"
       class="flex flex-col h-screen bg-gray-000 dark bg">
    <!-- <div  v-if="visible" style="width: 100vw;position: absolute;height: 100vh;z-index: 999;"> -->
    <!-- 展示上传框的逻辑 -->
    <!-- v-if="isDragging" -->
    <div v-if="isDragging" class="upload-box">
      <a-upload-dragger
                        :accept="Object.keys(fileSrcMap)
                          .map(key => `.${key}`)
                          .join(',')
                          "
                        ref="ref6"
                        v-model:file-list="fileListBT"
                        name="file"
                        list-type="picture"
                        :customRequest="customUpload"
                        :beforeUpload="beforeUploadBT"
                        :showUploadList="false"
                        :multiple="true">
        <div class="upbox">
          <div
               :style="{
                fontSize: '160px',
                color: '#080603',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }">
            <!-- <inbox-outlined></inbox-outlined> -->
            <img
                 style="height: 200px; border-radius: 30px; margin-bottom: 30px"
                 src="../assets/filebg.webp" />
          </div>
          <div class="uptitle">文件拖动到此处即可上传</div>
          <div class="upmsg">
            支持的文件格式：PDF、Word文档（DOC、DOCX）、Excel表格（XLSX）、PPT（PPT、PPTX）、TXT、CSV、MD、图片等
          </div>
        </div>
      </a-upload-dragger>
    </div>

    <login-modal
                 @custom-event="handleCustomEvent"
                 style="height: 100%; z-index: 999"
                 v-if="visible"
                 @hideModal="clickConfig"></login-modal>
    <cost v-if="showCost" @close="showCost = false" style="z-index: 999" />

    <!-- <a-float-button
            v-if="!ifphone"
            @click="cleanchat"
            type="default"
            style="margin-bottom: 60px; margin-right: 0px"
        >
            <template #icon>
                <ClearOutlined />
            </template>
</a-float-button> -->
    <a-float-button v-if="!ifphone" @click="showface" type="default" style="margin-bottom: 70px; margin-right: 0px">
      <template #icon>
        <!-- <RobotOutlined /> -->

        <a-icon :style="{ fontSize: '20px', display: 'flex', flexDection: 'row', justifyContent: 'center' }">
          <!-- <svg t="1709610574999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6922" width="30" height="30"><path d="M435.387733 610.184533l-55.825066-32.9728v-134.485333h55.825066z" p-id="6923"></path><path d="M511.505067 782.728533l-233.437867-134.485333V379.2896l233.437867-134.485333 233.437866 134.485333v268.9536zM331.349333 617.813333l180.155734 104.106667 180.155733-104.106667V409.736533l-180.155733-104.106666-180.155734 104.106666z" p-id="6924"></path><path d="M486.126933 513.774933h50.756267V752.298667h-50.756267z" p-id="6925"></path><path d="M498.824533 490.922667l208.059734-119.2448 25.378133 45.6704-208.059733 119.261866z" p-id="6926"></path><path d="M290.747733 416.068267l26.589867-46.08L523.946667 489.045333l-26.641067 46.199467zM580.010667 917.213867L554.666667 871.543467l304.469333-175.086934V361.5232h53.282133V711.68a26.624 26.624 0 0 1-12.680533 22.8352z m-137.0112 0l-319.709867-182.613334A26.641067 26.641067 0 0 1 110.592 711.68V361.5232H163.84v334.933333l304.5376 175.086934zM199.406933 300.629333L174.08 254.958933l324.795733-187.733333a23.005867 23.005867 0 0 1 25.378134 0l324.778666 187.733333-25.378133 45.6704-312.149333-180.155733z" p-id="6927"></path><path d="M884.514133 221.969067c-45.6704 0-83.746133 38.058667-83.746133 83.729066s38.075733 83.746133 83.746133 83.746134 83.729067-38.075733 83.729067-83.746134-38.058667-83.729067-83.729067-83.729066z m0 114.176c-17.7664 0-30.446933-12.680533-30.446933-30.446934s12.680533-30.446933 30.446933-30.446933 30.446933 12.680533 30.446934 30.446933S902.263467 336.213333 884.514133 336.213333z m-746.001066-114.176c-45.6704 0-83.746133 38.058667-83.746134 83.729066S92.842667 386.901333 138.513067 386.901333s83.729067-38.058667 83.729066-83.746133-38.058667-81.186133-83.729066-81.186133z m0 114.176c-17.7664 0-30.446933-12.680533-30.446934-30.446934s12.680533-30.446933 30.446934-30.446933S168.96 287.931733 168.96 305.698133 153.736533 336.213333 138.513067 336.213333z m372.992 461.806933c-45.6704 0-83.729067 38.058667-83.729067 83.746133s38.058667 83.729067 83.729067 83.729067 83.729067-38.058667 83.729066-83.729067-38.058667-83.746133-83.729066-83.746133z m0 114.193067c-17.749333 0-30.446933-12.680533-30.446934-30.446934 0-15.223467 12.6976-30.446933 30.446934-30.446933s30.446933 12.680533 30.446933 30.446933c0 15.223467-15.223467 30.446933-30.446933 30.446934z" p-id="6928"></path></svg> -->
          <svg
               t="1709611594182"
               class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="19888"
               width="20"
               height="20">
            <path
                  d="M582.464 228.202667L490.666667 192l91.797333-36.202667L618.666667 64l36.202666 91.797333L746.666667 192l-91.797334 36.202667L618.666667 320l-36.202667-91.797333z m213.333333-64L704 128l91.797333-36.202667L832 0l36.202667 91.797333L960 128l-91.797333 36.202667L832 256l-36.202667-91.797333z m64 213.333333L768 341.333333l91.797333-36.202666L896 213.333333l36.202667 91.797334L1024 341.333333l-91.797333 36.202667L896 469.333333l-36.202667-91.797333zM512 42.666667v85.333333C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384h85.333333c0 259.2-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m-181.013333 670.165333l60.330666-60.330667a170.666667 170.666667 0 0 0 241.365334 0l60.330666 60.330667c-99.968 99.989333-262.058667 99.989333-362.026666 0zM362.666667 533.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m298.666666 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                  fill="#000000"
                  p-id="19889"></path>
          </svg>
        </a-icon>
      </template>
    </a-float-button>

    <!-- 密码 -->

    <div>
      <a-modal v-model:open="pwvisible" :footer="null" destroyOnClose="true" title="修改密码" @ok="handlepwOk">
        <a-spin :spinning="sevepwclock">
          <a-form :validat="'cheekpasswordres'" style="margin-top: 32px" name="custom-validation" ref="formRef"
                  :model="formStatepw" :rules="pwrules" v-bind="layout" @finish="handleFinish"
                  @finishFailed="handleFinishFailed">
            <a-form-item has-feedback label="新的密码" name="pass">
              <a-input-password v-model:value="formStatepw.pass" type="password" autocomplete="off" />
            </a-form-item>
            <a-form-item has-feedback label="重复密码" name="checkPass">
              <a-input-password v-model:value="formStatepw.checkPass" type="password" autocomplete="off" />
            </a-form-item>
          </a-form>
          <div style="width: 100%" class="flex justify-center mt-7 mb-9">
            <div @click="sevepw()"
                 class="flex justify-center py-2 text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100 rounded-md"
                 style="width: 120px; cursor: pointer">
              确定
            </div>
          </div>
        </a-spin>
      </a-modal>
    </div>
    <!-- </div> -->
    <!-- <div v-if="ifphone" @click="cleanchat"
          class="flex justify-center items-center ml-2 px-2 rounded-md flex-row text-gray-100 bg-gray-900  hover:bg-gray-600 hover:text-gray-100 ">
          <DeleteOutlined :style="{ fontSize: '24px' }" /> -->
    <a-modal v-model:open="openfase" :footer="null" :confirm-loading="confirmLoading" title="期望角色" @ok="facehandleOk">
      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <!-- <a-form-item label="角色">

          <a-input :placeholder="'律师？或者其他职业'" v-model:value="formState.name" />

          
        </a-form-item> -->

        <a-form-item label="场景要求">
          <a-textarea :rows="7" :placeholder="'请输入您的具体需求'" v-model:value="formState.desc" />
        </a-form-item>
        <a-form-item label="AI开场白">
          <a-textarea :rows="4" :placeholder="'设置您需要的开场白'" v-model:value="formState.startmsg" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 10 }">
          <!-- <a-button style="margin-right: 10px">取消</a-button> -->
          <a-button style="background-color: black" type="primary" @click="onSubmit">保存</a-button>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-drawer title="编辑个人资料" :closable="true" :width="320" :visible="msgvisible" :body-style="{ paddingBottom: '80px' }"
              @close="onmsgClose">
      <a-spin :spinning="sevemsgClock">
        <a-form :model="form" :rules="rules" layout="vertical">
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="头像" name="avatar">
                <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
                          :show-upload-list="false" :customRequest="noup" :before-upload="beforeUpload"
                          @change="handleChange">
                  <img style="height: 100%" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                  <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">上传</div>
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="用户名" name="name">
                <a-input v-model:value="form.name" placeholder="请输入用户名" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="手机号" name="phone">
                <div style="display: flex; flex-direction: row">
                  <a-input style="width: 66%" :disabled="true" v-model:value="form.phone" placeholder="暂未绑定" />
                  <!-- <div v-if="form.phone == ''"
                  class="ml-auto px-3 py-2  cursor-pointer text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100   rounded-md"
                  @click="bindphone()">
                  <div>前往绑定</div>
                </div> -->
                </div>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea v-model:value="form.description" :rows="4" placeholder="please enter url description" />
            </a-form-item>
          </a-col>
        </a-row> -->
        </a-form>

        <div style="width: 100%; cursor: pointer" class="flex justify-center mt-20">
          <div @click="sevemsg()"
               class="flex justify-center py-2 text-gray-100 bg-gray-900 hover:bg-gray-700 hover:text-gray-100 rounded-md"
               style="width: 120px">
            保存
          </div>
        </div>
      </a-spin>
    </a-drawer>

    <!-- 顶部/ -->
    <div
         class="flex flex-row flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bg-gray-950 justify-between items-center"
         style="align-items: center; z-index: 888">
      <div class="flex flex-row text-2xl font-bold text-zinc-50">
        LeChat
        <div class="flex flex-row ml-1 bg-gray-600 px-1 rounded-md justify-between items-center text-sm"
             style="height: 20px">
          pro
        </div>
      </div>
      <div v-if="ifphone" class="ml-4 text-sm text-zinc-200">乐聊多模型文档解析工具</div>
      <!-- <div class="ml-2 text-xs text-zinc-100 text-gray-100"> V1.0.0</div> -->

      <div v-if="!iflogin"
           class="ml-auto px-3 py-2 cursor-pointer text-gray-100 bg-gray-700 hover:bg-white hover:text-gray-900 rounded-md"
           @click.stop="clickConfig()">
        <div>登录</div>
      </div>

      <div @click.stop="showProfile()" v-else class="ml-auto" style="align-items: end; cursor: pointer">
        <div class="text-l ml-2 text-gray-100 hover:bg-gray-100 hover:text-gray-900 px-2 py-1 rounded-md">
          {{ userinfo.name }}
        </div>
      </div>

      <div v-if="iflogin && ifphone" @click.stop="showchargeModal" style="line-height: 0.7rem"
           class="px-3 py-2 ml-1 text-sm cursor-pointer text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-900 rounded-md gold-button">
        充值
      </div>
      <div v-if="iflogin && !ifphone" @click.stop="showchargeModal"
           class="flex justify-center items-center ml-1 rounded-md flex-row text-gray-100 bg-gray-900 hover:bg-gray-600 hover:text-gray-100">
        <WalletOutlined style="font-size: 22px" />
      </div>
    </div>
    <!-- 充值弹框 -->

    <a-modal :width="!ifphone ? '80%' : '800px'" :footer="null" v-model:open="chargeopen" title="充值"
             :afterClose="handchargeleOk">
      <!-- <a-watermark :content="['价格仅供内部测试', '正式版本权益清空']"> -->
      <a-row :gutter="{ lg: 30, md: 10, sm: 10, xs: 5 }" align="middle" justify="center"
             style="width: 100%; margin: 30px auto">
        <a-col v-for="(item, index) in shoplist" :key="index" :xs="24" :sm="24" :md="12" :lg="6">
          <div @click="choseItem(item)"
               class="flex flex-clo shopitem border-[#cfcfcf] border-[2px] rounded-[10px] cursor-pointer items-center relative overflow-hidden mx-1 my-1">
            <div class="text-[16px] mt-[25px]">
              {{ item.title }}
            </div>
            <div class="text-[22px] mt-[12px] text-[#e2b460] font-medium">￥{{ item.price }}</div>
            <div class="text-[13px] text-[#bcbcbc] mb-[12px] text-center px-[5px]" style="
                                text-decoration: line-through;
                                text-decoration-color: #bcbcbc;
                                text-decoration-thickness: 1px;
                                text-decoration-style: solid;
                            ">
              {{ item.price * 2 }}元
            </div>

            <div class="text-[12px]" style="width: 85%; height: auto" v-for="role in item.description">
              <div class="flex flex-row mt-1"
                   style="display: flex; flex-direction: row; justify-content: start; align-items: start">
                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                     stroke-linejoin="round" class="h-4 text-green-700" height="30px" width="30px"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div style="
                                        width: 95%;
                                        display: flex;
                                        flex-direction: row;
                                        justify-content: left;
                                        align-items: start;
                                    ">
                  {{ role }}
                </div>
              </div>
              <div
                   class="text-[12px] text-[#573B18] absolute right-0 top-0 rounded-[8px] py-[2px] px-[6px] rounded-r-none truncate"
                   style="background: linear-gradient(90deg, rgb(249, 229, 189), rgb(226, 180, 96))">
                限时折扣
              </div>
            </div>
          </div>
        </a-col>
      </a-row>

      <div style="text-align: center; margin-top: 20px">
        *注意：文件上传消耗
        <b>1</b>
        次对话，图片生成消耗
        <b>10</b>
        次对话。
        <b>不同模型消耗的次数不同！</b>
        <br />
        <a-button @click="(showCost = true), (chargeopen = false)" type="link">查询模型消费对照表</a-button>
      </div>
      <div style="text-align: center; margin-top: 5px">如果您遇到了问题，请联系《AI乐聊》微信小程序客服</div>
      <!-- </a-watermark> -->
    </a-modal>

    <!-- 弹出框 -->
    <div class="profile-overlay" v-if="isProfileOpen" @click="closeProfile()">
      <a-card :bodyStyle="{ 'white-space': 'break-all' }" style="width: 340px">
        <template #cover>
          <img alt="example" src="https://openai-1259183477.cos.ap-shanghai.myqcloud.com/WechatIMG925.jpg" />
        </template>
        <template #actions>
          <!-- <setting-outlined  key="setting"   /> -->
          <KeyOutlined v-if="userinfo.phone" @click="showpwModal()" />
          <edit-outlined @click="changeuserinfo()" />
          <LogoutOutlined @click.stop="logout()" />
        </template>
        <a-card-meta :title="userinfo.name" :description="'对话次数:' + userinfo.chance.totalChatChance">
          <template #avatar>
            <a-avatar :style="'height:50px;width:50px;margin:0px 10px 10px 10px'" :src="userinfo.avatar" />
            <div
                 style="
                                width: 50px;
                                position: relative;
                                background: black;
                                color: gold;
                                border-radius: 10px;
                                padding: 0 0px;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                margin-top: -5px;
                                margin-left: 9px;
                                font-size: 10px;
                                font-weight: 500;
                                z-index: 99999;
                            ">
              VIP {{ userinfo.chance.level }}
            </div>
            <div
                 v-show="userinfo.chance.level != 0"
                 style="
                                margin-left: 87px;
                                margin-top: -16px;
                                position: absolute;
                                font-size: 12px;
                                flex-wrap: nowrap;
                            "
                 class="text-gray-600">
              到期时间：{{ timestampToDateString(userinfo.chance.levelExpiredAt) }}
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <!-- 支付弹窗 -->
    <a-modal :footer="null" style="height: 400px" v-model:open="chargecodeopen" :title="selectedGoods.title"
             :afterClose="handchargecodeleOk">
      <!-- <a-watermark :content="['价格仅供内部测试', '正式版本权益清空']"> -->
      <div v-if="!showpayres" style="padding: 10px; justify-content: space-between" class="flex flex-row">
        <div style="display: flex; flex-direction: column">
          <div class="mt-2" style="font-size: 16px">您正在购买《LeChatPro》{{ selectedGoods.title }}</div>
          <!-- <div class="mt-2" style="font-size: 16px;"> 价格：{{ selectedGoods.price }}</div> -->
          <div class="text-[20px] mt-[5px] text-[#01b085] font-medium">
            支付金额:￥{{ selectedGoods.price }}
          </div>
          <div class="mt-2 mb-1" style="font-size: 16px">解锁权益：</div>
          <!-- <div v-for="arole in selectedGoods.description">{{ arole }}</div> -->
          <div class="" v-for="arole in selectedGoods.description">
            <div class="h-8 gap-1 flex flex-row justify-start items-center text-sm">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                   stroke-linejoin="round" class="h-5 w-5 text-green-700" height="1em" width="1em"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>
                {{ arole }}
              </span>
            </div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column">
          <div class="flex flex-row mt-2" style="width: 200px; justify-content: center; align-items: center">
            <div class="flex">
              <img
                   src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAABihJREFUaEPdmmtsFFUUx/9n2kJAfKBgFAEbJWoQjIq8dqbt3tYEUEIkUUEFBDQQY4iPL0YxWhT8YnwTE1ADEkl4RCVBeUTYWejOlmcEVIyiEU3AEJQgBATi3r+Z3S1suzPdme1usW7SD517Xr85d+4998wI/ic/8eWwI0MAMQ3SpMiAi8krwCEt3A5t7EB9YrtXLPkg9vBrDHSbT+Cxixm8v29upKGfQd2273NlWoNsjjSKIS//NwFaR0XNeWhINrZcvQASGz1GxNjQFSBaYiT1WNQ3b3T/z4BsG3mZ/F25A8DNXQkEwA/s8c8IjNp+IgNim5MEWNHFINLhEpgM5azMgkTmCmR+1wThi1DJBWkQwzZXEJhUFIjgHIgjAI6A6AbBDQB6FWWrCCUBVmrlTE6DiG3aAKKB7AgOM8UPUGHsRUrvQ0Py5zy9r8yBqMKNAAcZlGEkZkDQLZD98EJxKkeFATlOzXdQVbEItU2/h/K3tWawkUrNJMUFujKUbmHhMCCyhtDzoJJ7CtttR6LJHIhznFnivSoYSNuNp0MgLcql3XgLg5QFovQwBUE+pXLuz8uAHb0COBuFVPSDIatR23TUN0u2FYXWUVRVrEJt0/48udJkpn0QCmoRdZrynMesWSJclL2eNuIJErOGiXBXyxiV41lpS8zcC8FtHZiy/iACLNfKmeJlvO1STYiCSsQL3W3faWpbTwn4dllACEyBcpZ7GrfNRwT4JD0mWMuoM8FbbvQggXGgUEay+9hPgLvvFPXzy4icYvfUQESaj/nP/VHVkMrhiCZWF3S9OdKYW26fl99a0xep1HUQ6Q3yeoEsKWjLW8B3au2kckYUabR9tbg5ztAykcKJAFIAfnP/BHAz159AfwDDAFwawr83iAAfaeU8HsJQYVE7Ml2AKQI5qGkswZleu3DP+rO+ipsio41KYzLJqQB6F3DgAyJcrKPJ2YWjCyZhxKzFFA4hZQ7qE7uDaWWlttQOMHTqFQLT29HznVoOlWOFcugjLLZ5gppvej4jYRzErYlCfuaj4gvyB5XTN4wfL1mxI5tEZIeOOi901FZa3//w57+P0JBHUZdYVnQAmU1zFpVzV9E2PBSNuPUGyWfbDLWzsxMx1jsNxQYhtklqmYCGxNo8GxnIh1gps1GT+DFv3LbGG+BkTXkvr4e1blx36XFiE4DcqV+gRIGeCNW8JjRM3Joq4BOMOpH8IEdVCyp+yV4/SuVc3UrGzhknV7M++WC+jZwNOTNYsGg8QlTdAhU/HgZG4maSwKuIOuvz9Nw72vNkEuSdfmWQ2KYLWi3AQq2cOZ7PX8z8M+eAVhDELUF2Mhpuc5SYeYr1ziW+8DFrJKjH+a5k9qhqoOJuKOdDPxtiW58DvC87HgAkI/krtTbR0HwoSGbENg9SOdVBZIuVMWzzLQJPhwVxm0enCUxFveO3lp+PSWzzNJXTs9ggg+gZtvlhTm86cEbStn3L9TaexTb3UDm3BwmoWBmxTbcrOjx8RoDWK4x78iNuArC7bdlhxKxluiL1Ouqavyk20Hb1ttZcKykeANjyHAbPiJDv6/rkk7CtqIBut751D0xwGITbIjrpBiHANq2c58sCkn88Dg7iTitPAL9IiWOsNGo8z+kdoWsyB0oKzSD65ZgJDOIeY4N1IXOst3dcLpbFiJsfk5jWRj8wSLF+UdJ2kn/Hpfwg6dWuzZulYu6KxCKrIPKAj27ngKSdC9ZRy0uhD1aubjwyRyjvtnMDOhEkG4W4p09gKfoc340h+895BrdpxFWo6Db0fIvJbt2N8dDpfJAL23/6nco+t/wRpJftM4QMBTkUkl2RiHUUPgeV/FZs0y1cLw8wtawvAN5bzPwtt46IO63Yh8TD3r7kS6rE+Mwbq7i5gERpjqTlIfvLLyMieE1Hnbkt7xCnd6BBVp7QA1olOAMquTQDsmX0HUIjAaKsVWvA2IKLCU5TtIW65q8vdMhL0+IPHkQJJAk2QiXnZVb43LLCtjYAHFMCH51gQjZSJca2OPL4qCbvcN8JQYVzQWAOlLOwVRI8TcSskQb0NIoMBnArgA437MKF2lZaTgHcL8B3GtwIlcz7SsP/e62Oee507X8BMkHgUUDU0YEAAAAASUVORK5CYII="
                   class="w-[25px] h-[25px]" alt="" />
              <span class="pl-[8px] text-[15px] font-medium">微信支付</span>
            </div>
          </div>

          <div class="bg-gray-000 flex flex-col"
               style="justify-content: center; height: 200px; width: 200px; align-items: center">
            <img v-show="shopQRcode" style="height: 200px; width: 200px" :src="shopQRcode" />
            <div v-show="!shopQRcode">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30"
                   style="enable-background: new 0 0 50 50"
                   xml:space="preserve">
                <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
                  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s"
                           repeatCount="indefinite" />
                </rect>
                <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
                  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s"
                           repeatCount="indefinite" />
                </rect>
                <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
                  <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s"
                           repeatCount="indefinite" />
                  <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s"
                           repeatCount="indefinite" />
                </rect>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <a-result :style="{ position: 'relative' }" v-if="showpayres" status="success" title="支付成功"
                :sub-title="`订单编号:${lastTransactionId} , 可能存在1-3分钟的延迟，如长时间没有到账，请联系客服`">
        <template #extra>
          <canvas
                  style="z-index: 999999; position: absolute; left: 0; bottom: 0; width: 472px; height: 100%"
                  ref="showcanvas"></canvas>
        </template>
      </a-result>
      <!-- </a-watermark> -->
    </a-modal>

    <!-- 中心区域 -->
    <a-drawer title="历史对话" :closable="true" :placement="placement" :open="open" @close="onClose" :get-container="false"
              :style="{ position: 'absolute' }">
      <a-list item-layout="horizontal" :data-source="historyChat">
        <template #renderItem="{ item, index }">
          <a-list-item class="dailogitem" @click="todailog(item.id, index)">
            <template #actions>
              <div
                   style="color: black; font-size: 16px"
                   @click.stop="deldailog(item.id)"
                   key="list-loadmore-more">
                <DeleteOutlined />
              </div>
            </template>
            <a-list-item-meta :description="convertTimestamp(item.updatedAt)">
              <template #title>
                <div class="listitemname">{{ item.title ? item.title : '未命名' }}</div>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
        <template #loadMore>
          <div
               v-if="iflogin"
               :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
            <a-button style="color: black" @click="ondailogLoadMore">查看更多</a-button>
          </div>
        </template>
      </a-list>
      <template #footer>
        <div class="newdailogbox">
          <div @click="newdailog" class="newdailogbtn">
            <PlusCircleOutlined />
            <div style="margin-left: 6px">新建对话</div>
          </div>
        </div>
      </template>
    </a-drawer>
    <div class="mx-2 pb-2" style="
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
                overflow-y: scroll;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                margin: 0;
                height: fit-content;
                max-height: 100%;
                padding-top: 64px;
                padding-bottom: 90px;
            " ref="chatListDom">
      <a-config-provider :locale="zhCN">
        <a-tour v-if="ifphone" v-model:current="current" :open="leadeopen" :steps="steps" @close="handleOpenlade(false)"
                :arrow="false" />
      </a-config-provider>

      <!-- 文件预览 -->
      <a-modal :footer="null" style="width: 900px" v-model:open="ifshowopenfile" :title="officeName" @ok="handlefileOk">
        <iframe v-if="ifshowopenfile" :src="officeViewerUrl" style="
                        width: 100%;
                        height: 70vh;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        white-space: nowrap;
                    "></iframe>
      </a-modal>

      <a-spin v-if="linkback" style="margin-top: 120px" tip="正在连接服务器..."></a-spin>

      <div class="group flex mt-2 px-4 py-3 text-gray-900 rounded-lg" v-for="(item, index) in achat.slice().reverse()"
           :key="index" style="flex-direction: column; justify-content: flex-end">
        <div class="flex flex-row justify-between items-center" style="">
          <div v-if="item.role != 'assistant'" class="flex flex-row justify-between items-center">
            <div style="
                                height: 44px;
                                width: 44px;
                                border-radius: 50%;
                                font-size: 18px;
                                margin: 10px 0;
                                margin-left: 10px;
                            " :class="index == 1
                              ? 'flex flex-row justify-center items-center   bg-gray-900 text-gray-100  '
                              : 'flex flex-row justify-center items-center   bg-gray-600 text-gray-100'
                              ">
              Me
            </div>
          </div>
          <div v-if="item.role == 'assistant' && !sending" class="flex flex-row justify-between items-center">
            <img :style="index == 0
              ? 'height: 64px;   filter: grayscale(0.9) brightness(0.6) contrast(900%)  '
              : 'height: 64px;   filter: grayscale(0.9) brightness(0.8) contrast(300%) '
              " :src="index == 0
                ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/after.png'
                : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'
                " />
            <div class="font-bold mr-3">LeChat</div>
            <img :src="srcMap[item.model]" style="height: 22px" />

            <div class="ml-1">{{ item.subModel || '' }}</div>
          </div>

          <div v-if="item.role == 'assistant' && sending" class="flex flex-row justify-between items-center">
            <img :style="index == 0
              ? 'height: 64px;   filter: grayscale(0.9) brightness(0.9) contrast(900%)  '
              : 'height: 64px;   filter: grayscale(0.9) brightness(0.9) contrast(300%) '
              " :src="index == 0
                ? 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/loading.png'
                : 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/old.png'
                " />

            <div class="font-bold mr-3">LeChat</div>
            <img :src="srcMap[item.model]" style="height: 22px" />

            <div class="ml-1">{{ item.subModel || '' }}</div>
          </div>

          <Copy class="invisible group-hover:visible" :content="item.content" />
        </div>

        <div>
          <Loding style="margin-left: 20px" v-if="!item.content && !item.file" />
          <template v-else-if="item.content && item.role !== 'user'">
            <MdPreview :no-img-zoom-in="true" v-model="renderEchartsIfNeeded(item.content).content"
                       style="padding: 0; background: none" />
            <div class="chart-wrap" v-if="renderEchartsIfNeeded(item.content).chartData">
              <Chart :option="renderEchartsIfNeeded(item.content).chartData" />
            </div>
          </template>

          <div style="padding: 20px; background: none" v-else-if="item.content && item.role === 'user'"
               v-html="md.render(item.content)"></div>

          <div v-if="item.file && !item.file.ext.match('image.*')" style="cursor: pointer" class="filebox mb-2 mt-3"
               @click="openFile(item.file.url, item.file.name, item.file.ext)">
            <div class="fileitem py-2 max-w-60 px-3">
              <a-spin :spinning="item.file.type == 'sending'" tip="解析中...">
                <div class="fileitembox">
                  <div class="flileimg">
                    <img style="width: 40px" :src="fileSrcMap[item.file.ext] || fileError" alt="" />
                  </div>
                  <div class="fileinfo ml-2">
                    <div class="filename text-gray-900">
                      {{ item.file.name }}
                    </div>

                    <div style="margin-top: 7px; color: rgb(170, 116, 106); font-weight: 500"
                         v-if="item.file.type == 'error'">
                      内容解析失败
                    </div>
                    <div v-else>
                      <div class="filemsg text-gray-500">
                        {{ item.file.ext }}
                      </div>
                      <div class="filesize text-gray-500">
                        {{ convertBytesToBestUnit(item.file.size) }}
                      </div>
                    </div>
                  </div>
                </div>
              </a-spin>
            </div>
          </div>

          <div v-if="item.file && item.file.ext.match('image.*')" class="filebox mb-2 mt-3"
               style="padding: 15px; max-width: 450px">
            <a-config-provider :locale="zhCN">
              <a-spin :spinning="item.file.type === 'sending'" tip="上传中...">
                <a-image :src="item.file.url" />
              </a-spin>
            </a-config-provider>
          </div>
        </div>
      </div>
      <div class="loader-container" v-show="upSending">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background: new 0 0 50 50"
             xml:space="preserve">
          <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s"
                     repeatCount="indefinite" />
          </rect>
          <rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s"
                     repeatCount="indefinite" />
          </rect>
          <rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2">
            <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s"
                     repeatCount="indefinite" />
            <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s"
                     repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </div>
    <div v-if="sending" style="
                z-index: 999;
                background-color: (0, 0, 0, 0);
                left: 0px;
                right: 0px;
                position: fixed;
                bottom: 70px;
                cursor: pointer;
            " @click="stopmsg"
         class="flex-1 flex-row mb-2 my-4 text-gray-100 text-slate-600 leading-relaxed flex justify-center items-center">
      <div class="stop py-1 px-9 flex justify-center items-center flex-row">
        <div style="display: flex; flex-direction: column; justify-content: center">
          <svg t="1708590117036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4223" width="26" height="26">
            <path
                  d="M512 170.7008a341.3504 341.3504 0 1 0 0 682.6496 341.3504 341.3504 0 0 0 0-682.6496zM85.3504 512a426.6496 426.6496 0 1 1 853.3504 0 426.6496 426.6496 0 0 1-853.3504 0z m341.3504-149.2992c-35.328 0-64 28.672-64 64v170.6496c0 35.328 28.672 64 64 64h170.6496c35.328 0 64-28.672 64-64V426.7008c0-35.328-28.672-64-64-64H426.7008z"
                  p-id="4224" fill="#ffffff"></path>
          </svg>
        </div>
        <div class="ml-2">停止响应</div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="bottom-0 w-full p-4" style="
                position: fixed;
                max-width: 1000px;
                width: 100%;
                margin: 0 auto;
                left: 0;
                right: 0;
                bottom: 8px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 10px;
            ">
      <div class="upload-list" style="position: absolute; right: 28px; width: 300px; bottom: 80px">
        <a-upload :accept="Object.keys(fileSrcMap)
          .map(key => `.${key}`)
          .join(',')
          " v-model:file-list="fileListBT" :beforeUpload="false" list-type="picture">
          <template v-slot:iconRender="props">
            <img :src="fileSrcMap[props.file.name.split('.').pop()] || fileError" />
          </template>
        </a-upload>
      </div>

      <div class="flex flex-row" style="align-items: center">
        <a-button ref="ref1" @click="showfilelist"
                  class="flex justify-center items-center ml-0 px-2 rounded-md flex-row text-gray-900 bg-gray-100">
          <svg t="1709609597661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4448" width="18" height="18">
            <path
                  d="M279.04 617.472c0.896-26.496 4.16-52.864 9.728-78.848H39.424a39.424 39.424 0 1 0 0 78.848H279.04zM39.424 774.656a39.424 39.424 0 0 0 0 78.848h304.128c-15.808-24.768-28.8-51.2-38.912-78.848H39.424z m0-629.76H880.64a39.424 39.424 0 1 0 0-78.848H39.424a39.424 39.424 0 0 0 0 78.848z m397.824 157.696H39.424a39.424 39.424 0 0 0 0 78.848H360.96c21.76-29.568 47.488-56.064 76.288-78.848z m258.56-1.024a328.192 328.192 0 1 0 0 656.384 328.192 328.192 0 0 0 0-656.384z m115.712 368.64h-115.712a39.424 39.424 0 0 1-39.424-39.424V486.4a39.424 39.424 0 0 1 78.848 0v104.96h76.288a39.424 39.424 0 1 1 0 78.848z"
                  p-id="4449" fill="#515151" data-spm-anchor-id="a313x.search_index.0.i0.71083a81622esI"
                  class="selected">
            </path>
          </svg>
          <div v-if="ifphone" style="margin-left: 4px">历史对话</div>
        </a-button>
        <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
          <Cascader ref="ref2" v-if="ifphone" style="min-width: 160px" :allowClear="false" :defaultValue="commommodel"
                    class="mr-0 p-1" expandTrigger="hover" @change="modelOnChange" :options="options" />
        </a-config-provider>
        <div v-if="!ifphone" style="margin-left: 1px"
             class="flex justify-center items-center ml-0 px-2 mr-2 rounded-md flex-row text-gray-900 bg-gray-100 hover:bg-gray-300 hover:text-gray-900">
          <a-config-provider :theme="{ token: { colorPrimary: ' rgb(64, 70, 79)' } }">
            <a-cascader placeholder="Please select" :v-model="commommodel" :defaultValue="commommodel"
                        :options="options"
                        @change="modelOnChange">
              <CodeSandboxOutlined :style="{ fontSize: '20px', padding: '6px 0px' }" />
            </a-cascader>
          </a-config-provider>
        </div>
        <a-button ref="ref3" @click="showface" v-if="ifphone"
                  class="flex justify-center items-center ml-0 mr-3 px-2 mr-1 rounded-md flex-row text-gray-900 bg-gray-100">
          <!-- <RobotOutlined :style="{ fontSize: '20px' }" /> -->

          <a-icon :style="{
            width: '20px',
            fontSize: '20px',
            display: 'flex',
            flexDection: 'row',
            justifyContent: 'center'
          }">
            <!-- <svg t="1709610574999" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6922" width="30" height="30"><path d="M435.387733 610.184533l-55.825066-32.9728v-134.485333h55.825066z" p-id="6923"></path><path d="M511.505067 782.728533l-233.437867-134.485333V379.2896l233.437867-134.485333 233.437866 134.485333v268.9536zM331.349333 617.813333l180.155734 104.106667 180.155733-104.106667V409.736533l-180.155733-104.106666-180.155734 104.106666z" p-id="6924"></path><path d="M486.126933 513.774933h50.756267V752.298667h-50.756267z" p-id="6925"></path><path d="M498.824533 490.922667l208.059734-119.2448 25.378133 45.6704-208.059733 119.261866z" p-id="6926"></path><path d="M290.747733 416.068267l26.589867-46.08L523.946667 489.045333l-26.641067 46.199467zM580.010667 917.213867L554.666667 871.543467l304.469333-175.086934V361.5232h53.282133V711.68a26.624 26.624 0 0 1-12.680533 22.8352z m-137.0112 0l-319.709867-182.613334A26.641067 26.641067 0 0 1 110.592 711.68V361.5232H163.84v334.933333l304.5376 175.086934zM199.406933 300.629333L174.08 254.958933l324.795733-187.733333a23.005867 23.005867 0 0 1 25.378134 0l324.778666 187.733333-25.378133 45.6704-312.149333-180.155733z" p-id="6927"></path><path d="M884.514133 221.969067c-45.6704 0-83.746133 38.058667-83.746133 83.729066s38.075733 83.746133 83.746133 83.746134 83.729067-38.075733 83.729067-83.746134-38.058667-83.729067-83.729067-83.729066z m0 114.176c-17.7664 0-30.446933-12.680533-30.446933-30.446934s12.680533-30.446933 30.446933-30.446933 30.446933 12.680533 30.446934 30.446933S902.263467 336.213333 884.514133 336.213333z m-746.001066-114.176c-45.6704 0-83.746133 38.058667-83.746134 83.729066S92.842667 386.901333 138.513067 386.901333s83.729067-38.058667 83.729066-83.746133-38.058667-81.186133-83.729066-81.186133z m0 114.176c-17.7664 0-30.446933-12.680533-30.446934-30.446934s12.680533-30.446933 30.446934-30.446933S168.96 287.931733 168.96 305.698133 153.736533 336.213333 138.513067 336.213333z m372.992 461.806933c-45.6704 0-83.729067 38.058667-83.729067 83.746133s38.058667 83.729067 83.729067 83.729067 83.729067-38.058667 83.729066-83.729067-38.058667-83.746133-83.729066-83.746133z m0 114.193067c-17.749333 0-30.446933-12.680533-30.446934-30.446934 0-15.223467 12.6976-30.446933 30.446934-30.446933s30.446933 12.680533 30.446933 30.446933c0 15.223467-15.223467 30.446933-30.446933 30.446934z" p-id="6928"></path></svg> -->
            <svg t="1709611594182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="19888" width="30" height="30">
              <path
                    d="M582.464 228.202667L490.666667 192l91.797333-36.202667L618.666667 64l36.202666 91.797333L746.666667 192l-91.797334 36.202667L618.666667 320l-36.202667-91.797333z m213.333333-64L704 128l91.797333-36.202667L832 0l36.202667 91.797333L960 128l-91.797333 36.202667L832 256l-36.202667-91.797333z m64 213.333333L768 341.333333l91.797333-36.202666L896 213.333333l36.202667 91.797334L1024 341.333333l-91.797333 36.202667L896 469.333333l-36.202667-91.797333zM512 42.666667v85.333333C299.925333 128 128 299.925333 128 512s171.925333 384 384 384 384-171.925333 384-384h85.333333c0 259.2-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m-181.013333 670.165333l60.330666-60.330667a170.666667 170.666667 0 0 0 241.365334 0l60.330666 60.330667c-99.968 99.989333-262.058667 99.989333-362.026666 0zM362.666667 533.333333a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m298.666666 0a64 64 0 1 1 0-128 64 64 0 0 1 0 128z"
                    fill="#000000" p-id="19889"></path>
            </svg>
          </a-icon>
        </a-button>
        <div style="
                        z-index: 999;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-right: -25px;
                    ">
          <a-upload :accept="Object.keys(fileSrcMap)
            .map(key => `.${key}`)
            .join(',')
            " ref="ref4" v-model:file-list="fileListBT" name="file" list-type="picture" :customRequest="customUpload"
                    :beforeUpload="beforeUploadBT" :style="{
                      fontSize: '18px',
                      color: 'gray',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }">
            <div style="
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                width: 100%;
                                text-align: center;
                            ">
              <LinkOutlined :style="{
                cursor: 'pointer',
                fontSize: '18px',
                color: 'gray',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }" />
            </div>

            <template #itemRender="{ file, actions }">
              <a-space></a-space>
            </template>
          </a-upload>
        </div>
        <a-textarea :style="{
          padding: '5px 5px 5px 28px',
          display: 'flex',
          flexDection: 'row',
          justifyContent: 'center'
        }" autosize :type="'text'" @keydown="keydownHandle"
                    :placeholder="!iflogin ? '请先登录' : '剩余对话次数' + userinfo.chance.totalChatChance"
                    v-model:value="value"></a-textarea>

        <a-config-provider :theme="{ token: { colorPrimary: ' rgb(17,20,24)' } }">
          <a-dropdown-button ref="ref5" @click="sendMessage" type="primary" :loading="sending" :style="{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '6px'
          }">
            发送
            <template #overlay>
              <a-menu @click="handleMenuClick">
                <a-menu-item key="0">
                  <CloudSyncOutlined />
                  智能融合
                </a-menu-item>
                <a-menu-item key="1">
                  <FileTextOutlined />
                  文字模式
                </a-menu-item>
                <a-menu-item key="2">
                  <FileImageOutlined />
                  图片模式
                </a-menu-item>
              </a-menu>
            </template>
            <template #icon>
              <div
                   v-if="outmodel == '0'"
                   :style="{
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }">
                <CloudSyncOutlined />
              </div>
              <div
                   v-if="outmodel == '1'"
                   :style="{
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }">
                <FileTextOutlined />
              </div>
              <div
                   v-if="outmodel == '2'"
                   :style="{
                    fontSize: '18px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }">
                <FileImageOutlined />
              </div>
            </template>
          </a-dropdown-button>
        </a-config-provider>
        <!-- <div
                    v-if="ifphone"
                    @click="cleanchat"
                    class="flex justify-center items-center ml-2 px-2 rounded-md flex-row text-gray-100 bg-gray-900 hover:bg-gray-600 hover:text-gray-100"
                    style="height: 34px; margin-top: 4px"
                >
                    <DeleteOutlined :style="{ fontSize: '20px' }" />
                </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref, computed, onMounted, onUpdated, onBeforeUnmount, toRefs } from 'vue'
import { EventSourceParserStream } from 'eventsource-parser/stream'
import Loding from '@/components/Loding.vue'
import Copy from '@/components/Copy.vue'
import { md } from '@/libs/markdown'
import LoginModal from '@/components/LoginModal.vue'
import Cost from '@/components/Cost.vue'
import Chart from '@/components/Chart.vue'
import { http, sse, httppay } from '@/common/request.js'

import { Cascader, notification } from 'ant-design-vue'

import {
  PlusCircleOutlined,
  LoadingOutlined,
  LinkOutlined,
  InboxOutlined,
  CloudSyncOutlined,
  FileTextOutlined,
  FileImageOutlined,
  SendOutlined,
  WalletOutlined,
  KeyOutlined,
  GlobalOutlined,
  CodeSandboxOutlined,
  SettingOutlined,
  UserOutlined,
  EditOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  RobotOutlined,
  ClearOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  HistoryOutlined
} from '@ant-design/icons-vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import type { DrawerProps } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { reactive, toRaw } from 'vue'
import type { UnwrapRef } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import type { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import VueComposition from '../components/vue-composition.vue'
import VueLegacy from '../components/vue-legacy.vue'
//引入相关样式
import '@vue-office/docx/lib/index.css'
import commonContent from '../common/commoncontent'
import confetti from 'canvas-confetti'
import { anyType } from 'ant-design-vue/es/_util/type'
const leadeopen = ref<boolean>(false)
const current = ref(0)
const ref1 = ref(null)
const ref2 = ref(null)
const ref3 = ref(null)
const ref4 = ref(null)
const ref5 = ref(null)
const ref6 = ref(null)
const iffirstopen = ref(false)
const showcanvas = ref(null)
const steps: TourProps['steps'] = [
  {
    title: '历史对话',
    description: '点击此处查看历史对话',

    placement: 'top',
    target: () => ref1.value && ref1.value.$el
  },
  {
    title: '模型选择',

    placement: 'top',
    description: '点击此处选择您需要的模型',
    target: () => ref2.value && ref2.value.$el
  },
  {
    title: '预设开场白',

    placement: 'top',
    description: '点击此处可以预设场景与开场白',
    target: () => ref3.value && ref3.value.$el
  },
  {
    title: '文件上传',

    placement: 'top',
    description: '点击此处上传您要分析的文件',
    target: () => ref4.value && ref4.value.$el
  },
  {
    title: '选择对话模式',
    description: '按钮右侧图标可选择对话模式，默认为智能融合',
    // cover: createVNode('img', {
    //   alt: 'tour.png',
    //   src: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
    // }),

    placement: 'top',
    target: () => ref5.value && ref5.value.$el
  },
  {
    title: '文件上传',
    placement: 'right',
    // cover: createVNode('img', {
    //   alt: 'tour.png',
    //   src: 'https://iconfont.alicdn.com/p/illus_3d/file/gaKSTURtJF9v/7ce58437-a501-458b-b3a5-04bf58241572.png?image_process=resize,l_1000',
    // }),
    description: '您可以直接将文件拖入到页面中',
    target: () => ref6.value && ref6.value.$el
  }
]
const handleOpenlade = (val: boolean): void => {
  leadeopen.value = val
}
const linkback = ref(true)
const dailogindex = ref(0)
const fileListBT = ref([])

const isDragging = ref(false)
const showCost = ref(false)

const text = ref('# Hello Editor')
const outmodel = ref('0')
const historyChat = ref<any>([])
const handleMenuClick: MenuProps['onClick'] = e => {
  // console.log('click', e)
  outmodel.value = e.key
}
//map筛选
var srcMap = {
  openai: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201019.png',
  iflytek: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201021.png',
  baidu: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/baidu.png',
  glm: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/Frame%201022.png',
  google: 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/google.png'
}

var fileSrcMap = {
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
var fileError = 'https://openai-1259183477.cos.ap-shanghai.myqcloud.com/file-unknown-fill(1).png'

const customUpload = options => {
  // 阻止默认的上传行为
  options.onSuccess()
  isDragging.value = false
}
const beforeUploadBT = file => {
  // 将文件添加到fileListBT数组
  fileListBT.value.push(file)
  isDragging.value = false
  // console.log(isDragging.value)

  // console.log(fileListBT.value)
  return false // 返回false以阻止自动上传
}

function timestampToDateString(timestamp) {
  // 将毫秒时间戳转换为秒
  var seconds = Math.floor(timestamp / 1000)
  // 创建 Date 对象
  var date = new Date(seconds * 1000)
  // 获取年份、月份和日期
  var year = date.getFullYear()
  var month = (date.getMonth() + 1).toString().padStart(2, '0')
  var day = date.getDate().toString().padStart(2, '0')
  // 返回格式化的日期字符串
  return `${year}-${month}-${day}`
}
const lastTransactionId = ref('')
interface FormStatepw {
  pass: string
  checkPass: string
  age: number | undefined
}
const pwvalidateStatus = ref('false')
const formRef = ref()
const formStatepw: UnwrapRef<FormStatepw> = reactive({
  pass: '',
  checkPass: '',
  age: undefined
})

let validatePass2 = async (rule: RuleObject, value: string) => {
  if (value === '') {
    return Promise.reject(new Error('请再次输入密码'))
  } else if (value !== formStatepw.pass) {
    return Promise.reject(new Error('两次输入的密码不一致'))
  } else {
    return Promise.resolve()
  }
}

const pwrules = {
  pass: [
    {
      required: true,
      validator: (rule: any, value: string) => {
        return new Promise((resolve, reject) => {
          if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(value)) {
            reject(new Error('必须包含字母和数字，不少于八位'))
          } else {
            resolve()
          }
        })
      },
      trigger: 'change'
    }
  ],
  checkPass: [{ required: true, validator: validatePass2, trigger: 'change' }]
}
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const handleFinish = (values: FormState) => {
  // console.log(values, formState);
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  // console.log(errors);
}
const resetForm = () => {
  formRef.value.resetFields()
}

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

const leftFileList = ref([])
const form = reactive({
  name: '',
  phone: ''
})
// 修改密码
const pwvisible = ref<boolean>(false)

const showpwModal = () => {
  pwvisible.value = true
}

const handlepwOk = (e: MouseEvent) => {
  // console.log(e);
  pwvisible.value = false
}
const cheekpasswordres = (e: any) => {
  // console.log(e)
}

//文件上传部分
const upfile = async (file: { fileListBT: any }) => {
  const { fileListBT: leftFileList } = toRefs(file)
  leftFileList.value = await file.fileListBT
  console.log(leftFileList.value)
}
const sevepwclock = ref(false)

const sevepw = async () => {
  if (!sevepwclock.value) {
    sevepwclock.value = true

    try {
      const checkPassword = await formRef.value.validate()
      // console.log(checkPassword.checkPass);
      const result = await http('update-user', { password: checkPassword.checkPass }, 'POST')
      const res = await result.json()
      if (res.status === -1) {
        clearinfo()
        closeProfile()
        return
      }
      // console.log(res)

      if (res.status == 1) {
        notification.success({ duration: 3000, description: '', message: res.msg })
        formStatepw.checkPass = ''
        formStatepw.pass = ''
        pwvisible.value = false
        getUserInfo()
      } else notification.error({ duration: 3000, description: '', message: res.msg })
    } catch (e) {
      // console.log(e)
      notification.error({ duration: 3000, description: '', message: e.message })
    }
    sevepwclock.value = false
  }
  // console.log(pwvalidateStatus.value);
}

//头像上传

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const fileList = ref([])
const loading = ref<boolean>(false)
const imageUrl = ref<string>('')

const handleChange = (info: FileInfo) => {
  if (info.file.status === 'uploading') {
    loading.value = true
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
    return
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
  }
}
const noup = () => { }
const beforeUpload = (file: FileItem) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}

const rules = {
  name: [{ required: false, message: 'Please enter user name' }]

  // description: [{ required: false, message: 'Please enter url description' }],
}

const msgvisible = ref<boolean>(false)

const showmsgDrawer = () => {
  msgvisible.value = true
}

const onmsgClose = () => {
  msgvisible.value = false
}

const placement = ref<DrawerProps['placement']>('left')
const open = ref<boolean>(false)

const confirmLoading = ref<boolean>(false)
const ifusersend = ref(false)
const iffirstloud = ref(false)

const shopQRcode = ref('')
// 声明一个apiKey变量，用于存储API密钥
let apiKey = ''
// 声明一个isConfig变量，用于存储配置是否打开的布尔值
let isConfig = ref(true)
// 声明一个isTalking变量，用于存储是否处于聊天状态的布尔值
let isTalking = ref(false)
// 声明一个messageContent变量，用于存储消息内容
let messageContent = ref('')
// 声明一个unload变量，用于存储是否卸载的布尔值
let unload = ref(false)
// 声明一个isProfileOpen变量，用于存储是否打开配置的布尔值
let isProfileOpen = ref(false)
// 声明一个visible变量，用于存储是否可见的布尔值
const visible = ref(false)
// 声明一个chatListDom变量，用于存储聊天列表DOM元素
const chatListDom = ref<HTMLDivElement>()

// 声明一个decoder变量，用于存储文本解码器
const decoder = new TextDecoder('utf-8')
// 声明一个roleAlias变量，用于存储角色别名
const roleAlias = { user: 'ME', assistant: 'LeChat', system: 'System' }
// 声明一个sending变量，用于存储是否正在发送消息的布尔值
const sending = ref(false)
// 声明一个dialogId变量，用于存储对话ID
const dialogId = ref(0)
// 声明一个showRetry变量，用于存储是否显示重试按钮的布尔值
const showRetry = ref(false)
// 声明一个userinfo变量，用于存储用户信息
const userinfo = ref({ chance: { totalChatChance: 0, level: 0, levelExpiredAt: '' }, name: '', phone: '', avatar: '' })
// 声明一个upSending变量，用于存储是否正在上传消息的布尔值
const upSending = ref(false)
// 声明一个value变量，用于存储输入框的值
let value = ref('')
// 声明一个achat变量，用于存储聊天信息
const achat = ref<Chat[]>([])
// 声明一个config变量，用于存储配置信息
const config = ref()
// 声明一个buttonText变量，用于存储按钮文本
const buttonText = ref('')
// 声明一个fristLoad变量，用于存储是否第一次加载的布尔值
const fristLoad = ref(true)
// 声明一个iflogin变量，用于存储是否登录的布尔值
const iflogin = ref(false)
// 声明一个ifuserup变量，用于存储是否用户上传的布尔值
const ifuserup = ref(false)
// 声明一个isModalOpen变量，用于存储是否打开模态的布尔值
const isModalOpen = ref(false)
// 声明一个setIsModalOpen变量，用于存储是否设置模态的布尔值
const allfinished = ref(false)
//选中的商品
const selectedGoods = ref({ title: null, price: null, description: null })
//充值结果显示
const showpayres = ref(false)

const ifscoreUp = ref(false)
const setIsModalOpen = ref(false)
interface FormState {
  name: string
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  startmsg: string
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  startmsg: ''
})
const onSubmit = () => {
  // console.log('submit!', toRaw(formState));
  // console.log(toRaw(formState).desc);
  // 设置缓存
  localStorage.setItem('role', toRaw(formState).name)
  localStorage.setItem('startmsg', toRaw(formState).startmsg)

  localStorage.setItem('prompt', toRaw(formState).desc)

  openfase.value = false
  notification.success({ duration: 3000, description: '', message: '已保存' })
}
const labelCol = { style: { width: '70px' } }
const wrapperCol = { span: 19 }
const openfase = ref(false)
interface Option {
  value: string //得到的
  label: string //看到的
  disabled?: boolean
  children?: Option[]
}

const shoplist = ref([
  {
    id: 1,
    price: 1,
    title: '首充一元',
    rolelist: ['支持科大讯飞模型', '国内模型次数可用'],
    description: ''
  }
])
const options: Option[] = ref([
  {
    value: null,
    label: '选择模型',
    disabled: false,
    children: [
      {
        value: null,
        label: '智能选择模型',
        disabled: false
      }
    ]
  },
  {
    value: 'openai',
    label: 'OpenAI',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'gpt-3.5-turbo-1106',
        label: 'gpt-3.5-turbo-1106'
      },
      {
        disabled: false,
        value: 'gpt-3.5-turbo',
        label: 'gpt-3.5-turbo'
      },
      {
        disabled: false,
        value: 'gpt-3.5-turbo-16k',
        label: 'gpt-3.5-turbo-16k'
      },
      {
        disabled: false,
        value: 'gpt-4',
        label: 'gpt-4'
      },
      {
        disabled: false,
        value: 'gpt-4-32k',
        label: 'gpt-4-32k'
      },
      {
        disabled: false,
        value: 'gpt-4-1106-preview',
        label: 'gpt-4-1106-preview'
      },
      {
        disabled: false,
        value: 'gpt-4-vision-preview',
        label: 'gpt-4-vision-preview'
      }
    ]
  },
  {
    value: 'iflytek',
    label: 'IFlyTek',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'v1.1',
        label: 'v1.1'
      },
      {
        disabled: false,
        value: 'v2.1',
        label: 'v2.1'
      },
      {
        disabled: false,
        value: 'v3.1',
        label: 'v3.1'
      }
    ]
  },
  {
    value: 'baidu',
    label: 'Baidu',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'completions',
        label: 'completions'
      },
      {
        disabled: false,
        value: 'completions_pro',
        label: 'completions_pro'
      },
      {
        disabled: false,
        value: 'ernie_bot_8k',
        label: 'ernie_bot_8k'
      },
      {
        disabled: false,
        value: 'eb-instant',
        label: 'eb-instant'
      }
    ]
  },
  {
    value: 'google',
    label: 'Google',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'gemini-pro',
        label: 'gemini-pro'
      },
      {
        disabled: false,
        value: 'gemini-pro-vision',
        label: 'gemini-pro-vision'
      },
      {
        disabled: false,
        value: 'gemini-ultra',
        label: 'gemini-ultra'
      }
    ]
  },
  {
    value: 'glm',
    label: 'GLM',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'chatglm3-6b-32k',
        label: 'chatglm3-6b-32k'
      },
      {
        disabled: false,
        value: 'glm-3-turbo',
        label: 'glm-3-turbo'
      },
      {
        disabled: false,
        value: 'glm-4',
        label: 'glm-4'
      },
      {
        disabled: false,
        value: 'glm-4v',
        label: 'glm-4v'
      }
    ]
  },
  {
    value: 'moonshot',
    label: 'MoonShot',
    disabled: false,
    children: [
      {
        disabled: false,
        value: 'moonshot-v1-8k',
        label: 'moonshot-v1-8k'
      },
      {
        disabled: false,
        value: 'moonshot-v1-32k',
        label: 'moonshot-v1-32k'
      },
      {
        disabled: false,
        value: 'moonshot-v1-128k',
        label: 'moonshot-v1-128k'
      }
    ]
  }
])

const couldcontinue = ref(true)

const commommodel = ref([null, null])
interface Chat {
  content: string
  dialogId: number
  resourceId: number | null
  chatId: number | null
  model: string | null
  subModel: string | string | null
  role: string
  avatar: string | null
  isEffect: boolean
  file?: { type: string; url: string; name: string; ext: string; size: number }
}
type Response = {
  achat: Chat[]
}
const ifphone = ref(false)
const chargeopen = ref(false)
const chargecodeopen = ref(false)
const showchargeModal = async () => {
  try {
    const shoplistRes = await httppay('list', {}, 'get')
    const res = await shoplistRes.json()
    // console.log(shoplistQes)
    if (res.status === 1) shoplist.value = res.data
    else notification.error({ duration: 3000, description: '', message: res.msg })
  } catch (e) {
    notification.error({ duration: 3000, description: '', message: e.message })
  } finally {
    upSending.value = false
  }
  chargeopen.value = true
}
const handchargeleOk = async () => { }

const paysuccess = async () => {
  showpayres.value = true
  requestAnimationFrame(() => {
    // console.log(showcanvas.value)

    const canvasScan = confetti.create(showcanvas.value)

    function start(canvasScan) {
      var end = Date.now() + 0.5 * 1000

      //   var colors = ['#ffa502', '#ff6348'];
      var shapes: ['circle', 'circle', 'square']
        ; (function frame() {
          canvasScan({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: {
              x: 0
            },
            //   colors: colors,
            shapes: shapes
          })
          canvasScan({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: {
              x: 1
            },
            //   colors: colors,
            shapes: shapes
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        })()
    }
    start(canvasScan)
  })

  // confetti()
  // confetti.create(canvas): Function
}

const type = ref('composition')
const component = computed(
  () =>
    ({
      composition: VueComposition,
      legacy: VueLegacy
    })[type.value]
)
onMounted(async () => {
  console.log(`
 ██╗      ████████╗  ███████╗██╗  ██╗ █████╗████████╗
 ██║      ██╔═════╝  ██╔════╝██║  ██║██╔══██╗  ██╔══╝
 ██║      ████████╗  ██║     ███████║███████║  ██║
 ██║      ██╔═════╝  ██║     ██╔══██║██╔══██║  ██║
 ████████╗████████╗  ███████╗██║  ██║██║  ██║  ██║
 ╚═══════╝╚═══════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═╝
`)
  console.log(
    '%cUni-AI  \n%cWelcome to join us\nwww.uniai.us\n%c© 2024 中科苏州智能计算技术研究院. All Rights Reserved.  \n\n%c ',
    'font-family: "微软雅黑", sans-serif;font-size:50px;color: #2f3542;-webkit-text-fill-color: #2f3542;-webkit-text-stroke: #2f3542;text-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3)',
    "font-family: '微软雅黑';color: #9C27B0;font-size:  20px;",
    "font-family: '微软雅黑';color: #9C27B0;font-size: 12px;",
    'color: red;font-size: 14px;'
  )
  //获取屏幕宽高
  const screenWidth = document.body.clientWidth
  const screenHeight = document.body.clientHeight
  if (screenHeight <= screenWidth) {
    ifphone.value = true
  }

  // if (localStorage.getItem("role")) {
  //   formState.name = localStorage.getItem("role") as string
  // }
  if (localStorage.getItem('prompt')) {
    formState.desc = localStorage.getItem('prompt') as string
  }
  //第一次打开，需要加载引导框
  if (!localStorage.getItem('iffirstopen')) {
    iffirstopen.value = true
    handleOpenlade(true)
  }
  localStorage.setItem('iffirstopen', false)
  try {
    linkback.value = true
    const data = await http('config', {}, 'GET')
    const res = await data.json()

    if (res.status === 1) localStorage.setItem('config', JSON.stringify(res.data))
  } catch (e) {
    notification.error({ duration: 3000, description: '', message: e.message })
    historyChat.value = []
  } finally {
    linkback.value = false
  }

  if (localStorage.getItem('token')) {
    iflogin.value = true

    await getUserInfo()
    await init()
  } else {
    iflogin.value = false
    // console.log(commonContent.content);

    achat.value = [
      {
        chatId: 0,
        avatar: '',
        content: commonContent.content,
        dialogId: 0,
        isEffect: true,
        model: commommodel.value[0],
        resourceId: null,
        role: 'assistant',
        subModel: commommodel.value[1]
      }
    ]
  }

  chatListDom.value?.scrollTo({
    top: chatListDom.value.scrollHeight,
    behavior: 'smooth' // 可选，使滚动平滑进行
  })

  if (chatListDom.value) {
    chatListDom.value.addEventListener('scroll', function () {
      //判断滚轮是否为上滑动

      // console.log(chatListDom.value?.scrollHeight );
      // console.log(-chatListDom.value?.scrollTop + chatListDom.value?.clientHeight);
      // // console.log(
      //     !allfinished.value

      // )
      if (
        chatListDom.value?.scrollHeight - 2 <=
        -chatListDom.value?.scrollTop + chatListDom.value?.clientHeight &&
        iflogin.value &&
        clock === false &&
        !allfinished.value
      ) {
        // 到达顶部

        // console.log('滚动到顶部');

        refreshData()
      }
    })
  }

  iffirstloud.value = false

  // console.log(iflogin.value)
})

onUpdated(async () => {
  // console.log(ifusersend.value, iffirstloud.value)
  // if (ifusersend.value || iffirstloud.value && ifscoreUp.value) {
  //   chatListDom.value?.scrollTo({
  //     top: chatListDom.value.scrollHeight,
  //     behavior: 'smooth' // 可选，使滚动平滑进行
  //   });
  // }
})

onBeforeUnmount(() => {
  if (stopMonitoringFunction) {
    stopMonitoringFunction()
  }
})

const handleOk = () => {
  isModalOpen.value = false
}
const handlefileOk = () => {
  ifshowopenfile.value = false
}

const handleCancel = () => {
  isModalOpen.value = false
}
const showfilelist = () => {
  open.value = true
}
const onClose = () => {
  open.value = false
}
const modelOnChange = (value: string[]) => {
  commommodel.value = value
  // console.log(value)
}
var clock = false

const refreshData = async () => {
  if (achat.value.length == 0) return (upSending.value = false)

  ifuserup.value = true
  const nowList = achat.value[0]

  if (clock == false) {
    clock = true
    let data = await getListChat(nowList.chatId, 10, dialogId.value)
    if (data.length == 0) allfinished.value = true

    // console.log(data);
    for (const i in data) {
      dialogId.value = data[i].dialogId
      // data[i].marked = marked(data[i].content, 'markdown', {
      //  theme: data[i].type ? 'dark' : 'light'
      // })
    }
    for (const item of data.reverse()) achat.value.unshift(item)

    setTimeout(() => {
      upSending.value = false
    }, 1000)

    clock = false
  }
  // console.log(achat.value)

  // ifuserup.value = false
}

const clickConfig = () => {
  if (!isConfig.value) {
    clearMessageContent()

    visible.value = !visible.value
    // console.log(visible.value)
  } else {
    clearMessageContent()
    visible.value = !visible.value
    // console.log(visible.value)
  }
  switchConfigStatus()
}

const getSecretKey = () => 'lianginx'

const switchConfigStatus = () => (isConfig.value = !isConfig.value)
//登录监听
const handleCustomEvent = async (options: any, param2: any) => {
  // options.value = options;

  // console.log('xsdsdsdsds',options);

  await getUserInfo()
  await init()
  iflogin.value = true
  chatListDom.value?.scrollTo({
    top: chatListDom.value.scrollHeight,
    behavior: 'smooth' // 可选，使滚动平滑进行
  })
}
const clearMessageContent = () => (messageContent.value = '')
const { confirm } = Modal
const cleanchat = async () => {
  // isModalOpen.value=true
  // console.log(123);
  if (!iflogin.value) {
    // console.log('请先登录')
    // visible.value = true
    value.value = ''
    clickConfig()
    return 0
  } else {
    confirm({
      title: '您正在删除之前的聊天记录',

      content: '删除后无法撤回',
      okText: '确定',

      cancelText: '取消',
      onOk() {
        sendDelmsg()
      },
      onCancel() {
        // console.log('Cancel');
      }
    })
  }
}

const sendDelmsg = async () => {
  try {
    const data = await http('del-dialog', {}, 'GET')
    const res = await data.json()
    if (res.status === -1) {
      clearinfo()
      closeProfile()
      return
    }
    // console.log(res)
    if (res.status == 1) {
      achat.value = [
        {
          chatId: 0,
          avatar: '',
          content: commonContent.content,
          dialogId: 0,
          isEffect: true,
          model: commommodel.value[0],
          resourceId: null,
          role: 'assistant',
          subModel: commommodel.value[1]
        }
      ]
      notification.success({ duration: 3000, description: '', message: res.msg })
    } else throw new Error(res.msg)
  } catch (e) {
    notification.error({ duration: 3000, description: '', message: e.message })
  }
}

function keydownHandle(event: {
  keyCode: number
  ctrlKey: any
  metaKey: any
  stopPropagation: () => void
  preventDefault: () => void
}) {
  // console.log(event);

  if (event.keyCode === 13 && !event.ctrlKey && !event.metaKey) {
    // 如果只按下了Enter键，则执行事件a的逻辑
    // 这里可以添加事件a的处理逻辑
    event.stopPropagation()
    event.preventDefault()
    sendMessage()
  } else if (event.keyCode === 13 && (event.ctrlKey || event.metaKey)) {
    // 如果同时按下了Ctrl键和Enter键，则执行事件b的逻辑
    // 这里可以添加事件b的处理逻辑
    //滚动到底部

    insertNewLine(event)
  }
}

// 换行
function insertNewLine(event: { ctrlKey: any; metaKey: any; keyCode: number }) {
  // 检查是否按下了Ctrl键和Enter键
  if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
    // 在输入框中插入换行字符
    value.value += '\n'
    // console.log(event.target.scrollHeight)

    toBottom(event.target)
  }
}
function toBottom(inputElement) {
  // 滚动到输入框的底部
  requestAnimationFrame(() => {
    // 滚动到输入框的底部
    inputElement.scrollTop = inputElement.scrollHeight - inputElement.clientHeight
  })
}

const stopmsg = () => {
  couldcontinue.value = false
  // console.log(couldcontinue.value)
}
function convertBytesToBestUnit(sizeInBytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const factor = Math.floor(Math.log2(sizeInBytes) / 10)

  // 确保不会超出单位数组的范围
  if (factor < 0) {
    return `${sizeInBytes} B`
  } else if (factor >= units.length) {
    return `${sizeInBytes} YB`
  }

  // 计算转换后的值并保留两位小数
  const value = sizeInBytes / Math.pow(2, factor * 10)
  return `${value.toFixed(2)} ${units[factor]}`
}
// 发送消息
const sendMessage = async () => {
  try {
    // check login
    ifusersend.value = true
    if (!iflogin.value) return clickConfig()

    // is sending?
    if (sending.value) return

    couldcontinue.value = true
    // check input
    ifuserup.value = false

    if (!value.value.trim() && fileListBT.value.length == 0) return
    if (!userinfo.value.chance.totalChatChance)
      return notification.error({ description: '请点击右上角充值按钮进行充值！', message: '次数用尽' })

    const input = value.value
    value.value = ''
    sending.value = true
    // console.log(fileListBT.value)

    if (fileListBT.value.length) {
      // send files
      const promiselist = []

      for (let index = 0; index < fileListBT.value.length; index++) {
        const formData = new FormData()
        const fileitem = fileListBT.value[index] as any

        formData.append('dialogId', dialogId.value.toString())
        formData.append('file', fileitem.originFileObj)

        fileitem.type = 'sending'
        fileitem.ext = ' '

        //   const input = event.target;
        const reader = new FileReader()

        // 确保文件是图片类型
        if (fileitem.originFileObj.type.match('image.*')) {
          fileitem.ext = fileitem.originFileObj.type
          reader.onload = e => (fileitem.url = e.target.result)
          reader.readAsDataURL(fileitem.originFileObj) // 读取文件内容，并转换为Base64编码
        }

        const aindex = achat.value.push({
          chatId: 0,
          avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
          content: '',
          role: 'user',
          dialogId: dialogId.value,
          resourceId: null,
          model: null,
          subModel: null,
          isEffect: true,
          file: fileitem as any
        })

        promiselist.push(
          http('upload', formData, 'POST')
            .then(res => res.json())
            .then(res => {
              res.data.file.type = 'done'
              achat.value[aindex - 1].file = res.data.file
            })
            .catch(e => {
              achat.value[aindex - 1].file!.type = 'error'
              console.error(e)
            })
        )
      }
      fileListBT.value = []

      // send user message
      if (input) {
        // user
        achat.value.push({
          avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
          content: input,
          role: 'user',
          dialogId: dialogId.value,
          chatId: 0,
          model: commommodel.value[0],
          resourceId: null,
          subModel: commommodel.value[1],
          isEffect: true
        })
        // model
        achat.value.push({
          avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
          content: '',
          role: 'assistant',
          dialogId: dialogId.value,
          chatId: 0,
          model: commommodel.value[0],
          resourceId: null,
          subModel: commommodel.value[1],
          isEffect: true
        })
      }
      await Promise.all(promiselist)
      if (input) {
        await getChatStream(input)
        await getUserInfo()
      }
      const qes = await getDailogList(0, 10, dialogId.value)

      // cover chat
      if (qes.length > 0) historyChat.value[dailogindex.value] = qes[0]
    } else {
      // user
      achat.value.push({
        chatId: 0,
        avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
        content: input,
        role: 'user',
        dialogId: dialogId.value,
        resourceId: null,
        isEffect: true,
        model: null,
        subModel: null
      })
      // model
      achat.value.push({
        chatId: 0,
        avatar: userinfo.value.avatar || config.value.DEFAULT_AVATAR_USER,
        content: '',
        role: 'assistant',
        dialogId: dialogId.value,
        model: commommodel.value[0],
        resourceId: null,
        subModel: commommodel.value[1],
        isEffect: true
      })

      await getChatStream(input)
      await getUserInfo()

      const qes = await getDailogList(0, 10, dialogId.value)

      if (qes.length > 0) historyChat.value[dailogindex.value] = qes[0]
    }
  } catch (e) {
    notification.error({ message: '错误', description: e.message })
  } finally {
    sending.value = false
    ifusersend.value = false
  }
}

// 获取```chart 开头，并```结尾的内容

const renderEchartsIfNeeded = (content: string) => {
  const regex = /```echarts([\s\S]*?)```/
  let match = content.match(regex);
  if (match) {
    const jsonData = JSON.parse(match[1].trim())
    content = content.replace(match[0], '');
    return {
      content,
      chartData: jsonData
    }
  } else {
    return {
      content
    }
  }
};

const getChatStream = async (input = '') => {
  //创建sse流式传输
  const response = await sse('chat-stream', {
    input,
    sse: true,
    dialogId: dialogId.value,
    provider: commommodel.value[0],
    model: commommodel.value[1],
    assistant: formState.startmsg,
    system: formState.desc,
    mode: outmodel.value * 1
  })

  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new EventSourceParserStream())
    .getReader()

  while (true && couldcontinue.value) {
    sending.value = true
    const onceData = await reader.read()
    console.log(onceData.done);

    if (onceData.done && !onceData.value) {
      break
    }

    const res = JSON.parse(onceData.value.data)
    // console.log("status", res.status)
    const data = res.data
    //  console.log(111111111);
    let end
    if (!couldcontinue.value) {
      notification.info({ message: '回答终止' })
      break
    }
    if (res.status === 1) {
      if (achat.value.length == 0) {
        end = achat.value.length
      } else {
        end = achat.value.length - 1
      }

      if (!data) {
        break
      }
      if (data.dialogId !== dialogId.value) break

      // achat.value[end] = data
      if (achat.value[end].chatId === 0) achat.value[end] = data
      if (achat.value[end].chatId !== data.chatId) achat.value.push(data)

      if (onceData.done || data.chatId) {
        break
      }
    } else {
      achat.value.pop()
      throw new Error(res.msg)
    }
  }
  sending.value = false
}

const showProfile = () => {
  isProfileOpen.value = true
}
const closeProfile = () => {
  isProfileOpen.value = false
}
const getUserInfo = async () => {
  try {
    const data = await http('userinfo', {}, 'GET')
    const res = await data.json()
    if (res.status === -1) {
      clearinfo()
      closeProfile()
      return
    }
    // console.log(res)
    if (res.status == 1) {
      userinfo.value = res.data
      localStorage.setItem('userinfo', JSON.stringify(res.data))
      // console.log(res.data.models)
      options.value = res.data.models

      if (res.data.avatar) imageUrl.value = res.data.avatar

      if (res.data.name) form.name = res.data.name

      if (res.data.phone) form.phone = res.data.phone
    } else throw new Error(res.msg)
  } catch (e) {
    notification.error({ message: e.message })
  }
}
const logout = async () => {
  clearinfo()
  notification.success({ message: '已退出' })
}

const clearinfo = async () => {
  localStorage.clear()

  closeProfile()
  iflogin.value = false
  achat.value = [
    {
      avatar: '',
      chatId: 0,
      content: commonContent.content,
      dialogId: 0,
      isEffect: true,
      model: commommodel.value[0],
      resourceId: null,
      role: 'assistant',
      subModel: commommodel.value[1]
    }
  ]
  dialogId.value = 0
}
const getListChat = async (lastId: number = 0, pageSize: number = 10, dialogId: number | null = null) => {
  let data = []
  try {
    if (upSending.value) return
    upSending.value = true

    const adata = await http('list-chat', { lastId, pageSize, dialogId }, 'POST')
    const res = await adata.json()

    if (res.status == -1) {
      notification.error({ message: res.msg })
      historyChat.value = []
      return clearinfo()
    }
    if (res.status === 1) data = res.data
    else throw new Error(res.msg)
  } catch (e: any) {
    notification.error({ message: e.message })
  } finally {
    upSending.value = false
  }
  return data
}
const getDailogList = async (lastId: number = 0, pageSize: number = 10, id: number | null = null) => {
  let data = []
  try {
    if (upSending.value) return
    upSending.value = true

    const adata = await http('list-dialog', { lastId, pageSize, id }, 'POST')
    const res = await adata.json()

    if (res.status == -1) {
      notification.error({ message: res.msg })
      return clearinfo()
    }

    if (res.status === 1) data = res.data
    else throw new Error(res.msg)
  } catch (e: any) {
    notification.error({ message: e.message })
  } finally {
    upSending.value = false
  }
  return data
}

const init = async () => {
  iffirstloud.value = true
  try {
    achat.value = []
    const dailogList = await getDailogList()
    // console.log(dailogList[0])

    historyChat.value = dailogList
    dialogId.value = dailogList[0].id
    const data = await getListChat(0, 10, dialogId.value)
    dailogindex.value = 0
    console.log(dailogindex.value)

    // console.log(data)
    if (data.length === 0) {
      achat.value = [
        {
          avatar: '',
          chatId: 0,
          content: commonContent.content,
          dialogId: 0,
          isEffect: true,
          model: commommodel.value[0],
          resourceId: null,
          role: 'assistant',
          subModel: commommodel.value[1]
        }
      ]
    }

    for (const item of data) {
      dialogId.value = item.dialogId
      achat.value.push(item)
    }

    window.scrollTo(0, document.body.scrollHeight)
  } finally {
    iffirstloud.value = false
  }
}
const showface = async () => {
  openfase.value = true
}
const facehandleOk = async (e: MouseEvent) => {
  // console.log(e);

  confirmLoading.value = true
  setTimeout(() => {
    openfase.value = false
    confirmLoading.value = false
  }, 2000)
}
// watch(achat.value, () => nextTick(() => scrollToBottom()));

//用户信息板块
const changeuserinfo = () => {
  // console.log(12);
  showmsgDrawer()
}

//保存信息
const sevemsgClock = ref(false)
const sevemsg = async () => {
  // console.log(imageUrl.value, form.name)
  let changeimageUrl = null

  if (!sevemsgClock.value) {
    if (imageUrl.value.slice(0, 4) == 'http') {
      changeimageUrl = null
    } else {
      changeimageUrl = imageUrl.value
    }

    try {
      sevemsgClock.value = true
      const senduserinfo = await http(
        'update-user',
        {
          avatar: changeimageUrl,
          name: form.name
        },
        'POST'
      )
      const res = await senduserinfo.json()
      // console.log(res)

      if (res.status == -1) {
        notification.error({ message: res.msg })

        clearinfo()
        closeProfile()
        return
      } else {
        notification.success({ message: '保存成功' })
        getUserInfo()
      }
    } finally {
      sevemsgClock.value = false
    }
  }
}

//商店
let stopMonitoringFunction
const choseItem = async (e: {}) => {
  chargecodeopen.value = true
  chargeopen.value = false

  const choseItemIntoE = JSON.parse(JSON.stringify(e))
  selectedGoods.value = e

  try {
    const getShopQRcodeIMG = await httppay('create', { type: 'wechat', id: choseItemIntoE.id }, 'POST')
    const getShopQRcodeIMGRes = await getShopQRcodeIMG.json()
    // console.log(getShopQRcodeIMGRes)
    if (getShopQRcodeIMGRes.status == 1) {
      shopQRcode.value = getShopQRcodeIMGRes.data.base64

      lastTransactionId.value = getShopQRcodeIMGRes.data.transactionId

      // 开启监听线程，查看支付是否完成
      stopMonitoringFunction = monitorPayment(getShopQRcodeIMGRes.data.id)
    }
  } catch (error) {
    console.error('Error creating QR code:', error)
  }
}

// 监听支付状态的函数
const monitorPayment = (paymentId: string) => {
  // 设置一个定时器，每隔一段时间检查支付状态
  const intervalId = setInterval(async () => {
    try {
      const response = await httppay(`check?id=${paymentId}`, 'get')
      const payRes = await response.json()

      if (payRes && payRes.data.status === 1) {
        // 支付已完成，停止定时器
        clearInterval(intervalId)
        paysuccess()
        await getUserInfo()
      }
    } catch (error) {
      console.error('Error monitoring payment:', error)
    }
  }, 3000) // 每3秒检查一次

  // 返回一个函数，用于在需要时停止监听
  return () => clearInterval(intervalId)
}

//关闭支付二维码
// 修改handchargecodeleOk函数以停止监听
const handchargecodeleOk = async () => {
  if (showpayres.value == false) {
    chargeopen.value = true
  }
  showpayres.value = false
  shopQRcode.value = ''
  // 调用保存的停止监听函数
  if (stopMonitoringFunction) {
    stopMonitoringFunction()
  }

  // if (showpayres.value == true) {
  //     chargeopen.value = false
  // }else{
  //     chargeopen.value = true

  // }
}

const dropzoneRef = ref(null)

const handleOver = () => {
  isDragging.value = true
}
const handleLeave = (event: DragEvent) => {
  // 检查 event.relatedTarget 是否为 null 或者不是当前元素的子元素
  // 如果是，说明文件被拖出了当前元素，可能是浏览器窗口

  if (event.relatedTarget === null) {
    isDragging.value = false
  }
}
const officeViewerUrl = ref('')
const ifshowopenfile = ref(false)
const officeName = ref('')

const handleDrop = (event: DragEvent) => {
  // 重置拖拽状态
  // 获取文件
  event.preventDefault()
  isDragging.value = false
}
const openFile = (url: string, name: string, ext: string) => {
  if (!url) return
  officeName.value = name
  if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'csv', 'wps', 'et'].includes(ext))
    officeViewerUrl.value = `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
  else officeViewerUrl.value = url
  ifshowopenfile.value = true
}
const renderedHandler = () => {
  console.log('渲染完成')
}
const errorHandler = () => {
  console.log('渲染失败')
}
// const addfilelist = (file: File) => {
//  console.log(file);
//  fileListBT.value.push(file)
//  console.log(fileListBT.value);

//   // fileListBT.value.push(file);
//   isDragging.value = false;

//   // 这里可以使用 axios 或其他 HTTP 库发送文件
// };
//格式化日期
function convertTimestamp(isoString) {
  // 创建一个新的Date对象
  const date = new Date(isoString)

  // 获取日期和时间的各个部分
  const yyyy = date.getFullYear()
  const MM = (date.getMonth() + 1).toString().padStart(2, '0') // 月份从0开始，所以需要加1
  const dd = date.getDate().toString().padStart(2, '0')
  const HH = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')
  const ss = date.getSeconds().toString().padStart(2, '0')

  // 构建并返回格式化的字符串
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`
}

// 使用示例
const isoTimestamp = '2024-02-20T08:57:54.097Z'
const formattedTimestamp = convertTimestamp(isoTimestamp)
// console.log(formattedTimestamp) // 输出: 2024-02-20 08:57:54
//历史删除对话
const deldailog = async (event: DragEvent) => {
  try {
    const adata = await http(`del-dialog?id=${event}`, {}, 'GET')
    const res = await adata.json()

    if (res.status == -1) {
      notification.error({ message: res.msg })
      clearinfo()
    } else if (res.status == 1) {
      notification.success({ message: res.msg })
      historyChat.value = await getDailogList()

      if (event == dialogId.value) {
        dialogId.value = historyChat.value[0].id

        todailog(dialogId.value, 0)
      }
    } else throw new Error(res.msg)
  } catch (e) {
    notification.error({ message: e.message })
  }
}
const ondailogLoadMore = async () => {
  let lastdailgid = historyChat.value[historyChat.value.length - 1].id
  let data = await getDailogList(lastdailgid, 10)
  if (data.length != 0) {
    historyChat.value = [...historyChat.value, ...data]
  } else notification.info({ message: '没有更多了' })

  // console.log(historyChat.value[historyChat.value.length-1].id);

  // getDailogList
}
//新建对话
const newdailogclock = ref(false)
const newdailog = async () => {
  if (newdailogclock.value == false) {
    newdailogclock.value = true
    try {
      // console.log(123)
      const adata = await http('add-dialog', {}, 'GET')
      const res = await adata.json()
      // console.log(res.data.id)

      if (res.status == -1) {
        notification.error({ message: res.msg })
        clearinfo()
      } else if (res.status == 1) {
        notification.success({ message: res.msg })
        const dailogList = await getDailogList()
        historyChat.value = dailogList
      }
      await todailog(res.data.id, 0)

      // console.log(data)

      // console.log(adata)
    } finally {
      newdailogclock.value = false
    }
  }
}

//对话跳转
const todailog = async (event: DragEvent, index) => {
  // console.log(event, index)
  dialogId.value = event
  dailogindex.value = index
  iffirstloud.value = true
  try {
    achat.value = []

    const data = await getListChat(0, 10, event)

    // console.log(data)
    if (data.length === 0) {
      achat.value = [
        {
          chatId: 0,
          avatar: '',
          content: commonContent.content,
          dialogId: 0,
          isEffect: true,
          model: commommodel.value[0],
          resourceId: null,
          role: 'assistant',
          subModel: commommodel.value[1]
        }
      ]
    }
    for (const item of data) {
      // console.log(item)
      dialogId.value = item.dialogId
      achat.value.push(item)
    }
    open.value = false
    window.scrollTo(0, document.body.scrollHeight)

    // loopChat()
  } catch (e) {
    // uni.showToast({
    //   title: e.message,
    //   duration: 3000,
    //   icon: 'none'
    // })
    // console.log(e)
  } finally {
    // console.log(123, achat.value)
    iffirstloud.value = false
    allfinished.value = false
  }
}
</script>
<style>
.upload-list .ant-upload-list-item-container .ant-upload-list-item {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
}

/* 针对所有元素 */
*::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* 针对Firefox浏览器 */
* {
  scrollbar-width: none;
}

/* 针对Chrome、Safari和Edge浏览器 */
body::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
<style scoped lang="scss">
.chart-wrap {
  width: 100%;
  height: 400px;
}

.h-screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.upload-box {
  position: fixed;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(10px);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding: 20px;
}

.upbox {
  width: 90vw;
  margin-left: 5vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

pre {
  font-family: -apple-system, 'Noto Sans', 'Helvetica Neue', Helvetica, 'Nimbus Sans L', Arial, 'Liberation Sans',
    'PingFang SC', 'Hiragino Sans GB', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Source Han Sans CN',
    'Microsoft YaHei', 'Wenquanyi Micro Hei', 'WenQuanYi Zen Hei', 'ST Heiti', SimHei, 'WenQuanYi Zen Hei Sharp',
    sans-serif;
}

.profile-overlay {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-dialog {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);

  /* top: 0; */
  /* left: 0; */
  right: 60px;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* background-color: rgba(0, 0, 0, 0.5); */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;

  /* height: 100%; */

  /* overflow: hidden; */
}

.asvg {
  width: 40px;
  height: 40px;
  animation: rotate 1s linear infinite;
}

circle {
  fill: none;
  stroke-width: 8;
  stroke-dasharray: 88;
  stroke-dashoffset: 88;
  transform-origin: center;
  transition: stroke-dashoffset 0.5s ease-in-out;
}

.progress {
  stroke-dashoffset: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

textarea {
  resize: none;
}

.stop {
  background-color: rgba(41, 41, 41, 0.811);
  /* width: 300px; */
  font-size: 15px;
  border-radius: 6px;
  color: white;
}

.filebox {
  display: flex;
  flex-direction: column;
}

.fileitem {
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  /* background-color: #207fa122; */
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.15);
}

.fileitembox {
  display: flex;
  flex-direction: row;
}

.fileinfo {
  display: flex;
  flex-direction: column;

  /* margin-left: 20px; */
}

.flileimg {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filename {
  width: 170px;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* color: ; */
}

.listitemname {
  /* width: 70px; */

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filemsg {
  font-size: 11px;
}

.filesize {
  font-size: 11px;
}

.shopitem {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 20px;
  border: 2px solid #cfcfcf;
}

.shopitem:hover {
  border: 2px solid #e2b460;
}

.uptitle {
  margin-top: 20px;
  font-size: 30px;
  font-weight: 600;
}

.upmsg {
  color: #505050;
  font-size: 20px;
  margin-top: 17px;
}

.newdailogbox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.newdailogbtn {
  display: flex;
  flex-direction: row;
  padding: 10px 30px;

  background-color: black;
  border-radius: 8px;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.dailogitem {
  margin-bottom: 10px;
  padding: 9px 24px;
  /* box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1); */
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
  backdrop-filter: blur(10px);

  cursor: pointer;
}

.dailogitem:hover {
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4) !important;

  backdrop-filter: blur(10px);
}

.group {
  width: 100%;
  max-width: 1000px;
}
</style>
