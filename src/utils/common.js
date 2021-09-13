// 流程状态映射
export function flowStatusMap(status) {
  const flowStatus = {
    created: "待处理",
    running: "待审批",
    done: "已完成",
    stoped: "已暂停",
    teminated: "已终止",
    error: "异常",
  }
  return flowStatus[status] || "未知";
}

// 任务状态映射
export function flowTaskStatusMap(status) {
  const flowTaskStatus = {
    CREATED: "待处理",
    AGREE: "已同意",
    REJECT: "已拒绝",
    TRANSFORM: "已转交",
    CARBONCOPY: "已抄送",
    CANCEL: "已撤销",
  }
  return flowTaskStatus[status] || "未知";
}

// 图片地址处理
export function processingImgUrl(url) {
  if (!url) {
    return "";
  }
  if (url.includes("http://") || url.includes("https://")) {
    return url;
  }
  return `${process.env.VUE_APP_BASE_API}/rest/paas/icon?path=${url}`;
}

// 表单提交数据处理
export function processingFormModel(formModel) {
  for (var key in formModel) {
    if (Array.isArray(formModel[key])) {
      if (key.indexOf("upload_") === -1) {
        formModel[key] = formModel[key].toString();
      } else {
        formModel[key] = JSON.stringify(formModel[key]);
      }
    }
  }
  return formModel;
}

// 表单展示数据处理
export function processingFormLabelModel(formLabelModel) {
  for (var key in formLabelModel) {
    if (Array.isArray(formLabelModel[key])) {
      if (key.indexOf("upload_") === -1) {
        formLabelModel[key] = formLabelModel[key].toString();
      } else {
        formLabelModel[key] = JSON.stringify(formLabelModel[key]);
      }
    }
  }
  return formLabelModel;
}

// 表单显示数据处理
export function processingFormData(templateData = {}, columnDic = [], limitColumn = []) {
  let formData = []
  if (limitColumn) {
    for (let key in columnDic) {
      let keyObj = limitColumn[key];
      if (keyObj && keyObj.hidden) {} else {
        let item = {};
        if (
          (key.indexOf("time_") > -1 || key.indexOf("date_") > -1) && templateData[key] && typeof (templateData[key]) == 'string'
        ) {
          let valueArr = templateData[key].split(",")
          if (valueArr.length > 1) {
            item = {
              type: key.split("_")[0],
              label: columnDic[key],
              value: `${valueArr[0]}至${valueArr[1]} `,
            };
          } else {
            item = {
              type: key.split("_")[0],
              label: columnDic[key],
              value: `${valueArr[0]} `,
            };
          }
        } else if (key.indexOf("upload_") > -1) {
          try {
            let value = JSON.parse(templateData[key]);
            item = {
              type: key.split("_")[0],
              label: columnDic[key],
              value: value
            };
          } catch (error) {
            console.warn(error)
          }

        } else {
          item = {
            type: key.split("_")[0],
            label: columnDic[key],
            value: templateData[key]
          };
        }

        formData.push(item);
      }
    }
  } else {
    let item = {};
    if (
      (key.indexOf("time_") > -1 || key.indexOf("date_") > -1) &&
      templateData[key] && typeof (templateData[key]) == 'string'
    ) {
      let valueArr = templateData[key].split(",")
      if (valueArr.length > 1) {
        item = {
          type: key.split("_")[0],
          label: columnDic[key],
          value: `${valueArr[0]}至${valueArr[1]} `,
        };
      }
    } else if (key.indexOf("upload_") > -1) {
      try {
        let value = JSON.parse(templateData[key]);
        item = {
          type: key.split("_")[0],
          label: columnDic[key],
          value: value
        };
      } catch (error) {
        console.warn(error)
      }

    } else {
      item = {
        type: key.split("_")[0],
        label: columnDic[key],
        value: templateData[key]
      };
    }
    formData.push(item);
  }
  return formData;
}

// 流程显示数据处理
export function processingFlowInfo(nodeModelList) {
  var flowInfo = [];
  nodeModelList.forEach((item) => {
    if (!item.done) {
      item.details.forEach((cur, index) => {
        let newItem = {
          nodeId: item.nodeId,
          nodeName: item.nodeName,
          content: cur.content,
          type: "",
          time: "",
          color: "#E5E5E5"
        };
        flowInfo.push(newItem);
      });
    } else {
      item.details.forEach((cur, index) => {
        let newItem = {
          nodeId: item.nodeId,
          nodeName: item.nodeName,
          content: cur.content,
          type: "primary",
          time: cur.time,
          color: "#409CFF"
        };
        flowInfo.push(newItem);
      });
    }
  });

  return flowInfo
}
