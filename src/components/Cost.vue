<!-- @format -->

<template>
    <div class="cost" @click="close">
        <table class="table-auto">
            <thead>
                <tr>
                    <th colspan="3">模型消费对照表</th>
                </tr>
                <tr>
                    <th>供应商</th>
                    <th>模型</th>
                    <th>消耗次</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="5">OpenAI</td>
                    <td>gpt-3.5-turbo</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>gpt-3.5-turbo-16k</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>gpt-4</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>gpt-4-turbo-preview</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>gpt-4-vision-preview</td>
                    <td>15</td>
                </tr>

                <tr>
                    <td rowspan="2">Google</td>
                    <td>gemini-pro</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>gemini-vision</td>
                    <td>15</td>
                </tr>

                <tr>
                    <td rowspan="2">GLM</td>
                    <td>glm-4</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>glm-4v</td>
                    <td>15</td>
                </tr>

                <tr>
                    <td rowspan="1">Baidu</td>
                    <td>completions_pro</td>
                    <td>4</td>
                </tr>

                <tr>
                    <td rowspan="3">MoonShot</td>
                    <td>moonshot-v1-8k</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>moonshot-v1-32k</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>moonshot-v1-128k</td>
                    <td>10</td>
                </tr>

                <td colspan="3" class="tip">
    请注意，部分高级AI模型的使用次数会有所限制和额外消耗。请参考以上消费对照表格，理解并合理使用各模型。对于未在表格中的模型，默认消耗为1次。
</br>
    为了确保我们能持续提供这些高价值的功能，我们正在寻求更经济有效的解决方案。对于可能带来的不便，我们深感歉意，也非常感谢您的理解与配合。
</td>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const emit = defineEmits(['close'])

function close() {
    emit('close')
}
</script>
<style scoped>
.cost {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
}
table {
    max-width: 600px;
    width: 100%;
    border-collapse: collapse; /* 使表格线更清晰 */
    font-size: 0.9em;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: center;
}
table th,
table td {
    padding: 12px 15px;
    text-align: center;
}
table tbody tr {
    border-bottom: 1px solid #dddddd;
    background-color: #f3f3f3;
}
table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
.tip {
    background-color: #f3f3f3;
    padding: 10px;
    font-size: 12px;
    color: #3f3f3f;
}
</style>