const config = {
  blocks: {
    domoBlock: {
      resource: {
        api: {
          prefix: 'https://www.yournana.club/vipshop/', // 接口前缀
          update: 'update', // 更新表单数据，值为更新接口的path，和接口前缀组成最终请求的url
        },
        fields: { // 字段
          id: { // “id”为字段名
            type: 'text', // 字段类型
            label: '文本' // 该字段显示在页面的文本标签
          },
          testRate: {
            type: 'rate',
            label: '评分'
          },
          testTextarea: {
            type: 'textarea',
            label: '评语'
          }
        }
      },
      type: 'form', // 区块类型，“form”代表表单类型
      ctx: 'edit', // 状态，“edit”代表为可编辑
      operations: { // 操作
        submit: { // 操作触发的事件名
          type: 'button', // 操作类型
          label: '提交' // 操作按钮显示的文案
        }
      },
      events: { // 事件流
        submit: '@update' // “update”是内置的更新数据操作
      }
    }
  }
}
